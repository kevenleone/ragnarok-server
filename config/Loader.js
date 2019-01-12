const bodyParser = require('body-parser')
const express = require('express')
const server = express()

const MapRouter = require('../src/Routes/Map');
const MonsterRouter = require('../src/Routes/Monster');

server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-type");
    res.setHeader("Access-Control-Allow-Credentials", false);
    next();
});

server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json());


server.use('/', MapRouter);
server.use('/', MonsterRouter);


module.exports = server