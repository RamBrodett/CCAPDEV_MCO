
const express = require('express');
const { handleNewUser } = require('../controllers/registerController');
const { handleUserDelete } = require('../controllers/userDeleteController');
const { handleAccountUpdate } = require('../controllers/userUpdateController');
const { emailValidatorMiddleWare } = require('../middleware/emailValidator');
const router = express.Router();

router.post('/register', emailValidatorMiddleWare,handleNewUser);
//router.post('/updateAccount', handleAccountUpdate.handleUserUpdate);
//router.post('/updateLoginCredentials', handleAccountUpdate.handleUserLoginUpdate)
router.post('/deleteAccount', handleUserDelete);

module.exports = router;