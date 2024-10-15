const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs').promises;
const crypto = require('crypto');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const { encryptText, decryptText } = require('./crypto');



require('dotenv').config();
const port = process.env.PORT || 3000;
const keyCrytpor = "mypassword123456";


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
    res.render('pages/login', { error: null })
})

app.post('/', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    try {
        let data;
        try {
            data = await fs.readFile('./users.json', 'utf8');
            if (!data) {
                return res.status(404).send('File does not exist');
            }
        } catch (error) {
            return res.status(500).send({ message: 'Error reading the file', error });
        }

        const users = JSON.parse(data);
        const user = users.find(u => u.username === username);

        if (!users) {
            return res.render('login', { error: 'User not found!' })
        }

        if (user.password !== password) {
            return res.render('login', { error: "Wrong password!" })
        }

        const encryptedUserId = encryptText(user.id, keyCrytpor);
        res.cookie('user', encryptedUserId);
        res.redirect('/profile');
    } catch (error) {
        return res.status(500).send({ message: "Something went wrong on the server", error });
    }
});

app.get('/profile', async(req, res) => {
    if (!req.cookies.user) {
        return res.redirect('/');
    }

    try {
        const decryptedUserId = decryptText(req.cookies.user, keyCrytpor);

        if (!decryptedUserId) {
            return res.redirect('/')
        }


        const data = await fs.readFile('./users.json', 'utf8');
        const users = JSON.parse(data);

        // Tìm người dùng theo ID đã giải mã
        const user = users.find(u => u.id === decryptedUserId);

        if (!user) {
            return res.redirect('/'); // Nếu không tìm thấy người dùng
        }

        // Gửi thông tin người dùng tới trang profile
        res.render('pages/profile', { user });
    } catch (error) {
        res.clearCookie('user');
        res.redirect('/');
    }
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

