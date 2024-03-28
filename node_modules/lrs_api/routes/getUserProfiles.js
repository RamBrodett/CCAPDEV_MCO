const express = require('express');
const { getUserProfiles } = require('../controllers/getUserProfiles');

const router = express.Router();

router.get('/', getUserProfiles);

module.exports = router;