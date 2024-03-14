const Reservation = require('../model/Reservation');
// i made it as a function, fix it to const object later, i just used it 
// kase as direct addition to the db so manually inputted data, make it also dynamic variables
async function reserveSeat() {
    try{

        await Reservation.create({
            reservationID: 8,
            studentID:4,
            labDetails:{
                labID:'VL206',
                seatID: 'B01'
            },
            date: new Date('2024-03-22'),
            timeSlot:{
                timeStart: 'Fri-14:00',
                timeEnd: 'Fri-14:30',
            }
        })
    }catch(error){
        console.log(error)
    }
}
module.exports = reserveSeat;