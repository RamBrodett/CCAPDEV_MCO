const express = require('express');
const {userSearch} = require('../controllers/userSearchController')
const router = express.Router();

router.get('/', userSearch);

module.exports = router;