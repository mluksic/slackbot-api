const Team = require('../models/team');
const Employee = require('../models/employee');

exports.findAll = (req, res, next) => {
    Team.find()
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
};

exports.findMembers = (req, res, next) => {
    Employee.find({ team: req.params.id })
        .exec()
        .then(members => {
            res.status(200).json(members);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};
