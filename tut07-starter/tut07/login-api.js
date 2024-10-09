const express = require('express')
const app = express()
const fs = require("fs").promises;
const port = 3000
const path = require('path');

const multer = require('multer');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer().none());


app.use(express.static(path.join(__dirname, 'public')));

app.get('/users', async (req, res, next) => {
    try {
        let data = await fs.readFile('users.json', 'utf8');
        if (!data) {
            return res.status(404).send('file does not exist');
        }

        let response = JSON.parse(data);
        return res.json(response);
    } catch (error) {
        next(error);
    }
})


app.post('/user', async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).send('Missing required parameters');
    }

    try {
        let data;
        try {
            data = await fs.readFile('users.json', 'utf8');
            if (!data) {
                return res.status(404).send('File does not exist');
            }
        } catch (error) {
            next(error);
        }

        let response = JSON.parse(data);
        let founderUser = false;
        for (let key in response) {
            if (response[key].username === username && response[key].password === password) {
                founderUser = true;
                return res.status(200).send('Login successful');
            }
            return res.status(400).send('Invalid username or password');
        }

    } catch (error) {
        return res.status(500).send('Something went wrong on the server')
    }
})

app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/post.html')));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));