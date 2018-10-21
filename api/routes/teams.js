const express = require('express');
const routes = express.Router({ mergeParams: true });

const teams = require('../controllers/teams');

routes.route('/').get(teams.findAll);

routes.route('/:id').get(teams.findById);

routes.route('/:id/members').get(teams.findMembers);

module.exports = routes;
