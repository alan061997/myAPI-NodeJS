// Dependencies

const express = require('express');
const router = express.Router();

// Database connection
const db = require('../../db');

// Middleware
const checkAuth = require('../../middleware/check-auth');

// Controller
const OrdersController = require('../controller/orders');

//  Handlers Method Requests for /orders

//  Handler GET Requests for /orders
router.get('/', checkAuth, OrdersController.order_get_all);

//  Handler POST Requests for /orders
router.post('/', checkAuth, OrdersController.order_create);

//  Handler GET Requests for /orders/details
router.get('/:orderId', checkAuth, OrdersController.order_get_one_by_id);

//  Handler DELETE Requests for /orders/details
router.delete('/:orderId', checkAuth, OrdersController.order_delete_by_id); 


module.exports = router;
