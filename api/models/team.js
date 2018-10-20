const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    members: [{ type: Schema.Types.ObjectId, ref: 'Employee' }]
});

module.exports = mongoose.model('Team', teamSchema);
