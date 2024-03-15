const Reservation = require('../model/Reservation');

const getReservations = async (req, res) => {
    const { labID, day, timeStart } = req.query;
    try {
        const matchingReservations = await Reservation.find({'labDetails.labID': labID, 'timeSlot.day': day, 'timeSlot.timeStart': timeStart});
        res.json(matchingReservations);
    } catch (error) {
        console.error('Error searching reservations: ', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { getReservations }
