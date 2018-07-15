var bodyParser = require('body-parser')
var consign = require('consign')
var express = require('express')
var server = express()

server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-type");
    res.setHeader("Access-Control-Allow-Credentials", false);
    next();
});

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())

consign()
    .include('config/database.js')
    .then('src/models')
    .then('src/controller')
    .then('src/util')
    .into(server)

module.exports = server