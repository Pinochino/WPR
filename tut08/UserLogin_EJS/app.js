const express = require('express');
const app = express();
const port = 3000;
const cookie = require('cookie-parser');


// Config middleware
const multer = require('multer');
// for application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); // built-in middleware
// for application/json
app.use(express.json()); // built-in middleware
// for multipart/form-data (required with FormData)
app.use(multer().none()); // requires the "multer" module

// config engine
app.use(express.static(path.join(__dirname, 'views')));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/login.ejs'))
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

