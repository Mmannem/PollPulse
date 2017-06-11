"use strict";
global.appBasePath = __dirname;

require('app-module-path').addPath(appBasePath);

var http = require("http");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoUser = require("./model/mongo");
var router = express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": true }));
//connecting to database
var db = require('./config/db.js');
var constants = require('./constants/index.js');
var userController = require('./controller/userController.js');
app.use(express.static('Content'));

var allowCrossDomain = function (req, res, next) {
    //console.dir(req);
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Headers', 'Authorization');

    next();
}
app.use(allowCrossDomain);


//routes

app.get('/', function (req, res) {
    res.json({ "data": "Welcome to Survey Application API...", "error": false });
});

// app.get('/', function (req, res) {
//     res.send("Welcome to Node JS API Development...");
// });
// app.get('/list', function (req, res) {
//     res.json({ "error": false, "message": "List of objects" });
// });

app.use('/', router);
app.use('/', userController)

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server app listening at http://%s:%s", host, port)
});