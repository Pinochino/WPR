// controllers/userController.js
const { loadUsers, findUserByUsername } = require('../models/UserModel');
const { encryptCookie, decryptCookie } = require('../middleware/cookieMiddleware');

app.set('views', path.join(__dirname, 'views')); // Đường dẫn tới view chính

const hbs = engine({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views'), // Đường dẫn tới layout, nếu có
    partialsDir: path.join(__dirname, 'views/partials'), // Partial nếu có
});

app.engine('hbs', hbs);
app.set('view engine', 'hbs');

const loginGet = (req, res) => {
    res.render('login', { error: null });
};

const loginPost = (req, res) => {
    const { username, password } = req.body;
    const user = findUserByUsername(username);

    if (!user) {
        return res.render('login', { error: 'User not found' });
    }
    if (user.password !== password) {
        return res.render('login', { error: 'Wrong password' });
    }

    // If login is successful
    const encryptedUserId = encryptCookie(user.id);
    res.cookie('user', encryptedUserId); // Set the cookie
    res.redirect('/profile');
};

const profileGet = (req, res) => {
    const userId = req.cookies.user ? decryptCookie(req.cookies.user) : null;
    const users = loadUsers();
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.redirect('/login'); // Redirect to login if no user found
    }

    res.render('profile', { user });
};

const logoutGet = (req, res) => {
    res.clearCookie('user'); // Clear the cookie
    res.redirect('/login'); // Redirect to login
};

module.exports = {
    loginGet,
    loginPost,
    profileGet,
    logoutGet,
};
// Step 5: Update the Routes
// In your app.js, update the routes to use the new controllers:

// app.js
const express = require('express');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const userController = require('./controllers/userController');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Routes
app.get('/login', userController.loginGet);
app.post('/login', userController.loginPost);
app.get('/profile', userController.profileGet);
app.get('/logout', userController.logoutGet);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
