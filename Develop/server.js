const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const dbData = require('./db/db.json')


const PORT = 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/', (req, res) => res.send('Navigate to /send or /routes'));

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);
app.get('/index', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/api/db', (req, res) => res.json(dbData));

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);