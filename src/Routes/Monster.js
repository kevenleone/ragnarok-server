const express = require('express');
const Router = express.Router();
const MonsterController = require('../Controller/Monster');

Router.get('/monster', (req, res, next) => MonsterController.Monsters(req, res, next));
Router.get('/monster/:id', (req, res, next) => MonsterController.MonsterDetail(req, res, next));

module.exports = Router;