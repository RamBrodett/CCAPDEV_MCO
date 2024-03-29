
const express = require('express');
const { handleNewUser } = require('../controllers/registerController');
const { handleUserDelete } = require('../controllers/userDeleteController');
const { handleUserUpdate, handleUserLoginUpdate } = require('../controllers/userUpdateController');
const { emailValidatorMiddleWare } = require('../middleware/emailValidator');
const router = express.Router();

router.post('/register', emailValidatorMiddleWare,handleNewUser);
router.post('/updateAccount', handleUserUpdate);
router.post('/updateLoginCredentials', handleUserLoginUpdate);
router.post('/deleteAccount', handleUserDelete);

module.exports = router;