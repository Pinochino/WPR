// controllers/userController.js
const { loadUsers, findUserByUsername } = require('../models/UserModel');
const { encryptCookie, decryptCookie } = require('../middleware/cookieMiddleware');
const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const app = express();

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

