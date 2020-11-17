/*=========================
Name: Gabriel Sanchez
Date: April 20, 2020
Description: Cart
==========================*/

const mongoose = require('mongoose');
//const assetTypeSchema = require('../models/asset-type')


// let lineItemSchema = mongoose.Schema({
//   itemCode: {type: Number},
//     itemDescription: {type:String},
//     itemPrice: {type: Number},
//     itemType: {type: String},
// });


// role schema
let cartSchema = mongoose.Schema({
    customer: {type: Number, default: 0},
    // lineItems: [lineItemSchema],
    itemCode: {type: Number},
    itemDescription: {type:String},
    itemPrice: {type: Number},
    itemType: {type: String},
    date_created: {type: Date, default: new Date()},
    //img:{ data: Buffer, contentType: String}



});

// export for public use
module.exports = mongoose.model('Cart', cartSchema);
