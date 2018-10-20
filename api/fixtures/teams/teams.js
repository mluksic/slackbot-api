const Team = require('../../models/team');

exports.loadTeams = () => {
    Team.find()
        .exec()
        .then(docs => {
            if (docs.length === 0) {
                Team.insertMany(
                    [
                        {
                            name: 'Testing team'
                        }
                    ],
                    error => {
                        error;
                    }
                );
            }
        });
};
