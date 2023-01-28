const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const dbData = require('./db/db.json')
const uuid = require('./helpers/uuid');
const fs = require('fs');
const util = require('util');

const PORT = 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//page navigation
app.use(express.static('public'));
app.get('/', (req, res) => res.send('Navigate to /index'));
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);
app.get('/index', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

//get route for all of the dbdata
app.get('/api/db', (req, res) => res.json(dbData));

app.get("/api/db/:title", (req, res) => {
  const rQTitle = req.params.title.toLowerCase();
  const filter = dbData.filter(
    (obj) => obj.title.toLowerCase() === rQTitle
    );
    if (filter.length !== 0) return res.json(filter);

  return res.json("No match found");
})


app.post('/api/notes')
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
//------------------------------------------------------------------------------
const readFromFile = util.promisify(fs.readFile);

/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};