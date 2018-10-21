const express = require('express');
const routes = express.Router({ mergeParams: true });
const bot = require('../controllers/bot');

routes.route('/').post(bot.getDataFromBot);

module.exports = routes;
