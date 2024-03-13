const express = require('express');
const {userProfile} = require('../controllers/userProfileController')
const router = express.Router();

router.get('/', userProfile);

module.exports = router;