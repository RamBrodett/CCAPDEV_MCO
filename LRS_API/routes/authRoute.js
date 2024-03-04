
const express = require('express');
const { emailValidatorMiddleWare } = require('../middleware/emailValidator');
const {handleUserLogin} = require('../controllers/authController');
const jwtAuth = require('../middleware/jwtAuth');
const router = express.Router();

router.post('/', emailValidatorMiddleWare, handleUserLogin);
router.get('/check', jwtAuth.authenticateJWT, (req, res)=>{
    res.status(200)
});


module.exports = router;


