const Role = require('../../models/role');

exports.loadRoles = () => {
    Role.find()
        .exec()
        .then(docs => {
            if (docs.length === 0) {
                Role.insertMany(
                    [
                        {
                            name: 'ROLE_USER'
                        },
                        {
                            name: 'ROLE_TEAM_LEAD'
                        },
                        {
                            name: 'ROLE_MANAGER'
                        }
                    ],
                    error => {
                        error;
                    }
                );
            }
        });
};
