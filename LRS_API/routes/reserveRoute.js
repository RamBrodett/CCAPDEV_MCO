const express = require('express');
const { reserveSeats } = require('../controllers/reserveController');

const router = express.Router();

router.post('/', reserveSeats);

module.exports = router;