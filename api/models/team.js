var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const teamSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    members: [{ type: Schema.Types.ObjectId, ref: 'Employee' }]
});

teamSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Team', teamSchema);
