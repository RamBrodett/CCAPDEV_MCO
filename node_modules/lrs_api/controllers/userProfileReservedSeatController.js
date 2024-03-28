/* 
 Author: Ram David Brodett
*/

const Reservation = require('../model/Reservation');

const getReservedSeats = async(req,res) =>{
    const {userId} = req.query; 

    try{
        const userIdNumber = parseInt(userId);
        const matchingReservations = await Reservation.find({ studentID: userIdNumber });
        res.json(matchingReservations);
    }catch(error){
        console.error('Error searching reservations: ', error);
        res.status(500).json({message: 'Internal server error'});
    }

}

module.exports = {getReservedSeats}

