////////////////////////////////////////////
//Variables
var express = require("express");
var app = express();
var PORT = 7000;
var path = require("path");
var notes = [];
////////////////////////////////////////////
//Express Setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
////////////////////////////////////////////
//Routes
app.get("/notes", function(req, res){
    return res.sendFile(path.join(__dirname + '/notes.html'));
})

app.get("/", function (req, res){
    return res.sendFile(path.join(__dirname + '/index.html'));
})
////////////////////////////////////////////
// Server Listen Function
app.listen(PORT, function(){
    console.log("App is listening on PORT " +PORT);
})
////////////////////////////////////////////