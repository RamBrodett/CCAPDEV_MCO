const express = require('express');
const { reserveSeats, updateReservation, deleteReservation, deleteAllReservation } = require('../controllers/reserveController');

const router = express.Router();

router.post('/', reserveSeats);
router.post('/updateReservation', updateReservation );
router.post('/deleteReservation', deleteReservation );
router.post('/deleteAllReservations', deleteAllReservation);

module.exports = router;