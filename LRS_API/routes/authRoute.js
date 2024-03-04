
const express = require('express');
const { emailValidatorMiddleWare } = require('../middleware/emailValidator');
const {handleUserLogin} = require('../controllers/authController');
const {authJWTMiddleWare} = require('../middleware/jwtAuth')
const router = express.Router();

router.post('/login',emailValidatorMiddleWare,handleUserLogin);
router.post('')

module.exports = router;


