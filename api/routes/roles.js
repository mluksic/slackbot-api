const express = require('express');
const routes = express.Router({ mergeParams: true });
const role = require('../controllers/roles');

routes.route('/').get(role.findAll);

routes.route('/:id').get(role.findById);

module.exports = routes;
