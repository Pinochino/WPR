'use strict';

const express = require('express');
const app = express();
const multer = require('multer');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer().none());



let categories = ['funnyJoke', 'lameJoke'];
let funnyJoke = [
  {
    'joke': 'Why did the student eat his homework?',
    'response': 'Because the teacher told him it was a piece of cake!'
  },
  {
    'joke': 'What kind of tree fits in your hand?',
    'response': 'A palm tree'
  },
  {
    'joke': 'Why don\'t scientists trust atoms?',
    'response': 'Because they make up everything'
  },
  {
    'joke': 'What did the left eye say to the right eye?',
    'response': 'Between you and me, something smells.'
  }
];
let lameJoke = [
  {
    'joke': 'Which bear is the most condescending?',
    'response': 'Pan-DUH'
  },
  {
    'joke': 'What would the Terminator be called in his retirement?',
    'response': 'The Exterminator'
  },
  {
    'joke': 'Why did it get so hot in the baseball stadium after the game?',
    'response': 'All of the fans left.'
  }
];
app.use(express.static('public'));
const port = 3000

app.get('/jokebook/categories', async (req, res) => {
  const response = categories.map(category => `a possible category is ${category}`).join('\n');
  res.type('plain/text').send(response);
})


app.get('/jokebook/categories/:category', (req, res) => {
  const categoryValue = req.params.category;

  if (!categories.includes(categoryValue)) {
    return res.status(400).json({ 'error': 'no category listed for category' })
  }

  // Get the jokes array based on the category
  const jokes = categoryValue === 'funnyJoke' ? funnyJoke : lameJoke;

  // Select a random joke from the array
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

  // Send the random joke as JSON
  res.json(randomJoke);

})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.listen(8000);
