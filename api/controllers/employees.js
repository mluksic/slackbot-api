const Employee = require('../models/employee');
const Kudo = require('../models/kudo');

exports.findAll = (req, res, next) => {
    Employee.find()
        .exec()
        .then(docs => {
            res.status(200).json(docs);
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
};

exports.getKudosForEmployee = (req, res, next) => {
    const id = req.params.id;
    Employee.findOne({ _id: id })
        .exec()
        .then(doc => {
            if (doc) {
                Kudo.find({ receiver: doc._id })
                    .exec()
                    .then(doc => {
                        res.send(doc);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
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
