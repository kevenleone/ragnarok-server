const express = require('express');
const Router = express.Router();
const UserController = require('../Controller/User');

Router.post('/register', (req, res, next) => UserController.Register(req, res, next));
Router.post('/auth', (req, res, next) => UserController.Auth(req, res, next));

module.exports = Router;