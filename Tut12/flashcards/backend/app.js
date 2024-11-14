const express = require('express');
const app = express();

const port = 8000;



const dict = {
    "pretty": "xinh đẹp",
    "car": "xe hơi",
    "study": "học tập",
    "life": "cuộc sống",
    "enormous": "to lớn",
    "computer": "máy tính"
};

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
})


const words = Object.keys(dict);
const meanings = Object.values(dict);

app.get('/wordcount', (req, res) => {
    return res.json({wordcount: words.length });
})

app.get('/getword/:index', (req, res) => {
    const position = req.params.index;
    return res.json(
        {
            index: position,
            word: words[position],
            def: meanings[position]
           }
    )
})

app.listen(port, () => {
    console.log(`This website is running on the http://localhost:8080`);
})

