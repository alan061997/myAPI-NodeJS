const express = require('express');
const router = express.Router();

//  Handlers Methods Requests for /products

//  Handler GET Requests for /products
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET request to /products'
  });
});

//  Handler POST Requests for /products
router.post('/', (req, res, next) => {
  const product = {
    name : req.body.name,
    price: req.body.price
  };
  res.status(200).json({
    message: 'Handling POST request to /products',
    product : product
  });
});


//  Handler GET Requests for /products/{id}
router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  if (id === 'special'){
    res.status(200).json({
      message: 'You have discovered the special ID.',
      id: id
    });
  } else {
    res.status(200).json({
      message: 'You have passed an ID.',
      id : id
    });
  }
});

//  Handler PATCH Requests for /products/{id}
router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId;
  res.status(200).json({
    message : 'Updated Product',
    id : id
  });
});

//  Handler DELETE Requests for /products/{id}
router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;
  res.status(200).json({
    message : 'Deleted Product',
    id : id
  });
});


module.exports = router;
