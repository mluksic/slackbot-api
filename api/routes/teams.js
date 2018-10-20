const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Team = require('../models/team');

router.get('/', (req, res, next) => {
    Team.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json(err.message);
            console.log(err.message);
        });
});

router.get('/:teamId', (req, res, next) => {
    const id = req.params.teamId;
    Team.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(404).json({
                    message: 'No valid entry found'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;
