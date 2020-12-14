/*=========================
Name: Gabriel Sanchez
Date: April 20, 2020
Description: all API's used for Manual ManualItems
==========================*/

const express = require('express');
const ManualItem = require('../models/manualitems');
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

//Find all ManualItems
router.get('/', function(req, res, next) {
  ManualItem.find({}, function(err, ManualItems) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(ManualItems);
      res.json(ManualItems);
    }
  })
});

//Find by ID
router.get('/:ManualItemCode', function(req, res, next) {
  ManualItem.findOne({'ManualItemCode': req.params.ManualItemCode}, function(err, ManualItems) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(ManualItems);
      res.json(ManualItems);
    }
  })
});

//Create ManualItem
router.post('/',upload.single('img'), function(req, res, next) {
  let i = {
    itemCode: req.body.itemCode,
    itemDescription: req.body.itemDescription,
    itemPrice: req.body.itemPrice,
    itemType: req.body.itemType,
    img: req.file.path

  };
  ManualItem.create(i, function(err, ManualItem) {
    console.log('Here is the ManualItem',ManualItem)
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(ManualItem);
      res.json(ManualItem);

    }
  });
});

//Update ManualItem
router.put('/:ManualItemId', function(req, res, next) {
  ManualItem.findOne({'_id': req.params.ManualItemId}, function(err, ManualItem) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(ManualItem);
      ManualItem.set({
        text: req.body.text
      });

      ManualItem.save(function(err, ManualItem) {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          console.log(ManualItem);
          res.json(ManualItem);
        }
      });
    }
  });
});

// Delete ManualItem
router.delete('/:ManualItemId', function(req, res, next) {
  ManualItem.findOneAndDelete({'_id': req.params.ManualItemId}, function(err, ManualItem) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(ManualItem);
      res.json(ManualItem);
    }
  });
});

module.exports = router;
