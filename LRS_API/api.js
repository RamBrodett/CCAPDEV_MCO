require('dotenv').config
const PORT = process.env.PORT || 3000;
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./dbConn');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const useRouter = require('./routes/registerRoute');
const cookieParser = require('cookie-parser');

connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

//routing for user management related
app.use('/userManagement', useRouter);


// function to make user we only listen when db connection is secured.
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    });
})



// http://localhost:3000/

