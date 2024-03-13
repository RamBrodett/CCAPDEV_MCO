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
        default: null
    },
    role:{
        type: String,
        enum: ['Admin', 'Student'], //implement later
        default: 'Student',
        required: true
    },
    reservations: [{
        type: Schema.Types.ObjectId,
        ref: 'Reservation'
    }],
    profile_info:{
        profile_picture_url:{
            type: String,
            default: 'default'
        },
        bio:{
            type: String,
            default: null
        },
    }

})

module.exports = mongoose.model('User', userSchema);