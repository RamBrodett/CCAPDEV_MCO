const express = require('express');
const { reserveSeats, updateReservation, deleteReservation } = require('../controllers/reserveController');

const router = express.Router();

router.post('/', reserveSeats);
router.post('/updateReservation', updateReservation );
router.post('/deleteReservation', deleteReservation );

module.exports = router;