var express = require("express");
var fs = require("fs");
var app = express();
var PORT = process.env.PORT || 7000;
var path = require("path");
var notes = [];
var noteIndex = 1;
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/notes", function (req, res) {
    return res.sendFile(path.join(__dirname + '/public/notes.html'));
})

app.get("/api/notes", async function (req, res){
    const notesStr = await readFile("db/db.json", "utf8");
    notes = JSON.parse(notesStr);
    // for (var i = 0; i < notes.length; i++) {

    // }
    return res.json(notes);
})

app.post("/api/notes", async function (req, res){
    var newNote = req.body;
    newNote.id = noteIndex;
    notes.push(newNote);
    noteIndex++;
    await writeFile("db/db.json", JSON.stringify(notes));
    return res.json(newNote);
})

// app.get("/api/notes/:id", function (req, res) {
//     const chosen = parseInt(req.params.id);
//     console.log(chosen)
//     for (var i = 1; i <= notes.length; i++) {
//         if (chosen === i) {
//             return res.json(notes[i]);
//         }
//     }
//     return res.json(false);
// });

app.delete("/api/notes/:id", async function (req, res){
    const deleteNote = parseInt(req.params.id);
    const filtered = notes.filter(note => note.id !== deleteNote);
    notes = filtered
    console.log(notes);
    await writeFile("db/db.json", JSON.stringify(notes));
    return res.json(notes);
})

app.get("*", function (req, res) {
    return res.sendFile(path.join(__dirname + '/public/index.html'));
})

app.listen(PORT, function () {
    console.log("App is listening on PORT " + PORT);
})