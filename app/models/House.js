const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const houseSchema = new Schema({
    houseID: {type: String, unique: true},
    name: String,
    ownerID: {type: String, unique: true},
    members: Array,
    bills: Array 
});

module.exports = mongoose.model('House', houseSchema);
