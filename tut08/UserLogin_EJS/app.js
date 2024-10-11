const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs').promises;
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const { encrypt } = require('./crypto');

require('dotenv').config();
const port = process.env.PORT || 3000;


// Config middleware
const multer = require('multer');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer().none());


// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('pages/login.ejs')
})

app.post('/', async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('File does not exist')
    }

    try {
        let data;
        try {
            data = await fs.readFile('./users.json', 'utf8');
            if (!data) {
                return res.status(404).send('File does not exist');
            }
        } catch (error) {
            next(error);
        }

        let response = JSON.parse(data);
        let foundUser = false;

        const user = {
            username: username,
            password: password
        }

        for (let key in response) {
            if (response[key].username === user.username && response[key].password === user.password) {
                foundUser = true;
                res.cookie('user', JSON.stringify(user), { httpOnly: true })
                return res.redirect('/profile');
            }
        }
        return res.status(400).send('Invalid username and password');

    } catch (error) {
        return res.status(500).send({ message: "Something went wrong on the server" })
    }
})

app.get('/profile', (req, res) => {
    const user = req.cookies.user ? JSON.parse(req.cookies.user) : null;

    if (user) {
        res.render('pages/profile.ejs', { user });
    } else {
        res.redirect('/');
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

