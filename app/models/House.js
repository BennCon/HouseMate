const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const houseSchema = new Schema({
    houseID: {type: String, unique: true},
    name: String,
    members: Array,
    numberOfMembers: Number,
    bills: Array 
});

module.exports = mongoose.model('House', houseSchema);
