require('dotenv');
const mongoose = require('mongoose');
const uri = "mongodb+srv://admin:APDEV12345@lrscluster0.ob9xhvt.mongodb.net/LRS_DB?retryWrites=true&w=majority&appName=LRSCluster0"

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