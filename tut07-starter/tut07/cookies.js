const port = 3000;
const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const path = require('path');

app.use(express.urlencoded({ extended: true }))
// Static Middleware
app.use(express.static(path.join(__dirname, 'public')))

app.use(cookieParser());
app.get('/page1', (req, res) => {
    if (!res.cookie) {
        res.type('text/html');
        res.send(`You’re not recognized.<br />Please register your name <a href="/page2">here</a>`)
    }
    res.send(`Welcome ` + req.cookies.username);
})

app.get('/page2', (req, res) => {
    res.sendFile(path.join(__dirname, './public/form.html'));
})

app.post('/page2', (req, res) => {

    const username = req.body.username;

    res.cookie('user_name', username, {
        expired: 1000,
    });
    res.send(`Welcome ` + username);
})

app.listen(port, () => console.log(`The website have been running on  http://localhost:${port}`));
