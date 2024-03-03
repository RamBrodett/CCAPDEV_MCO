
const { handleNewUser } = require('./controllers/registerController');
const { handleUserDelete } = require('./controllers/userDeleteController');
const { handleAccountUpdate } = require('./controllers/userUpdateController');
const express = require('express');
const router = express.Router();

router.post('/register', handleNewUser);
router.post('/updateAccount', handleAccountUpdate.handleUserUpdate);
router.post('/updateLoginCredentials', handleAccountUpdate.handleUserLoginUpdate)
router.post('/deleteAccount', handleUserDelete);

module.exports = router;