/*=========================
Name: Gabriel Sanchez
Date: April 20, 2020
Description: all API's used for Items
==========================*/

const express = require('express');
const Item = require('../models/item');
const router = express.Router();

require('dotenv/config');
var fs = require('fs');
/***
 * Upload images
 */




// Image get

// router.get('/', (req, res) => {
//   Item.find({}, (err, items) => {
//       if (err) {
//           console.log(err);
//       }
//       else {
//           // res.render('app', { items: items });
//       }
//   });
// });

// // Uploading the image
// router.post('/', upload.single('image'), (req, res, next) => {

//   var img = {
//           data: req.body.filename,
//           contentType: 'image/png'
//       }

//   Item.create(img, (err, item) => {
//       if (err) {
//           console.log(err);
//       }
//       else {
//           // item.save();
//           console.log(item)

//       }
//   });
// });




//Find all Items
router.get('/', function(req, res, next) {
  Item.find({}, function(err, Items) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Items);
      res.json(Items);
    }
  })
});

//Find by ID
router.get('/:ItemCode', function(req, res, next) {
  Item.findOne({'itemCode': req.params.ItemCode}, function(err, Items) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Items);
      res.json(Items);
    }
  })
});

//Create Item
router.post('/', function(req, res, next) {


  let i = {
    itemCode: req.body.itemCode,
    itemDescription: req.body.itemDescription,
    itemPrice: req.body.itemPrice,
    itemType: req.body.itemType,
    itemQty: req.body.itemQty, 

  };
  Item.create(i, function(err, Item) {
    console.log('Here is the Item',Item)
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Item);
      res.json(Item);

    }
  });
});

//Update Item
router.put('/:ItemId', function(req, res, next) {
  Items.findOne({'_id': req.params.ItemId}, function(err, Item) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Item);
      Item.set({
        text: req.body.text
      });

      Item.save(function(err, Item) {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          console.log(Item);
          res.json(Item);
        }
      });
    }
  });
});

// Delete Item
router.delete('/:ItemId', function(req, res, next) {
  Item.findOneAndDelete({'_id': req.params.ItemId}, function(err, Item) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Item);
      res.json(Item);
    }
  });
});

module.exports = router;
