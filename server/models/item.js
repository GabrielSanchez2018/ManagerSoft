/*=========================
Name: Gabriel Sanchez
Date: April 20, 2020
Description: items
==========================*/

const mongoose = require('mongoose');
//const assetTypeSchema = require('../models/asset-type')




// role schema
let itemSchema = mongoose.Schema({
    itemCode: {type: Number},
    itemDescription: {type:String},
    itemPrice: {type: String, default: false},
    itemType: {type: String},
    itemQty: {type: Number},
    date_created: {type: Date },
    //img:{ data: Buffer, contentType: String}



});

// export for public use
module.exports = mongoose.model('Items', itemSchema);
