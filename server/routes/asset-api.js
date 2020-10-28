/*=========================
Name: Gabriel Sanchez
Date: April 20, 2020
Description: all API's used for Assets
==========================*/

const express = require('express');
const Asset = require('../models/assets');
const router = express.Router();

//Find all Assets
router.get('/', function(req, res, next) {
  Asset.find({}, function(err, Assets) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Assets);
      res.json(Assets);
    }
  })
});

//Find by ID
router.get('/:AssetId', function(req, res, next) {
  Assets.findOne({'_id': req.params.AssetId}, function(err, Assets) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Assets);
      res.json(Assets);
    }
  })
});

//Create Asset
router.post('/', function(req, res, next) {
  let r = {
    assetNumber: req.body.assetNumber,
    assetTyp: req.body.assetTyp,
    assetModel: req.body.assetModel,
    types: req.body.types,
    location: req.body.location,
    shelf: req.body.shelf,
    bin: req.body.bin
  };
  Asset.create(r, function(err, Asset) {
    console.log('Here is the asset',Asset)
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Asset);
      res.json(Asset);
    }
  });
});

//Update Asset
router.put('/:AssetId', function(req, res, next) {
  Assets.findOne({'_id': req.params.AssetId}, function(err, Asset) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Asset);
      Asset.set({
        text: req.body.text
      });

      Asset.save(function(err, Asset) {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          console.log(Asset);
          res.json(Asset);
        }
      });
    }
  });
});

// Delete Asset
router.delete('/:AssetId', function(req, res, next) {
  Asset.findOneAndDelete({'_id': req.params.AssetId}, function(err, Asset) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Asset);
      res.json(Asset);
    }
  });
});

module.exports = router;
