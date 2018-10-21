const express = require('express');
const routes = express.Router({ mergeParams: true });
const kudoApprove = require('../controllers/kudoApprove');

routes.route('/').post(kudoApprove.create);

module.exports = routes;
