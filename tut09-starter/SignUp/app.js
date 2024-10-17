const express = require("express");
const app = express();
const port = 3000;
const mysql2 = require("mysql2");
const path = require('path');

// Middleware
const multer = require("multer");
const { error } = require("console");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer().none());
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Connect Database
const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "GameApi",
});


// CREATE TABLE
// connection.connect(function (err) {
//     if (err) console.log(err);
//     console.log("Connected!");
//     var sql = "CREATE TABLE users (id VARCHAR(36) default(uuid()) PRIMARY KEY, username VARCHAR(255), password VARCHAR(255), created_at TIMESTAMP default(CURRENT_TIMESTAMP))";
//     connection.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log("Table created");
//     });
// });

app.post('/register', async (req, res) => {

    const { username, password } = req.body;


    try {
        let sql1 = `SELECT * FROM users WHERE username=?`;
        const [existingUser] = await connection.promise().query(sql2, [username]);
        if (existingUser.length > 0) {
            res.type('text')
            res.render('register', { error })
        }

        let sql2 = `INSERT INTO users (username, password) VALUES (?, ?)`;
        const [rows] = await connection.promise().query(sql2, [username, password]);
        if (rows.length === 0) {
            res.type('text');
            res.status(400).send('Not have data in the database')
        } else {
            return res.json(rows);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occured while fetching data");
    }
});

app.get('/register', (req, res) => {
    res.render('register');
})



process.on("SIGTERM", () => {
    console.log("SIGTERM signal received.");
    console.log("Closing HTTP server and stop receiving requests...");
    app.close();
    console.log("Closing DB connection...");
    connection.end(function (err) {
        // the connection is terminated now
        console.log("DB connection has been closed.");
        // exit program
        console.log("Goodbye!");
        process.exit(0);
    });
});

app.listen(port, () => console.log(`Example app listening on port http://localhost:${port}`))