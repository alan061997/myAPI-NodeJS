const express = require('express');
const router = express.Router();

//  Handlers Method Requests for /orders

//  Handler GET Requests for /orders
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET request to /orders'
  });
});

//  Handler POST Requests for /orders
router.post('/', (req, res, next) => {
  const order = {
    productId : req.body.productId,
    quantity : req.body.quantity
  };
  res.status(201).json({
    message: 'Handling POST request to /orders',
    order: order
  });
});

//  Handler GET Requests for /orders/details
router.get('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
  res.status(200).json({
    message : 'Handling GET request to /orders/details',
    id : id
  });
});

//  Handler DELETE Requests for /orders/details
router.delete('/:orderId', (req, res, next) => {
  const id = req.params.orderId;
  res.status(200).json({
    message : 'Handling DELETE request to /orders/details',
    id : id
  });
});


module.exports = router;
