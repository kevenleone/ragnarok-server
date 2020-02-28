require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const server = express();
const MonsterRouter = require('../src/Routes/Monster');
const ImagesRouter = require('../src/Routes/Images');
const UserRouter = require('../src/Routes/User');
const MapRouter = require('../src/Routes/Map');

server.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-type");
    res.setHeader("Access-Control-Allow-Credentials", false);
    next();
});

server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());

server.use('/', MapRouter);
server.use('/', UserRouter);
server.use('/img', ImagesRouter);
server.use('/', MonsterRouter);



module.exports = server