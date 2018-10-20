const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Role = require('../models/role');

router.get('/', (req, res, next) => {
    Role.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json(err.message);
            console.log(err.message);
        });
});

router.get('/:roleId', (req, res, next) => {
    const id = req.params.roleId;
    Role.findById(id)
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
