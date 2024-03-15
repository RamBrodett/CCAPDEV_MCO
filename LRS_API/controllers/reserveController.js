const Reservation = require('../model/Reservation');

const reserveSeats = async (req, res) => {
    const {studentID, labID, seatID, date, timeStart, timeEnd } = req.body;
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
                labID: labID,
                seatID: seatID,
            },
            date: date,
            timeSlot: {
                timeStart: timeStart,
                timeEnd: timeEnd,
            }
        });
        res.status(201).json({ success: true, message: 'Reservation created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to create reservation' });
    }
}
module.exports = { reserveSeats };