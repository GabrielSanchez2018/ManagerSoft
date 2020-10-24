/*=========================
Name: Gabriel Sanchez
Date: Oct 24, 2020
Description: create a roleSchema for locations
==========================*/

const mongoose = require('mongoose');

// role schema
let locationSchema = mongoose.Schema({
    text: {type: String, unique: true, dropDups: true}
});

// export for public use
module.exports = mongoose.model('Location', locationSchema);