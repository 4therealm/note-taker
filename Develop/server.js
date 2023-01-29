const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dbData = require("./db/db.json");
const uuid = require("./helpers/uuid");
const fs = require("fs");
const util = require("util");
const PORT = 3001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const getNotes = () => {
  let p_notes = fs.readFileSync(path.join(__dirname, "../Develop/db/db.json"));
  return JSON.parse(p_notes);
};

const setNotes = (notes) => {
  fs.writeFileSync(path.join(__dirname, "../Develop/db/db.json"),JSON.stringify(notes, null, 2));
};

//page navigation
app.use(express.static("public"));
app.get("/", (req, res) => res.send("Navigate to /index"));

//Get route for home page
app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));

  console.info(`${req.method} request received for \n/Index`);
});

//Get route for notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
  console.info(`${req.method} request received for\n/Notes`);
  return res.json(dbData);
});
// get route for all of the dbdata

app.get("/api/db/:title", (req, res) => {
  const rQTitle = req.params.title.toLowerCase();
  const filter = dbData.filter((obj) => obj.title.toLowerCase() === rQTitle);
  if (filter.length !== 0) return res.json(filter);

  return res.json("No match found");
});

app.post("/notes", (req, res) => {
  console.info(`${req.method} request received to save a note`);
  const { title, text } = req.body;
  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNoteObject = {
      title,
      text,
      note_id: uuid(),
    };
    let NDB = [getNotes(), newNoteObject]
    console.log("🚀 ~ file: server.js:62 ~ app.post ~ NDB", NDB)
    setNotes(NDB);

    const response = {
      key: newNoteObject.title,
      body: newNoteObject,
    };
    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json("Error in posting review");
  }
});

// Convert the data to a string so we can save it
// Write the string to a file

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
//------------------------------------------------------------------------------

// /**
//  *  Function to write data to the JSON file given a destination and some content
//  *  @param {string} destination The file you want to write to.
//  *  @param {object} content The content you want to write to the file.
//  *  @returns {void} Nothing
//  */
// const writeToFile = (destination, content) =>
//   fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
//     err ? console.error(err) : console.info(`\nData written to ${destination}`)
//   );

// /**
//  *  Function to read data from a given a file and append some content
//  *  @param {object} content The content you want to append to the file.
//  *  @param {string} file The path to the file you want to save to.
//  *  @returns {void} Nothing
//  */
// const readAndAppend = (content, file) => {
//   fs.readFile(file, 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//     } else {
//       const parsedData = JSON.parse(data);
//       parsedData.push(content);
//       writeToFile(file, parsedData);
//     }
//   });
// };
