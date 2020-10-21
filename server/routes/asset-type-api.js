/*=========================
Name: Gabriel Sanchez
Date: April 20, 2020
Description: all API's used for AssetTypes
==========================*/

const express = require('express');
const AssetType = require('../models/asset-type');
const router = express.Router();

//Find all AssetTypes
router.get('/', function(req, res, next) {
  AssetType.find({}, function(err, AssetTypes) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(AssetTypes);
      res.json(AssetTypes);
    }
  })
});

//Find by ID
router.get('/:AssetTypeId', function(req, res, next) {
  AssetType.findOne({'_id': req.params.AssetTypeId}, function(err, AssetTypes) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(AssetTypes);
      res.json(AssetTypes);
    }
  })
});

//Create AssetType
router.post('/', function(req, res, next) {
  let r = {
    text: req.body.text,
  };
  AssetType.create(r, function(err, AssetType) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(AssetType);
      res.json(AssetType);
    }
  });
});

//Update AssetType
router.put('/:AssetTypeId', function(req, res, next) {
  AssetTypes.findOne({'_id': req.params.AssetTypeId}, function(err, AssetType) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(AssetType);
      AssetType.set({
        text: req.body.text
      });

      AssetType.save(function(err, AssetType) {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          console.log(AssetType);
          res.json(AssetType);
        }
      });
    }
  });
});

// Delete AssetType
router.delete('/:AssetTypeId', function(req, res, next) {
  AssetTypes.findOneAndDelete({'_id': req.params.AssetTypeId}, function(err, AssetType) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(AssetType);
      res.json(AssetType);
    }
  });
});

module.exports = router;
