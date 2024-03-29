
const express = require('express');
const { emailValidatorMiddleWare } = require('../middleware/emailValidator');
const {handleUserLogin, handleUserLogout, hanldeUserPasswordCheck} = require('../controllers/authController');

//, handleUserLogout
const jwtAuth = require('../middleware/jwtAuth');
const { getUser } = require('../middleware/getUserInfo');
const router = express.Router();


router.post('/login', emailValidatorMiddleWare, handleUserLogin);
router.post('/logout',jwtAuth.authenticateJWT, handleUserLogout);
router.get('/check', jwtAuth.authenticateJWT, getUser);
router.post('/checkPassword', hanldeUserPasswordCheck );

module.exports = router;


