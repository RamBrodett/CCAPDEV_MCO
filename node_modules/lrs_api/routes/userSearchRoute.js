const express = require('express');
const {userSearch, userGetByID} = require('../controllers/userSearchController')
const router = express.Router();

router.get('/', userSearch);
router.get('/findOne', userGetByID);

module.exports = router;