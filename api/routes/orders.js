// Dependencies

const express = require('express');
const router = express.Router();

// Middleware
const checkAuth = require('../../middleware/check-auth');

// Controller
const OrdersController = require('../controller/orders');

//  Handlers Method Requests for /orders

//  Handler GET Requests for /orders
router.get('/', OrdersController.order_get_all);

//  Handler POST Requests for /orders
router.post('/', OrdersController.order_create);

//  Handler GET Requests for /orders/details
router.get('/:orderId', OrdersController.order_get_one_by_id);

//  Handler DELETE Requests for /orders/details
router.delete('/:orderId', OrdersController.order_delete_by_id); 


module.exports = router;
