// Dependencies

const express = require('express');
const router = express.Router();

// Authorization module
const checkAuth = require('../../middleware/check-auth');

// Controller
const UsersController = require('../controller/users');

//  Handlers Methods Requests for /users

//  Handler GET Requests for /users
router.get('/', UsersController.user_get_all);

//  Handler POST Requests for /users

router.post('/login', UsersController.user_login);

router.post('/signup', UsersController.user_signup);

//  Handler GET Requests for /users/{id}
router.get('/:userId', UsersController.user_get_by_id);

//  Handler PATCH Requests for /users/{id}
router.patch('/:userId', checkAuth, UsersController.user_patch_by_id);

//  Handler DELETE Requests for /users/{id}
router.delete('/:userId', checkAuth, UsersController.user_delete_by_id);


module.exports = router;
