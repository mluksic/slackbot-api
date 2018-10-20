const teamsFixtures = require('./teams/teams');
const rolesFixtures = require('./roles/roles');
const employeesFixtures = require('./employees/employees');

exports.loadData = () => {
    teamsFixtures.loadTeams();
    rolesFixtures.loadRoles();
    employeesFixtures.loadEmployees();
};
