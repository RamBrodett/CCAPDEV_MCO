/* 
 Author: Ram David Brodett
*/
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    reservationID:{
        type: Number,
        required: true
    },
    studentID:{
        type: Number,
        require: true,
    },
    labDetails:{
        labID: {
            type: String,
            required: true,
        },
        seatID: {
            type: String,
            required: true,
        }
    },
    date:{
        type: Date,
        required: true,
    },
    timeSlot:{
        day:{
            type: String,
            required: true,
        },
        timeStart:{
            type: String,
            required: true,
        },
        timeEnd:{
            type: String,
            required: true,
        }
    },
    anonymous:{
        type: Boolean,
        require: true,
        default: false
        //if true it is anonymous
    }
});

module.exports = mongoose.model('Reservation', reservationSchema);