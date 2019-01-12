const express = require('express');
const Router = express.Router();
const MapController = require('../Controller/Map');

Router.get('/map/:map', (req, res, next) => MapController.Map(req, res, next));

module.exports = Router;