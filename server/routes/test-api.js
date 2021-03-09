/*=========================
Name: Gabriel Sanchez
Date: Oct 20, 2020
Description: test Rest API
==========================*/

const express = require('express');
const router = express.Router();

//Find all Bins
// router.get('/', function(req, res, next) {
//   Bin.find({}, function(err, Bins) {
//     if (err) {
//       console.log(err);
//       return next(err);
//     } else {
//       console.log(Bins);
//       res.json(Bins);
//     }
//   })
// });



const request = require('request');
const url = "http://api.openweathermap.org/data/2.5/weather?zip=68117,us&appid=5b512d897814d21424625e9dc09bfa65&units=imperial";
//api.openweathermap.org/data/2.5/weather?q=omaha&appid=2172797&appid=5b512d897814d21424625e9dc09bfa65
//api.openweathermap.org/data/2.5/weather?zip=68117,1&appid=2172797&appid=5b512d897814d21424625e9dc09bfa65

router.get('/weather', (req, res) => {
  request(url, (error, response, body) => {
      if (!error && response.statusCode == 200) {
          var info = JSON.parse(body)
          res.send(info);
      }
  })
})
module.exports = router;