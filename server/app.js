/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');


const UserApi = require('./routes/user-api');
const SessionApi = require('./routes/session-api');
const AssetApi = require('./routes/asset-api');
const AssetTypeApi = require('./routes/asset-type-api');
const LocationApi = require('./routes/location-api');
const ShelfApi = require('./routes/shelf-api');
const BinApi = require('./routes/bin-api');
const ItemApi = require('./routes/item-api');
const CustomerApi = require('./routes/customer-api');
const CartApi = require('./routes/cart-api');
const ManualItems = require('./routes/manualitems-api');


/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../dist/bcrs')));
app.use('/', express.static(path.join(__dirname, '../dist/bcrs')));

/**
 * Variables
 */
const port = 3000; // server port

// TODO: This line will need to be replaced with your actual database connection string
const conn = 'mongodb+srv://Gabriel:Jairo500!@cluster0.djivq.gcp.mongodb.net/brcs?retryWrites=true&w=majority'
// const conn = "mongodb://localhost:27017/bcrs"

//'mongodb+srv://admin:admin@cluster0.djivq.gcp.mongodb.net/brcs?retryWrites=true&w=majority';

/**
 * Database connection
 */
mongoose.connect(conn, {
  promiseLibrary: require('bluebird'),
  useUnifiedTopology: true,
  useNewUrlParser: true,

}).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection

/***
 *   Set EJS as templating engine  
 */
app.set("view engine", "ejs"); 


/**
 * API(s)
 */
app.use('/api/users', UserApi);
app.use('/api/session', SessionApi);
app.use('/api/asset', AssetApi);
app.use('/api/assettype', AssetTypeApi);
app.use('/api/location', LocationApi);
app.use('/api/shelf', ShelfApi);
app.use('/api/bin', BinApi);
app.use('/api/items', ItemApi);
app.use('/api/customer', CustomerApi);
app.use('/api/cart', CartApi);
app.use('/api/manualitems', ManualItems);
/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
