const express = require('express');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const userController = require('./controllers/userController');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser());
app.engine('hbs', exphbs.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');

// Routes
app.get('/login', userController.loginGet);
app.post('/login', userController.loginPost);
app.get('/profile', userController.profileGet);
app.get('/logout', userController.logoutGet);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
