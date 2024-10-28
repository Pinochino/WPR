const express = require("express");
const app = express();
const port = 3000;
const mysql2 = require("mysql2");
const path = require('path');

// Middleware
const multer = require("multer");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer().none());

app.use(express.static(path.join(__dirname, 'public')))

// Connect Database
const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "GameApi",
});

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




app.get("/games/genres", async (req, res) => {
    try {
        let sql = `SELECT * FROM genres ORDER BY GENRE_NAME ASC`;
        let [rows] = await connection.promise().query(sql);
        if (rows.length === 0) {
            res.type("text");
            res.status(400).send("Not have data in the database");
        } else {
            return res.json(rows);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occured while fetching data");
    }
});

app.get("/games/list/:genreid/:year", async (req, res) => {
    try {
        const genre = req.params.genreid;
        const year = req.params.year;
        let sql = `SELECT id, name, platform, publisher FROM games WHERE genre=? AND release_year=? limit 10`;
        const [rows] = await connection.promise().query(sql, [genre, year]);

        if (rows.length === 0) {
            res.type("text");
            res.status(400).send("Not have data in the database");
        } else {
            res.json([rows]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Have error when fetching data");
    }
});

app.listen(port, () =>
    console.log(`Example app listening on port http://localhost:${port}!`)
);
