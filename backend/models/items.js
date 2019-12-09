const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    itemname: String,
    itemtype: String,
    ownerID: String 
})

module.exports = mongoose.model('Item',itemSchema);