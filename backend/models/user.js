const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    items: String 
})

module.exports = mongoose.model('Item'.itemSchema);