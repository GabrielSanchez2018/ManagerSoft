/*=========================
Name: Gabriel Sanchez
Date: April 20, 2020
Description: Assets
==========================*/

const mongoose = require('mongoose');


let assetTypeSchema = mongoose.Schema({
  text: {type: String},
});


// export for public use
module.exports = mongoose.model('Assettype', assetTypeSchema);
