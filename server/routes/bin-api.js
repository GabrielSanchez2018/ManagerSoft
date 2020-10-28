/*=========================
Name: Gabriel Sanchez
Date: Oct 20, 2020
Description: all API's used for bin
==========================*/

const express = require('express');
const Bin = require('../models/bin');
const router = express.Router();

//Find all Bins
router.get('/', function(req, res, next) {
  Bin.find({}, function(err, Bins) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Bins);
      res.json(Bins);
    }
  })
});

//Find by ID
router.get('/:BinId', function(req, res, next) {
  Bin.findOne({'_id': req.params.BinId}, function(err, Bins) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Bins);
      res.json(Bins);
    }
  })
});

//Create Bin
router.post('/', function(req, res, next) {
  let r = {
    text: req.body.text,
  };
  Bin.create(r, function(err, Bin) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Bin);
      res.json(Bin);
    }
  });
});

//Update Bin
router.put('/:BinId', function(req, res, next) {
  Bins.findOne({'_id': req.params.BinId}, function(err, Bin) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Bin);
      Bin.set({
        text: req.body.text
      });

      Bin.save(function(err, Bin) {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          console.log(Bin);
          res.json(Bin);
        }
      });
    }
  });
});

// Delete Bin
router.delete('/:BinId', function(req, res, next) {
  Bins.findOneAndDelete({'_id': req.params.BinId}, function(err, Bin) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Bin);
      res.json(Bin);
    }
  });
});

module.exports = router;
