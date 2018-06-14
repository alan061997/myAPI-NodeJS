const express = require('express');
const router = express.Router();
const db = require('../../db');
const checkAuth = require('../../middleware/check-auth');
const ProductsController = require('../controller/products');

//  Handlers Methods Requests for /products

//  Handler GET Requests for /products
router.get('/', checkAuth, ProductsController.product_get_all);

//  Handler POST Requests for /products
router.post('/', checkAuth, ProductsController.product_create);

//  Handler GET Requests for /products/{id}
router.get('/:productId', checkAuth, ProductsController.product_get_by_id);

//  Handler PATCH Requests for /products/{id}
router.patch('/:productId', checkAuth, ProductsController.product_patch_by_id);

//  Handler DELETE Requests for /products/{id}
router.delete('/:productId', checkAuth, ProductsController.product_delete_by_id);


module.exports = router;
