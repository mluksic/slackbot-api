const express = require('express');
const routes = express.Router({ mergeParams: true });
const kudos = require('../controllers/kudos');

routes
    .route('/')
    .get(kudos.findAll)
    .post(kudos.create);

routes.route('/:id').get(kudos.findById);

module.exports = routes;
