/* 
 Author: Ram David Brodett
*/
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
        default: null
    },
    role:{
        type: String,
        enum: ['Admin', 'Student'], //implement later
        default: 'Student',
        required: true
    },
    profile_info:{
        profile_picture_url:{
            type: String,
            default: 'https://lrs-img-db.s3.ap-southeast-1.amazonaws.com/default.png'
        },
        bio:{
            type: String,
            default: null
        },
    }

})
userSchema.index({ userID: 1 });

module.exports = mongoose.model('User', userSchema);