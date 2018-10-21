const Team = require('../models/team');
const Employee = require('../models/employee');
const Kudo = require('../models/kudo');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.getKudoScoring = (req, res, next) => {
    const payload = req.query;

    let date = new Date();
    if (payload.monthly) {
        date.setMonth(date.getMonth() - 1);
    } else if (payload.yearly) {
        date.setYear(date.getYear() - 1);
    } else {
        date.setDate(date.getDate() - 7);
    }

    Employee.aggregate(
        [
            {
                $lookup: {
                    from: 'kudos',
                    localField: '_id',
                    foreignField: 'receiver',
                    as: 'kudo'
                }
            },
            {
                $unwind: '$kudo'
            },
            {
                $lookup: {
                    from: 'teams',
                    localField: 'team',
                    foreignField: '_id',
                    as: 'team'
                }
            },
            {
                $unwind: '$team'
            },
            {
                $match: {
                    $and: [{ 'kudo.approved': { $gt: 1 } }, { 'kudo.createdAt': { $gte: date } }]
                }
            },
            {
                $group: {
                    _id: { team: '$team', kudoValue: '$kudo.value' },
                    totalValue: { $sum: '$kudo.value' },
                    count: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: '$_id.team',
                    totalValue: { $sum: '$totalValue' },
                    kudos: { $push: { count: '$count', value: '$_id.kudoValue' } }
                }
            },
            { $sort: { totalValue: -1 } }
        ],
        (err, results) => {
            res.send(results);
        }
    );
};

exports.getKudoScoringEmployees = (req, res, next) => {
    const payload = req.query;

    let date = new Date();

    if (payload.monthly) {
        date.setMonth(date.getMonth() - 1);
    } else if (payload.yearly) {
        date.setYear(date.getYear() - 1);
    } else {
        date.setDate(date.getDate() - 7);
    }
    let and = [{ 'kudo.approved': { $gt: 1 } }, { 'kudo.createdAt': { $gte: date } }];
    if (payload.team) {
        console.log(payload.team);
        and.push({ 'team._id': ObjectId(payload.team) });
        console.log(and);
        match = { $and: and };
    } else {
        match = { $and: and };
    }

    Employee.aggregate(
        [
            {
                $lookup: {
                    from: 'kudos',
                    localField: '_id',
                    foreignField: 'receiver',
                    as: 'kudo'
                }
            },
            {
                $unwind: '$kudo'
            },
            {
                $lookup: {
                    from: 'teams',
                    localField: 'team',
                    foreignField: '_id',
                    as: 'team'
                }
            },
            {
                $unwind: '$team'
            },
            {
                $match: match
            },
            {
                $group: {
                    _id: {
                        id: '$_id',
                        firstName: '$firstName',
                        lastName: '$lastName',
                        kudoValue: '$kudo.value'
                    },
                    totalValue: { $sum: '$kudo.value' },
                    count: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: {
                        id: '$_id.id',
                        firstName: '$_id.firstName',
                        lastName: '$_id.lastName'
                    },
                    totalValue: { $sum: '$totalValue' },
                    kudos: { $push: { count: '$count', value: '$_id.kudoValue' } }
                }
            },
            { $sort: { totalValue: -1 } }
        ],
        (err, results) => {
            res.send(results);
        }
    );
};
