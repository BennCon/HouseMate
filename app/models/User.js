const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userID: {type: String, unique: true},
    name: String,
    house: String
});

module.exports = mongoose.model('User', userSchema);
