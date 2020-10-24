/*=========================
Name: Gabriel Sanchez
Date: Oct 24, 2020
Description: all API's used for Location
==========================*/

const express = require('express');
const Location = require('../models/location');
const router = express.Router();

//Find all Locations
router.get('/', function(req, res, next) {
  Location.find({}, function(err, Locations) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Locations);
      res.json(Locations);
    }
  })
});

//Find by ID
router.get('/:LocationId', function(req, res, next) {
  Location.findOne({'_id': req.params.LocationId}, function(err, Locations) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Locations);
      res.json(Locations);
    }
  })
});

//Create Location
router.post('/', function(req, res, next) {
  let r = {
    text: req.body.text,
  };
  Location.create(r, function(err, Location) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Location);
      res.json(Location);
    }
  });
});

//Update Location
router.put('/:LocationId', function(req, res, next) {
  Location.findOne({'_id': req.params.LocationId}, function(err, Location) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Location);
      Location.set({
        text: req.body.text
      });

      Location.save(function(err, Location) {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          console.log(Location);
          res.json(Location);
        }
      });
    }
  });
});

// Delete Location
router.delete('/:LocationId', function(req, res, next) {
  Location.findOneAndDelete({'_id': req.params.LocationId}, function(err, Location) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Location);
      res.json(Location);
    }
  });
});

module.exports = router;
