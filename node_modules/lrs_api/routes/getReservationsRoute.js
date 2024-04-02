const express = require('express');
const { getReservations, getAllReservations } = require('../controllers/getReservationsController');

const router = express.Router();

router.get('/', getReservations);
router.get('/all', getAllReservations)


module.exports = router;