/**
 * Entry point for the web server
 * @type {*|createApplication}
 */

const express = require('express'),
    path = require('path');

var app = express();

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, "app", "index.html"));
});

app.use(express.static('app'));

app.listen(80, function(){
    console.log("Application listening on port 80");
});