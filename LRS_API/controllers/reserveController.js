const Reservation = require('../model/Reservation');

const reserveSeats = async (req, res) => {
    const {studentID, labDetails, date, timeSlot } = req.body;
    try {
        // Iterate over seatIDs array and create reservations for each seat
        const lastID = await Reservation.findOne({}, {}, { sort: { 'reservationID': -1 } }).exec();
        let newReservationID = 1;

        if (lastID) {
            newReservationID = lastID.reservationID + 1;
        }
        await Reservation.create({

            reservationID: newReservationID,
            studentID: 0,
            labDetails: {
                labID: labDetails.labID,
                seatID: labDetails.seatID,
            },
            date: date,
            timeSlot: {
                timeStart: timeSlot.timeStart,
                timeEnd: timeSlot.timeEnd,
            }
        });
        res.status(201).json({ success: true, message: 'Reservation created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to create reservation' });
    }
}
module.exports = { reserveSeats };