const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Reservation = require('./Reservation')

const userSchema = new Schema({
    userID: {
        type: Number,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contactnum:{
        type: Number,
        required: false
    },
    role:{
        type: String,
        enum: ['admin', 'student'], //implement later
        default: 'student',
        required: true
    },
    reservations: [{
        type: Schema.Types.ObjectId,
        ref: 'Reservation'
    }],
    profile_info:{
        profile_picture_url:{
            type: String,
        },
        bio:{
            type: String,
        },
    }

})

module.exports = mongoose.model('User', userSchema);