'use strict';

const express = require('express')
const app = express()
const port = 3000

app.get('/math/rectangle/:width/:height', (req, res) => {
    const width = Number(req.url.split('/')[3]);
    const height = Number(req.url.split('/')[4]);

    const area = width * height;
    const perimeter = (width + height) * 2;

    const object = {
        area: area,
        perimeter: perimeter,
    }

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(object));
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))