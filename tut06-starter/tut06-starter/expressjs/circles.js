'use strict';
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/math/circle/:r', (req, res) => {
    const radius = Number( req.url.split('/')[3]);
    const area = Math.PI * Math.pow(radius, 2);
    const circumstance = Math.PI * 2 * radius;

    const object = {
        area: area,
        circumstance: circumstance
    }

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(object))
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))