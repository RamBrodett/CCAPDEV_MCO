const Reservation = require('../model/Reservation');

const reserveSeats = async (req, res) => {
    const { studentID, labDetails, date, timeSlot, anonymous } = req.body;
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
            },
            anonymous: anonymous
        });

        res.status(201).json({ success: true, message: 'Reservation created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to create reservation' });
    }
}

const updateReservation = async (req, res) => {
    const { reservationID, studentID, labDetails, date, timeSlot } = req.body;
    try {
        const updatedReservation = await Reservation.findOneAndUpdate(
            { reservationID: reservationID }, // Match the reservationID
            {
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
            },
            { new: true } // To return the updated record
        );
        
        if (!updatedReservation) {
            return res.status(404).json({ success: false, message: 'Reservation not found' });
        }

        res.status(200).json({ success: true, message: 'Reservation updated successfully', updatedReservation });
        console.log("updated");
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to update reservation' });
    }
}

const deleteReservation = async (req, res) => {
    const { reservationID } = req.body;
    try {
        const deletedReservation = await Reservation.findOneAndDelete(
            { reservationID: reservationID } // Match the reservationID
        );
        
        if (!deletedReservation) {
            return res.status(404).json({ success: false, message: 'Reservation not found' });
        }

        res.status(200).json({ success: true, message: 'Reservation deleted successfully', deletedReservation });
        console.log("deleted");
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to delete reservation' });
    }
}

const deleteAllReservation = async (req, res) => {
    const {userID} = req.body;
    console.log(userID);
    try{
        const deletedReservations = await Reservation.deleteMany({studentID: userID});
        if (deletedReservations.deletedCount > 0) {
            console.log(deletedReservations.deletedCount)
            res.status(200).json({ success: true, message: 'Reservations deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'No reservations found for the user' });
        }

    }catch(error){
        res.status(500).json({ success: false, message: 'Failed to delete reservations' });
    }

}


module.exports = { reserveSeats, updateReservation, deleteReservation, deleteAllReservation };
