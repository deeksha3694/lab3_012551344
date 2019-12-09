const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ownerSchema = new Schema({ 
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    restaurant: String,
    cuisine : String,
    items : String
})

module.exports = mongoose.model('Owner',ownerSchema);