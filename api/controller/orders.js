// Database connection
const db = require('../../db');

exports.order_get_all = (req, res, next) => {
    db.query("SELECT * FROM Orders",function (error, results, fields) {
      if (error) {
        res.status(500).json({ 
          error: true, 
          message: 'Error in getting the order list.' 
        });
        return console.log(error.message);
      }
      res.status(200).json({
        message: 'Order List',
        data: results,
      });
    });
}

exports.order_get_one_by_id = (req, res, next) => {
    const id = req.params.orderId;
    if (!id) {
      res.status(400).json({
        error : true,
        message : "Missing id"
      });
    } else {
      db.query("SELECT * FROM Orders WHERE order_id = ?", [id], function (error, results, fields) {
        if (error) {
          res.status(500).json({ error: true, message: 'Error in selection of product.' });
          return console.log(error.message);
        }
        if (!results.length) {
          res.status(404).json({
            error : true,
            message: 'No order with that id.',
          });
        } else {
          res.status(200).json({
            error : false,
            message: 'Order',
            data: results,
          });
        }
      });
    }
}

exports.order_create = (req, res, next) => {
    const order = {
        order_id : req.body.order_id,
        product_id : req.body.product_id,
        quantity: req.body.product_quantity
    };

    if (!order) {
        return res.status(400).json({ error : true, message: "Please give order." });
    } else if (!req.body.order_id || !req.body.product_id || !req.body.product_quantity){
        return res.status(400).json({ 
        error : true,
        message: 'Please provide missing parameters' 
        });
    }

    db.query("INSERT INTO Orders (order_id, product_id, product_quantity) VALUES (?, ?, ?)", [order.order_id, order.product_id, order.quantity], function (error, results, fields) {
        if (error) {
        res.status(500).json({ 
            error: true, 
            message: 'Error in insertion of new order.'
            });
        return console.log(error.message);
        }
        res.status(201).json({ 
        error: false, 
        data: order, 
        message: 'New product has been created successfully.' 
        });
    });
}

exports.order_delete_by_id = (req, res, next) => {
    const id = req.params.orderId;
    if (!id) {
        res.status(400).json({
        error : true,
        message : "Missing id"
        });
    } else {
        db.query("DELETE FROM Orders WHERE order_id = ?", [id], function (error, results, fields) {
        if (error) {
            res.status(500).json({ 
            error: true, 
            message: 'Error in deletion of order.' 
            });
            return console.log(error.message);
        }
        if (results.affectedRows == 0){
            res.status(404).json({
            error: true,
            message: 'Orders not found'
            });
        } else {
            res.status(200).json({
            error : false,
            message: 'Order Deleted',
            id : id,
            });
        }      
        });
    }
}