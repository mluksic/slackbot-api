const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const kudosSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    sender: { type: Schema.Types.ObjectId, ref: 'Employee' },
    receiever: { type: Schema.Types.ObjectId, ref: 'Employee' },
    message: String,
    value: Number,
    approved: Number
});

module.exports = mongoose.model('Kudo', kudosSchema);
