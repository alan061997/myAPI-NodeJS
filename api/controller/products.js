// Database connection
const db = require('../../db');

exports.product_get_all = (req, res, next) => {
    db.query("SELECT * FROM Products",function (error, results, fields) {
        if (error) {
        res.status(500).json({ 
            error: true, 
            message: 'Error in getting product list.' 
        });
        return console.log(error.message);
        }
        res.status(200).json({
        message: 'Products List',
        data: results,
        });
    });  
}


exports.product_get_by_id = (req, res, next) => {
    const id = req.params.productId;
    if (!id) {
        res.status(400).json({
        error : true,
        message : "Missing id"
        });
    } else {
        db.query("SELECT * FROM Products WHERE product_id = ?", [id], function (error, results, fields) {
        if (error) {
            res.status(500).json({ error: true, message: 'Error in selection of product.' });
            return console.log(error.message);
        }
        if (!results.length) {
            res.status(404).json({
            message: 'No item with that id.',
            });
        } else {
            res.status(200).json({
            message: 'Product',
            data: results,
            });
        }
        });
    }
}


exports.product_create = (req, res, next) => {
    const product = {
      id : req.body.id,
      name : req.body.name,
      price: req.body.price
    };
  
    if (!product ) {
      return res.status(400).json({ error : true, message: 'Please provide product' });
    } else if (!req.body.id || !req.body.name || !req.body.price){
      return res.status(400).json({ error : true, message: 'Please provide missing parameters' });
    }
  
    db.query("INSERT INTO Products (product_id, product_name, product_price) VALUES (?, ?, ?)", [product.id, product.name, product.price], function (error, results, fields) {
      if (error) {
        res.status(500).json({ error: true, message: 'Error in insertion of new product.' });
        return console.log(error.message);
      }
      res.status(201).json({ error: false, data: product, message: 'New product has been created successfully.' });
    });
}

exports.product_patch_by_id = (req, res, next) => {
    const p_id = req.params.productId;
    const product = {
      id : p_id,
      name : req.body.name,
      price: req.body.price
    };
  
    if (!p_id) {
      res.status(400).json({ error:true, message: 'Please provide id' });
    } else if (!req.body.name || !req.body.price){
      res.status(400).json({ error:true, message: 'Please provide missing parameters' });
    }
  
    db.query("UPDATE Products SET product_name = ?, product_price = ? WHERE product_id = ?", [product.name, product.price, p_id], function (error, results, fields) {
      if (error) {
        res.status(500).json({ error: true, message: 'Error in updating of product.' });
        return console.log(error.message);
      }
      if (results.affectedRows == 0){
        res.status(404).json({
          message: 'Product not found'
        });
      } else {
        res.status(200).json({
          message: 'Product Updated',
          data: product,
        });
      }
    });
}
exports.product_delete_by_id = (req, res, next) => {
    const id = req.params.productId;
    if (!id) {
      res.status(400).json({
        error : true,
        message : "Missing id"
      });
    } else {
      db.query("DELETE FROM Products WHERE product_id = ?", [id], function (error, results, fields) {
        if (error) throw error;
        if (results.affectedRows == 0){
          res.status(404).json({
            message: 'Product not found'
          });
        } else {
          res.status(200).json({
            message: 'Product Deleted',
            id : id,
          });
        }      
      });
    }
}