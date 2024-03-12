const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    reservationID:{
        type: Number,
        required: true,
    },
    labID:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        required: true,
    },
    timeSlot:{
        timeStart:{
            type: String,
            required: true,
        },
        timeEnd:{
            type: String,
            required: true,
        }
    }
});

module.exports = mongoose.model('Reservation', reservationSchema);