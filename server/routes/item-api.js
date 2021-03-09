/*=========================
Name: Gabriel Sanchez
Date: April 20, 2020
Description: all API's used for Items
==========================*/

const express = require('express');
const Item = require('../models/item');
const router = express.Router();
const multer = require('multer');

require('dotenv/config');
var fs = require('fs');
/***
 * Upload images
 */

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './uploads/')
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname + '-' + Date.now())
      console.log('file',file)
  }

});

var upload = multer({ storage: storage });


 console.log(storage)







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
    img: req.file.path

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
