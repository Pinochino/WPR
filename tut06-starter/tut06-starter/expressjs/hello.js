const express = require('express')
const app = express()
const port = 3000

app.get('/hello/Hello', (req, res) => {
    const name = req.query.name;
    if (name) {
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(`Hello ${name}`)
    } else {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(`Not found`)
    }
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))