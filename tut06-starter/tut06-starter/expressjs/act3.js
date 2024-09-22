'use strict';

const express = require('express');
const app = express();
const port = 8000;

app.get('/hello', (req,res) => {
    res.type('text');
    res.send('Hello World!')
})

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })