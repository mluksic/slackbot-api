const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kudosSchema = mongoose.Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'Employee' },
    receiver: { type: Schema.Types.ObjectId, ref: 'Employee' },
    message: String,
    value: Number,
    approved: Number,
    createdAt: Date
});

module.exports = mongoose.model('Kudo', kudosSchema);
