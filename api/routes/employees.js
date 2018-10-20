const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Employee = require('../models/employee');

router.get('/', (req, res, next) => {
    Employee.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json(err.message);
            console.log(err.message);
        });
});

router.get('/:employeeId', (req, res, next) => {
    const id = req.params.employeeId;
    Employee.findById(id)
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
