// Importing node dependencies
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');
// Import mySQL dependency
const mysql = require('mysql');

// Connecting to the mySQL database
const db = mysql.createConnection({
    host : "localhost",
    user : "alan",
    password : "1234",
    database : "node-rest-shop"
});


// Importing routes javascript files
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// API middleware

//Body Parser for URL encoding and parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Morgan middleware request logger
app.use(morgan('dev'));

// CORS error handler
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, PATCH, GET");
    return res.status(200).json({});
  }
  next();
});

// Initialize database connection
db.connect();

// Routes that handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports  = app;
