const Employee = require('../../models/employee');
const Role = require('../../models/role');
const Team = require('../../models/team');

findRole = roleName => {
    Role.findOne({ name: roleName })
        .exec()
        .then(role => {
            return role;
        });
};

findTeam = teamName => {
    Team.findOne({ name: teamName })
        .exec()
        .then(team => {
            return team;
        });
};

findEmployee = username => {
    Employee.find({ username: username })
        .exec()
        .then(employee => {
            return employee;
        });
};

exports.loadEmployees = () => {
    Employee.find()
        .exec()
        .then(docs => {
            if (docs.length === 0) {
                Employee.insertMany(
                    [
                        // red team
                        {
                            firstName: 'Alojz',
                            lastName: 'Novak',
                            email: 'loralynn.nakylah@0rdered.com',
                            role: findRole('ROLE_USER'),
                            team: findTeam('Red team'),
                            slackId: 'UDJG1AQLB',
                            slackUsername: 'loralynn.nakylah',
                            manager: findEmployee('kaili.daria')
                        },
                        {
                            firstName: 'Martina',
                            lastName: 'Zupancic',
                            email: 'lynlee.karolina@0rdered.com',
                            role: findRole('ROLE_USER'),
                            team: findTeam('Red team'),
                            slackId: 'UDHSN6XBJ',
                            slackUsername: 'lynlee.karolina',
                            manager: findEmployee('kaili.daria')
                        },
                        {
                            firstName: 'Jure',
                            lastName: 'Kure',
                            email: 'kaili.daria@0rdered.com',
                            role: findRole('ROLE_TEAM_LEAD'),
                            team: findTeam('Red team'),
                            slackId: 'UDJDSMQAY',
                            slackUsername: 'kaili.daria',
                            manager: findEmployee('g3844702')
                        },
                        // green team
                        {
                            firstName: 'Marjana',
                            lastName: 'Fiš',
                            email: 'noralynn.genae@0rdered.com',
                            role: findRole('ROLE_USER'),
                            team: findTeam('Green team'),
                            slackId: 'UDJQR410D',
                            slackUsername: 'noralynn.gena',
                            manager: findEmployee('jaydee.chanel')
                        },
                        {
                            firstName: 'Luka',
                            lastName: 'Kongo',
                            email: 'annalya.amara@0rdered.com',
                            role: findRole('ROLE_USER'),
                            team: findTeam('Green team'),
                            slackId: 'UDJQRKMQD',
                            slackUsername: 'annalya.amara',
                            manager: findEmployee('jaydee.chanel')
                        },
                        {
                            firstName: 'Luka',
                            lastName: 'Kongo',
                            email: 'jaydee.chanel@0rdered.com',
                            role: findRole('ROLE_TEAM_LEADER'),
                            team: findTeam('Green team'),
                            slackId: 'UDJ115GC9',
                            slackUsername: 'jaydee.chanel',
                            manager: findEmployee('g3844702')
                        },
                        // ceo
                        {
                            firstName: 'Dunc',
                            lastName: 'Ibeson',
                            email: 'g3844702@nwytg.net',
                            role: findRole('ROLE_MANAGER'),
                            team: findTeam('Red team'),
                            slackId: 'UDJ0ZADPT',
                            slackUsername: 'g3844702',
                            manager: null
                        }
                    ],
                    error => {
                        error;
                    }
                );
            }
        })
        .catch(err => {
            err;
        });
};
