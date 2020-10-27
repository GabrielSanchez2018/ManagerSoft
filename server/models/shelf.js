/*=========================
Name: Gabriel Sanchez
Date: April 20, 2020
Description: create a roleSchema for user shelf
==========================*/

const mongoose = require('mongoose');

// role schema
let shelfSchema = mongoose.Schema({
    text: {type: String, unique: true, dropDups: true}
});

// export for public use
module.exports = mongoose.model('Shelf', shelfSchema);