const express = require('express');
const router = express.Router();
const db = require('../../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//  Handlers Methods Requests for /users

//  Handler GET Requests for /users
router.get('/', (req, res, next) => {
  db.query("SELECT * FROM Users",function (error, results, fields) {
    if (error) {
      res.status(500).json({ error: true, message: 'Error in getting user list.' });
      return console.log(error.message);
    }
    res.status(200).json({
      message: 'Users List',
      data: results,
    });
  });  
});

//  Handler POST Requests for /users

router.post('/login', (req, res, next) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;    
    const user = {
        email : req.body.email,
        password : req.body.password
    }

    if (!user) {
        return res.status(400).json({ error : true, message: 'Please provide user' });
    } else if (!req.body.email || !req.body.password){
        return res.status(400).json({ error : true, message: 'Please provide missing username/password' });
    } else if (!re.test(user.email)) {
        return res.status(422).json({
            error : true,
            message: "El email debe de seguir el siguiente patron: correo@dominio.com"
        });
    }

    db.query("SELECT * FROM Users WHERE user_email = ?", [user.email], function (error, results, fields) {
        if (error) {
            if (!error.code === "ER_DUP_ENTRY"){
                res.status(500).json({ 
                    error: true, 
                    message: 'Error in insertion of new user.' 
                });
            } else {
                res.status(409).json({ 
                    error: true, 
                    message: 'Duplicated entry.   ' + error.message 
                });
            }
            return console.log(error.code);
        } else if (results.length < 1) {
            res.status(401).json({
                error : true,
                message : "User not found."
            });
        } else {
            bcrypt.compare(req.body.password, results[0].user_password, (err, resp) => {
                if (err){
                    return res.status(401).json({
                        message : "Failed Log-In."
                    });
                }

                if (resp){
                    const token = jwt.sign(
                    {
                        email : results[0].user_email,
                        id : results[0].user_id
                    }, 
                    process.env.JWT_WEB_TOKEN_KEY,
                    {
                        expiresIn : "1h"
                    }
                    )
                    return res.status(200).json({
                        message : "Successful Log In.",
                        token : token
                    })
                }
                res.status(401).json({
                    message : "Failed Log-In."
                });
            });
        }
    });
});

router.post('/signup', (req, res, next) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;    
    bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error) {
            return res.status(500).json({
                error : error
            })
        } else {
            const user = {
                id : req.body.id,
                email : req.body.email,
                password: hash
            }
            
            if (!user) {
                return res.status(400).json({ error : true, message: 'Please provide user' });
            } else if (!req.body.id || !req.body.email || !req.body.password){
                return res.status(400).json({ error : true, message: 'Please provide missing parameters' });
            } else if (!re.test(user.email)) {
                return res.status(422).json({
                    error : true,
                    message: "El email debe de seguir el siguiente patron: correo@dominio.com"
                });
            }
            db.query("INSERT INTO Users (user_id, user_email, user_password) VALUES (?, ?, ?)", [user.id, user.email, user.password], function (error, results, fields) {
                if (error) {
                    if (!error.code === "ER_DUP_ENTRY"){
                        res.status(500).json({ error: true, message: 'Error in insertion of new user.' });
                    } else {
                        res.status(409).json({ error: true, message: 'Duplicated entry.   ' + error.message });
                    }
                    return console.log(error.code);
                } else {
                    res.status(201).json({ error: false, data: user, message: 'New user has been created successfully.' });
                }
            });
        }
    });
});

//  Handler GET Requests for /users/{id}
router.get('/:userId', (req, res, next) => {
  const id = req.params.userId;
  if (!id) {
    res.status(400).json({
      error : true,
      message : "Missing id"
    });
  } else {
    db.query("SELECT * FROM Users WHERE user_id = ?", [id], function (error, results, fields) {
      if (error) {
        res.status(500).json({ error: true, message: 'Error in selection of user.' });
        return console.log(error.message);
      }
      if (!results.length) {
        res.status(404).json({
          message: 'No item with that id.',
        });
      } else {
        res.status(200).json({
          message: 'user',
          data: results,
        });
      }
    });
  }
});

//  Handler PATCH Requests for /users/{id}
router.patch('/:userId', (req, res, next) => {
  const u_id = req.params.userId;
  const user = {
    id : u_id,
    email : req.body.email,
    password: req.body.password
  };

  if (!u_id) {
    res.status(400).json({ error:true, message: 'Please provide id' });
  } else if (!req.body.email || !req.body.password){
    res.status(400).json({ error:true, message: 'Please provide missing parameters' });
  }

  db.query("UPDATE Users SET user_email = ?, user_password = ? WHERE user_id = ?", [user.email, user.password, u_id], function (error, results, fields) {
    if (error) {
      res.status(500).json({ error: true, message: 'Error in updating of user.' });
      return console.log(error.message);
    }
    if (results.affectedRows == 0){
      res.status(404).json({
        message: 'user not found'
      });
    } else {
      res.status(200).json({
        message: 'user Updated',
        data: user,
      });
    }
  });
});

//  Handler DELETE Requests for /users/{id}
router.delete('/:userId', (req, res, next) => {
  const id = req.params.userId;
  if (!id) {
    res.status(400).json({
      error : true,
      message : "Missing id"
    });
  } else {
    db.query("DELETE FROM Users WHERE user_id = ?", [id], function (error, results, fields) {
      if (error) throw error;
      if (results.affectedRows == 0){
        res.status(404).json({
          message: 'user not found'
        });
      } else {
        res.status(200).json({
          message: 'user Deleted',
          id : id,
        });
      }      
    });
  }
});


module.exports = router;
