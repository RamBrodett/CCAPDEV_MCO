const Reservation = require('../model/Reservation');

const reserveSeats = async (req, res) => {
    const { studentID, labDetails, date, timeSlot } = req.body;
    try {
        const lastReservation = await Reservation.findOne({}, {}, { sort: { 'reservationID': -1 } }).exec();
        let newReservationID = 1;

        if (lastReservation) {
            newReservationID = lastReservation.reservationID + 1;
        }

        // Create the reservation document with the unique reservationID
        await Reservation.create({
            reservationID: newReservationID,
            studentID: studentID,
            labDetails: {
                labID: labDetails.labID,
                seatID: labDetails.seatID,
            },
            date: date,
            timeSlot: {
                day: timeSlot.day,
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
