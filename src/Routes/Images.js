const express = require('express');
const Router = express.Router();
const ImageController = require('../Controller/Images');

Router.get('/:pst/:img', (req, res, next) => ImageController.Images(req, res, next));

module.exports = Router;