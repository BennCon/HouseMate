const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const normUserSchema = new Schema({
    userID: {type: String, unique: true},
    name: String,
});

module.exports = mongoose.model('NormUser', normUserSchema);
