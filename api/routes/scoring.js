const express = require('express');
const routes = express.Router({ mergeParams: true });

const scoring = require('../controllers/scoring');

routes.route('/teams').get(scoring.getKudoScoring);

routes.route('/employees').get(scoring.getKudoScoringEmployees);

routes.route('/lastKudos').get(scoring.getLastKudos);

module.exports = routes;
