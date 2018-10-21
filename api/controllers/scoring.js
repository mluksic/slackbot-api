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
        and.push({ 'team._id': ObjectId(payload.team) });
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

exports.getLastKudos = (req, res, next) => {
    const payload = req.query;

    if (payload.team) {
        {
            match = {
                $and: [
                    ({ approved: { $gt: 1 } },
                    { 'receiver.team': ObjectId(payload.team) },
                    { value: { $gt: 0 } })
                ]
            };
        }
    } else {
        match = {
            $and: [({ approved: { $gt: 1 } }, { value: { $gt: 0 } })]
        };
    }
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
                $match: match
            },
            { $sort: { createdAt: -1 } },
            { $limit: 10 }
        ],
        (err, results) => {
            res.send(results);
        }
    );
};
