/*=========================
Name: Gabriel Sanchez
Date: Oct 20, 2020
Description: test Rest API
==========================*/

const express = require('express');
const Test = require('../models/');
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