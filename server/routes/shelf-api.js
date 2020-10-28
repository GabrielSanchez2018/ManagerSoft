/*=========================
Name: Gabriel Sanchez
Date: April 20, 2020
Description: all API's used for shelf
==========================*/

const express = require('express');
const Shelf = require('../models/shelf');
const router = express.Router();

//Find all Shelfs
router.get('/', function(req, res, next) {
  Shelf.find({}, function(err, Shelfs) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Shelfs);
      res.json(Shelfs);
    }
  })
});

//Find by ID
router.get('/:ShelfId', function(req, res, next) {
  Shelf.findOne({'_id': req.params.ShelfId}, function(err, Shelfs) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Shelfs);
      res.json(Shelfs);
    }
  })
});

//Create Shelf
router.post('/', function(req, res, next) {
  let r = {
    text: req.body.text,
  };
  Shelf.create(r, function(err, Shelf) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Shelf);
      res.json(Shelf);
    }
  });
});

//Update Shelf
router.put('/:ShelfId', function(req, res, next) {
  Shelfs.findOne({'_id': req.params.ShelfId}, function(err, Shelf) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Shelf);
      Shelf.set({
        text: req.body.text
      });

      Shelf.save(function(err, Shelf) {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          console.log(Shelf);
          res.json(Shelf);
        }
      });
    }
  });
});

// Delete Shelf
router.delete('/:ShelfId', function(req, res, next) {
  Shelfs.findOneAndDelete({'_id': req.params.ShelfId}, function(err, Shelf) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Shelf);
      res.json(Shelf);
    }
  });
});

module.exports = router;
