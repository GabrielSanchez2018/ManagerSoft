/*=========================
Name: Gabriel Sanchez
Date: Sep 20, 2020
Description: all API's used for the cart
==========================*/

const express = require('express');
const Cart = require('../models/cart');
const router = express.Router();
var mongoose = require('mongoose');

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




//Find all Items
router.get('/', function(req, res, next) {
  Cart.find({}, function(err, Carts) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Carts);
      res.json(Carts);
    }
  })
});

//Find by ID
router.get('/:CartCode', function(req, res, next) {
  Cart.findOne({'CartCode': req.params.CartCode}, function(err, Carts) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Carts);
      res.json(Carts);
    }
  })
});

//Create Cart
router.post('/', function(req, res, next) {
  let i = {
    customer: req.body.customer,
    // lineItems: req.body.lineItems,
    itemCode: req.body.itemCode,
    itemDescription: req.body.itemDescription,
    itemPrice: req.body.itemPrice,
    itemType: req.body.itemType, 
    time: req.body.time 
  };
  Cart.create(i, function(err, Cart) {
    console.log('Here is the Cart',Cart)
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Cart);
      res.json(Cart);

    }
  });
});

// CreateTask API -
// router.post("/api/cart/:CartId/lineItems", function(req, res, next) {
//   Cart.findOne({ customer: req.params.customer }, function(err, cart) {
//     if (err) {
//       console.log(err);
//       return next(err);
//     } else {
//       console.log(cart);

//       const lineItems = {
//         itemCode: req.body.itemCode,
//         itemDescription: req.body.itemDescription,
//         itemPrice: req.body.itemPrice,
//         itemType: req.body.itemType,
//       };

//       cart.lineItems.push(lineItems);
//       cart.save(function(err, cart) {
//         if (err) {
//           console.log(err);
//           return next(err);
//         } else {
//           console.log(cart);
//           res.json(cart);
//         }
//       });
//     }
//   });
// });

//Update Cart
router.put('/:CartId', function(req, res, next) {
  Carts.findOne({'_id': req.params.CartId}, function(err, Cart) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Cart);
      Cart.set({
        text: req.body.text
      });

      Cart.save(function(err, Cart) {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          console.log(Cart);
          res.json(Cart);
        }
      });
    }
  });
});

// Delete Cart
router.delete('/:CartId', function(req, res, next) {
  Cart.findOneAndDelete({'_id': req.params.CartId}, function(err, Cart) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Cart);
      res.json(Cart);
    }
  });
});

router.delete('/', function(req, res, next) {
  Cart.deleteMany({}, function(err, Cart) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Cart);
      res.json(Cart);
    }
  });
});

// router.delete('/', function () {
//   console.log("db connect");
//   var db = mongoose.connection;
//   db.dropCollection("carts", function (err, result) {
//       if (err) {
//           console.log("error delete collection");
//       } else {

//           console.log("delete collection success");

//       }

//   });


// })

module.exports = router;
