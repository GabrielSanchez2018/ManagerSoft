/*=========================
Name: Gabriel Sanchez
Date: March 3, 2021
Description: Item Check out
Schema to keep track of cheked out items.
==========================*/

const mongoose = require('mongoose');
//const assetTypeSchema = require('../models/asset-type')

let assetTypeSchema = mongoose.Schema({
  text: {type: String},
});//



// role schema
let itemCheckOutSchema = mongoose.Schema({
    // assetNumber: {type: String},
    // assetType: {type:String},
    // status: {type: Boolean, default: false},
    // assetModel: {type: String},
    // type: {type:String},
    // location: {type: String},
    // shelf: {type:String},
    // bin: {type: String},
    // quantity: {type: Number, default: 1},
    checkoutasset: {type: Array},
    date_created: {type: Date, default: new Date()},
    username: {type: String},
    isCheckedOut: {type: Boolean, default: true}
   // img:{ type: String}



});

// export for public use
module.exports = mongoose.model('Itemscheckout', itemCheckOutSchema);