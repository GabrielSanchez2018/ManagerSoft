/*=========================
Name: Gabriel Sanchez
Date: April 20, 2020
Description: Assets
==========================*/

const mongoose = require('mongoose');
//const assetTypeSchema = require('../models/asset-type')

let assetTypeSchema = mongoose.Schema({
  text: {type: String},
});//



// role schema
let assetsSchema = mongoose.Schema({
    assetNumber: {type: String},
    assetTyp: {type:String},
    status: {type: Boolean, default: false},
    assetModel: {type: String},
    types: {type:String},
    location: {types: String},
   


});

// export for public use
module.exports = mongoose.model('Assets', assetsSchema);
