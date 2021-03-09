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
    itemPrice: {type: String,},
    itemType: {type: String},
    itemQty: {type: Number},
    date_created: {type: Date },
    date_updated: {type: Date},
    username: {type: String},
    img:{ type: String}



});

// export for public use
module.exports = mongoose.model('Items', itemSchema);
