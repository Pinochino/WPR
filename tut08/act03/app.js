const express = require('express');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { engine } = require('express-handlebars');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', 'views');



// Load user data from JSON file
const usersDataPath = path.join(__dirname, 'users.json');
const loadUsers = () => {
    const data = fs.readFileSync(usersDataPath);
    return JSON.parse(data);
};

// Encrypt the cookie
const encryptCookie = (cookie) => {
    const cipher = crypto.createCipheriv('aes-128-ecb', Buffer.from('1234567890abcdef'), null);
    let encrypted = cipher.update(cookie, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
};

// Decrypt the cookie
const decryptCookie = (cookie) => {
    const decipher = crypto.createDecipheriv('aes-128-ecb', Buffer.from('1234567890abcdef'), null);
    let decrypted = decipher.update(cookie, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

// Login GET Endpoint
app.get('/login', (req, res) => {
    res.render('login', { error: null });
});

// Login POST Endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const users = loadUsers();
    const user = users.find(u => u.username === username);


    if (!user) {
        return res.render('login');
    }

    if (user.password !== password) {
        return res.render('login', { error: 'Wrong password' });
    }

    // If login is successful
    const encryptedUserId = encryptCookie(user.id);
    res.cookie('user', encryptedUserId); // Set the cookie
    return res.redirect('/profile');
});

// Profile GET Endpoint
app.get('/profile', (req, res) => {
    const userId = req.cookies.user ? decryptCookie(req.cookies.user) : null;

    const users = loadUsers();
    const user = users.find(u => u.id === userId);
    if (!user) {
        return res.redirect('/login'); // Redirect to login if no user found
    }

    res.render('profile', { user });
});

// Logout GET Endpoint
app.get('/logout', (req, res) => {
    res.clearCookie('user'); // Clear the cookie
    res.redirect('/login'); // Redirect to login
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
