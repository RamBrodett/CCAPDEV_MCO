const express = require('express');
const {getReservedSeats} = require('../controllers/userProfileReservedSeatController');
const router = express.Router();

router.get('/', getReservedSeats);

module.exports = router;