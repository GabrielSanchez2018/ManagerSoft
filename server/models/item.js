/*=========================
Name: Gabriel Sanchez
Date: April 20, 2020
Description: items
==========================*/

const mongoose = require('mongoose');
//const assetTypeSchema = require('../models/asset-type')





// role schema
let itemSchema = mongoose.Schema({
    itemCode: {type: String},
    itemDescription: {type:String},
    itemPrice: {type: String, default: false},
    itemType: {type: String},
    date_created: {type: Date, default: new Date()},
    //img:{ data: Buffer, contentType: String}



});

// export for public use
module.exports = mongoose.model('Items', itemSchema);
