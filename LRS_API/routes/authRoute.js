
const express = require('express');
const { emailValidatorMiddleWare } = require('../middleware/emailValidator');
const {handleUserLogin} = require('../controllers/authController');

//, handleUserLogout
const jwtAuth = require('../middleware/jwtAuth');
const { getUserName } = require('../middleware/getUserInfo');
const router = express.Router();


router.post('/login', emailValidatorMiddleWare, handleUserLogin);
//router.post('/logout',jwtAuth.authenticateJWT, handleUserLogout);
router.get('/check', jwtAuth.authenticateJWT, getUserName);

module.exports = router;


