
const express = require('express');
const { emailValidatorMiddleWare } = require('../middleware/emailValidator');
const {handleUserLogin} = require('../controllers/authController');
const jwtAuth = require('../middleware/jwtAuth');
const User = require('../model/User');
const { getUserName } = require('../middleware/getUserInfo');
const router = express.Router();


router.post('/', emailValidatorMiddleWare, handleUserLogin);
router.get('/check', jwtAuth.authenticateJWT, getUserName);


module.exports = router;


