const express = require('express');
const {userProfile,userProfile2} = require('../controllers/userProfileController')
const router = express.Router();

router.get('/', userProfile);
router.get('/settings', userProfile2 );

module.exports = router;