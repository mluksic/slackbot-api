const Employee = require('../models/employee');
const Kudo = require('../models/kudo');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.findAll = (req, res, next) => {
    Employee.paginate()
        .then(docs => {
            res.json(docs, [{ rel: 'self', method: 'GET', href: 'http://127.0.0.1/employees' }]);
        })
        .catch(err => {
            res.status(500).json(err.message);
            console.log(err.message);
        });
};

exports.findById = (req, res, next) => {
    const id = req.params.id;
    Employee.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.json(doc, [
                    { rel: 'self', method: 'GET', href: 'http://127.0.0.1/employess/' + doc._id },
                    {
                        rel: 'self',
                        method: 'GET',
                        title: 'Get all employees',
                        href: 'http://127.0.0.1/employees'
                    }
                ]);
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
};

exports.getKudosForEmployee = (req, res, next) => {
    const id = req.params.id;
    Kudo.aggregate(
        [
            {
                $lookup: {
                    from: 'employees',
                    localField: 'receiver',
                    foreignField: '_id',
                    as: 'receiver'
                }
            },
            {
                $unwind: '$receiver'
            },
            {
                $lookup: {
                    from: 'employees',
                    localField: 'sender',
                    foreignField: '_id',
                    as: 'sender'
                }
            },
            {
                $unwind: '$sender'
            },
            {
                $match: { 'receiver._id': ObjectId(id) }
            }
        ],
        (err, results) => {
            res.send(results);
        }
    );
};

exports.getShit = (req, res, next) => {
    const id = req.params.id;
    Kudo.aggregate(
        [
            {
                $lookup: {
                    from: 'employees',
                    localField: 'receiver',
                    foreignField: '_id',
                    as: 'receiver'
                }
            },
            {
                $unwind: '$receiver'
            },
            {
                $lookup: {
                    from: 'employees',
                    localField: 'sender',
                    foreignField: '_id',
                    as: 'sender'
                }
            },
            {
                $unwind: '$sender'
            },
            {
                $match: { $and: [{ 'receiver._id': ObjectId(id) }, { value: { $eq: 0 } }] }
            }
        ],
        (err, results) => {
            res.send(results);
        }
    );
};
