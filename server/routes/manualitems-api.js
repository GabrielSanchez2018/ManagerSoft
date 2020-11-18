/*=========================
Name: Gabriel Sanchez
Date: April 20, 2020
Description: all API's used for Manual ManualItems
==========================*/

const express = require('express');
const ManualItem = require('../models/manualitems');
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
router.post('/', function(req, res, next) {
  let i = {
    itemCode: req.body.itemCode,
    itemDescription: req.body.itemDescription,
    itemPrice: req.body.itemPrice,
    itemType: req.body.itemType
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
