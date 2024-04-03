/* 
 Author: Ram David Brodett
*/
require('dotenv');
const mongoose = require('mongoose');
const uri = process.env.URI;

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch(error){
        console.error(error);

    }
}

module.exports = connectDB;