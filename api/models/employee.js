var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;

const employeesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: String,
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    slackId: String,
    slackUsername: String,
    manager: [this]
});

employeesSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Employee', employeesSchema);
