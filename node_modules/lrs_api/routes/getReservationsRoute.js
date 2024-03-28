const express = require('express');
const { getReservations } = require('../controllers/getReservationsController');

const router = express.Router();

router.get('/', getReservations);

module.exports = router;