const teamsFixtures = require('./teams/teams');
const rolesFixtures = require('./roles/roles');

exports.loadData = () => {
    teamsFixtures.loadTeams();
    rolesFixtures.loadRoles();
};
