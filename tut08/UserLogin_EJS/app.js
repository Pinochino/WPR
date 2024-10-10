const express = require('express');
const app = express();
const port = 3000;
const cookie = require('cookie-parser');
const path = require('path')

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



app.get('/profile', (req, res) => {
    res.render('pages/profile.ejs')

})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

