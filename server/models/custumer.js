/*=========================
Name: Gabriel Sanchez
Date: Nov 2, 2020
Description: Custumer
==========================*/

const mongoose = require('mongoose');
//const assetTypeSchema = require('../models/asset-type')
let lineItemSchema = mongoose.Schema({
  itemCode: {type: Number},
    itemDescription: {type:String},
    itemPrice: {type: Number},
    itemType: {type: String},
    date_created: {type: Date, default: new Date()},
    dateNumber: {type: Number},
    time: {type: String}

});


// role schema
let customerSchema = mongoose.Schema({
    customerNumber: {type: Number},
    lineItems: [lineItemSchema],
    date_created: {type: Date, default: new Date()},
    dateNumber: {type: Number},
    month: {type: String},
    day: {type: String},
    dayNumber: {type: Number}
});

// export for public use
module.exports = mongoose.model('Customer', customerSchema);
