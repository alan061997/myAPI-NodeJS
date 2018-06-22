// Dependencies

const express = require('express');
const router = express.Router();

// Authorization module
const checkAuth = require('../../middleware/check-auth');

// Controller
const ProductsController = require('../controller/products');


//  Handlers Methods Requests for /products

//  Handler GET Requests for /products
router.get('/', ProductsController.product_get_all);

//  Handler POST Requests for /products
router.post('/', ProductsController.product_create);

//  Handler GET Requests for /products/{id}
router.get('/:productId', ProductsController.product_get_by_id);

//  Handler PATCH Requests for /products/{id}
router.patch('/:productId', ProductsController.product_patch_by_id);

//  Handler DELETE Requests for /products/{id}
router.delete('/:productId', ProductsController.product_delete_by_id);


module.exports = router;
