"use strict";

const express = require("express");
const app = express();

const fs = require("fs").promises;

// Middlewares
const multer = require("multer");
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(multer().none());

// define 'add' endpoint here
const port = 8000;
app.get('/', async (req, res, next) => {
    try {
        let data = await fs.readFile('movies.json', 'utf8');
        if (!data) {
            return res.status(404).send("file does not exist");
        }
        let resonse = JSON.parse(data);
        return res.json(resonse);
    } catch (error) {
        next(error)
    }
})

app.post('/add', async (req, res, next) => {
    const { movie, song, year, rating } = req.body;

    if (!movie || !song || !year || !rating) {
        res.status(400).send('Missing required parameters')
    }

    try {
        let data;
        try {
            data = await fs.readFile('movies.json', 'utf8');
            if (!data) {
                return res.status(404).send("file does not exist");
            }
        } catch (error) {
            next(error);
        }

        let movies = JSON.parse(data);

        if (movies[movie]) {
            movies[movie]['release-year'] = year;
            movies[movie]['featured-song'] = song;
            movies[movie]['rotten-tomatoes'] = rating;
            await fs.writeFile('movies.json', JSON.stringify(movies, null, 2));
            console.log("Movie information updated");
            return res.send('updated information for designated movie');
        } else {
            movies[movie] = {
                "release-year": year,
                "featured-song": song,
                "rotten-tomatoes": rating
            };
            await fs.writeFile('movies.json', JSON.stringify(movies, null, 2));
            console.log("Movie information added");
            return res.send("added information for designated movie");
        }

    } catch (error) {
        return res.status(500).send("something went wrong on the server");
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
