const mongoose = require('mongoose');

const schema = mongoose.Schema({
    "name": String,
    "avatar": String,
    "BrandName": String,
    "RAM": String,
    "item":Number
})

module.exports = mongoose.model("Laptop",schema,"Laptop")