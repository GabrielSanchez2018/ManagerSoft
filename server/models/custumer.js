/*=========================
Name: Gabriel Sanchez
Date: Nov 2, 2020
Description: Custumer
==========================*/

const mongoose = require('mongoose');
//const assetTypeSchema = require('../models/asset-type')

let assetTypeSchema = mongoose.Schema({
  text: {type: String},
});//



// role schema
let customerSchema = mongoose.Schema({
    cutumerNumber: {type: String},
    itemCode: {type:String},
    itemDescription: {type: String},
    date_created: {type: Date, default: new Date()}
});

// export for public use
module.exports = mongoose.model('Customer', customerSchema);
