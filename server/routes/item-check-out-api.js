/*=========================
Name: Gabriel Sanchez
Date: April 20, 2020
Description: all API's used for Items
==========================*/

const express = require('express');
const ItemCheckOut = require('../models/item-check-out');
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
  ItemCheckOut.find({}, function(err, Items) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Items);
      res.json(Items);
    }
  })
});


router.get('/itemgraph', function(req, res, next) {
  ItemCheckOut.aggregate([
    {"$unwind": "$checkoutasset"},
    {
      "$group": {
        "_id": {
          "assetnumber": "$checkoutasset.assetNumber",
          "assettype": "$checkoutasset.assetTyp",
          "assetmodel": "$checkoutasset.assetModel",
          "img" : "$checkoutasset.img",
          "user": "$username",
          // "quantity": "$quantity"

        },
        "quantity": {"$sum": "$quantity" },
        "count": {"$sum": 1},
      }
    }, {"$sort": {"_id.assetmodel": 1}},
  ], function(err, purchaseGraph) {
      if(err) {
        console.log(err);
        return next(err);
      } else {
        console.log("--PurchaseGraph data structure--");
        console.log(purchaseGraph);
        res.json(purchaseGraph);
      }
  });
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
    // assetNumber: req.body.assetNumber,
    // assetType: req.body.assetType,
    // status: req.body.status,
    // assetModel: req.body.assetModel,
    // type: req.body.type,
    // location: req.body.location,
    // shelf: req.body.shelf,
    // bin: req.body.bin,
    // quantity: req.body.quantity,
    checkoutasset: req.body.checkoutasset,
    date_created: req.body.date_created,
    username: req.body.username,
    quantity: req.body.quantity
    //img: req.file.path

  };
  ItemCheckOut.create(i, function(err, Item) {
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
