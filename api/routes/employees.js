const express = require('express');
const routes = express.Router({ mergeParams: true });

const employee = require('../controllers/employees');

routes.route('/').get(employee.findAll);

routes.route('/:id').get(employee.findById);

routes.route('/:id/kudos').get(employee.getKudosForEmployee);

routes.route('/:id/shit').get(employee.getShit);

module.exports = routes;
