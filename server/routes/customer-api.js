/*=========================
Name: Gabriel Sanchez
Date: April 20, 2020
Description: Customer API
==========================*/

const express = require('express');
const Customer = require('../models/custumer');

const router = express.Router();



// Get Customer data
router.get('/', function(req, res, next){
  Customer.find({}, function(err, Customers){
    if(err){
      console.log(err);
      return next(err);
    } else {
      console.log(Customers);
      res.json(Customers);
    }
  })
})

router.get('/purchases-graph', function(req, res, next) {
  Customer.aggregate([
    {"$unwind": "$lineItems"},
    {
      "$group": {
        "_id": {
          "title": "$lineItems.itemDescription",
          "price": "$lineItems.itemPrice",
          "code": "$lineItems.itemCode",

        },
        "totalprice": {"$sum": "$lineItems.itemPrice" },
        "count": {"$sum": 1},
      }
    }, {"$sort": {"_id.title": 1}},
  ], function(err, purchaseGraph) {
      if(err) {
        console.log(err);
        return next(err);
      } else {
        console.log("--PurchaseGraph data structure--");
        console.log(purchaseGraph);
        res.json(purchaseGraph);
      }
  });
});

router.get('/recordbydate', function(req, res, next) {
  Customer.aggregate([
    {"$unwind": "$lineItems"},
    {
      "$group": {
        "_id": {
          "bydate": "$lineItems.date_created",
          "title": "$lineItems.itemDescription",
          "price": "$lineItems.itemPrice",
          "code": "$lineItems.itemCode",

        },
        "totalprice": {"$sum": "$lineItems.itemPrice" },
        "count": {"$sum": 1},
      }
    }, {"$sort": {"_id.title": 1}},
  ], function(err, purchaseGraph) {
      if(err) {
        console.log(err);
        return next(err);
      } else {
        console.log("--PurchaseGraph data structure--");
        console.log(purchaseGraph);
        res.json(purchaseGraph);
      }
  });
});

// Find Barcode Report
// router.get('/barcodes-graph', function(req, res, next) {
//   Barcodes.aggregate([
//     //First function is to get rid of an error
//     {
//       "$group": {
//         "code": {"$first": "$barProductCode"},
//         "_id": "$itemdescription",
//        "price": {"$first":"$price"},
//         //"itemdescription": {"$first": "$itemdescription"},
//         "count": {"$sum": 1},

//        "totalweight" : {"$sum": "$barBoxNetWeight"},
//        "totalprice": {"$sum": "$totalprice" },
//        //"username": {"$first": "$username"},
//       },



//     // {
//     //   "$group": {
//     //     "_id":  {
//     //       "code": "$barProductCode",
//     //       "itemdescription": "$itemdescription",
//     //       "username": "$username",
//     //       //"price": "$totalprice",
//     //      //"totalWeight": {"$sum": "$barBoxNetWeight"}
//     //     },
//     //     "count": {"$sum": 1},
//     //   }
//     }, {"$sort": {"totalprice": -1}},
//   ], function(err, barcodeGraph) {
//       if(err) {
//         console.log(err);
//         return next(err);
//       } else {
//         console.log("--PurchaseGraph data structure--");
//         console.log(barcodeGraph);
//         res.json(barcodeGraph);
//       }
//   });
// });

// Api Item total by employee when they select two items
// router.get('/order-sum', function(req, res, next){
//   Barcodes.aggregate([
//   {"$match":{} },
//   {"$group": {"_id": "$username", "total":{"$sum": "$totalprice"}}},

//   ], function(err, ordergraph){
//     if(err) {
//       console.log(err);
//       return next(err);
//     } else {
//       console.log("--PurchaseGraph data structure--");
//       console.log(ordergraph);
//       res.json(ordergraph);
//     }
//   });
// });




router.post('/', function(req, res, next) {
  let customer = {
    customerNumber: req.body.customerNumber,
    lineItems: req.body.lineItems,

  };
  Customer.create(customer, function(err, Customer) {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Customer);
      res.json(Customer);

    }
  });
});

 //Find Customer by Id
router.get('/:usernameId', function(req, res, next){
  Customer.findOne({'username' : req.params.usernameId}, function(err, Customers){
    if(err){
      console.log(err);
      return next(err);
    } else {
      console.log(Customers);
      res.json(Customers)
    }
  })
})

//Get some items from Customers
// Get all Customers
// router.get('/barcodeRo', function(req, res, next){
//   Barcodes.find({}, 'barcode', function(err, barcodes){
//     if(err){
//       console.log(err);
//       return next(err);
//     } else {
//       console.log(barcodes);
//       res.json(barcodes)
//     }
//   });
// });

// Get all Customers
// router.get('/', function(req, res, next){
//   Customer.find({}, "username", function(err, Customers){
//     if(err){
//       console.log(err);
//       return next(err);
//     } else {

//       console.log(Customers);
//       res.json(Customers)
//     }
//   });
// });
// router.delete('/alldelete', function () {
//   console.log("db connect");
//   var db = mongoose.connection;
//   db.dropCollection("barcodes", function (err, result) {
//       if (err) {
//           console.log("error delete collection");
//       } else {

//           console.log("delete collection success");

//       }

//   });


// })




router.delete('/:CustomerId', function(req, res, next){
  Customer.findOneAndDelete({'_id': req.params.CustomerId}, function(err, Customers){
    if(err) {
      console.log(err);
      return next(err);
    } else {
      console.log(Customers);
      res.json(Customers);
    }
  })
})


// Delete all records


// router.post('/barcodes', function(req, res, next){
//   Barcodes.find({}, function(err, barcodes){

//     if(err){
//       console.log(err);
//       return next(err)
//     } else {
//       console.log(barcodes);



//       const barcodeId = req.body.barcode

//       console.log(barcodeId)




//       var shippingContainer = Array.from(barcodeId.slice(0,2));
//       labelShippingContainer = shippingContainer.join('');
//       //Packaging Indicator
//       var packagingIndicator = Array.from(barcodeId.slice(2,3));
//       labelpackagingIndicator = packagingIndicator.join('');
//       // Manufacturer number
//       var packagingManufacturerNumber = Array.from(barcodeId.slice(3,9));
//       labelpackagingManufacturerNumber = packagingManufacturerNumber.join('')
//       //Product Code
//       var productCode = Array.from(barcodeId.slice(9,15));
//       labelproductCode = productCode.join('');
//       //Shipping Container
//       var shippingContainercs = Array.from(barcodeId.slice(15,16));
//       labelshippingContainercs = shippingContainercs.join('');
//       //Net Weight
//       var BoxNetWeightIdentifier = Array.from(barcodeId.slice(16,20));
//       labelnetWeight = BoxNetWeightIdentifier.join('');

//       //Box Weight
//       var boxWeight = Array.from(barcodeId.slice(20,26));
//       labelWeight = boxWeight.join('')/10;
//       //Date of Production Indeentifier
//       var dateIndenfier = Array.from(barcodeId.slice(26,28));
//       labeldateindentifier = dateIndenfier.join('');
//       //Date of Production yymmdd
//       var dateOfProduction = Array.from(barcodeId.slice(28,34));
//       labeldateofproduction = dateOfProduction.join('');
//       //Serial Number
//       var serialNumberIndenfier = Array.from(barcodeId.slice(34,36));
//       labelserialnumber = serialNumberIndenfier.join('');
//       //10 Digit Serial
//       var serialIdenfier = Array.from(barcodeId.slice(34,46));
//       labelserialidentifier = serialIdenfier.join('')


//       const barcode = {

//         username: req.body.username,
//         barcode: req.body.barcode,
//         barShippingContainerCode : labelShippingContainer,
//         barPackagingIndicator : labelpackagingIndicator,
//         barManufacturerNumber : labelpackagingManufacturerNumber,
//         barProductCode : labelproductCode,
//         barShippingContainerCS : labelshippingContainercs,
//         barBoxNetWeightIdentifier: labelnetWeight,
//         barBoxNetWeight : labelWeight,
//         barDateOfProduction : labeldateindentifier,
//         barDateOfProductionyymmdd : labeldateofproduction,
//         barSerialNumberIndentifier: labelserialnumber,
//         barTenDigitSerial : labelserialidentifier
//       }

//       barcodes.barcode.push(barcode);
//       barcodes.save(function(err, barcodes){
//         if (err){
//           console.log(err);
//           return next(err);
//         } else {
//           console.log(barcodes);
//           res.json(barcodes)
//         }
//       });

//     }
//   });
// });



module.exports = router;


//  //10 Digit Serial
  //  var serialIdenfier = Array.from(barcode.slice(34,46));
  //  labelserialidentifier = serialIdenfier.join('');


              // barShippingContainerCode : labelShippingContainer,
             //barPackagingIndicator : labelpackagingIndicator,
             //barManufacturerNumber : labelpackagingManufacturerNumber,


            //barShippingContainerCS : labelshippingContainercs,
            // barBoxNetWeightIdentifier: labelnetWeight,
             //barDateOfProduction : labeldateindentifier,
             //barDateOfProductionyymmdd : labeldateofproduction,
             //barSerialNumberIndentifier: labelserialnumber,
             //barTenDigitSerial : labelserialidentifier,
