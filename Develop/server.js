const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const uuid = require("./helpers/uuid");
const fs = require("fs");
const util = require("util");
const {title}=require("process")
const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//page navigation
app.use(express.static("public"));
app.get("/", (req, res) => res.send("Navigate to /index or /notes"));

//Get route for home page
app.get("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));

  console.info(`${req.method} request received for \n/Index`);
});

//Get route for notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
  console.info(`${req.method} request received for\n/Notes`);
  // return res.json(dbData);
});
// get route for all of the dbdata

//API GET REQUEST
app.get("/api/notes", (req, res) => {
  console.log("GET notes request");
  //read the db.json file using readFileSync
  let data = fs.readFileSync("./db/db.json", "utf-8");
  //send response of json data of GET request
  //must be parsed and stringified later
  res.json(JSON.parse(data));
});

app.post("/api/notes", (req, res) => {
  console.info(`${req.method} request received to save a note`);
  const {title, text} = req.body
  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuid()
    };
    //read data from json file
    let data = fs.readFileSync("./db/db.json", "utf-8");

    const dataJSON = JSON.parse(data);
    dataJSON.push(newNote);

    //write notes to db.json file
    fs.writeFile("./db/db.json", JSON.stringify(dataJSON), (err, text) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(text);
    });

    console.log("success, added a new note");

    //send json data response
    res.json(data);
  }
});


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

