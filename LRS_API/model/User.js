const mongoose = require('mongoose')
const Schema = mongoose.Schema;

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
        enum: ['admin', 'student'],
        required: false //implement later
    }
})

module.exports = mongoose.model('User', userSchema);