/* 
 Author: Ram David Brodett, Chantal Sia, John Paul Carney
*/
require('dotenv').config();
const PORT = process.env.PORT;
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./dbConn');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const reserveRoute = require('./routes/reserveRoute');
const getReservationsRoute = require('./routes/getReservationsRoute');
const registerRoute = require('./routes/registerRoute');
const loginRoute = require('./routes/authRoute');
const userSearchRoute = require('./routes/userSearchRoute');
const userProfileRoute = require('./routes/userProfileRoute');
const profileDisplayRoute = require('./routes/profileDisplayRoute');
const userReservationRoute = require('./routes/userReservationRoute');


connectDB();

app.use(cors({
    origin: true, 
    credentials: true,
  }));
app.use(express.json());
app.use(cookieParser());

app.use('/reserve', reserveRoute);
app.use('/getReservations', getReservationsRoute);

//routing for user management related
app.use('/userManagement', registerRoute);
app.use('/auth', loginRoute);
app.use('/search', userSearchRoute);
app.use('/getProfile', userProfileRoute);
app.use('/profileIMG', profileDisplayRoute);
app.use('/getUserReservations',userReservationRoute);

// function to make user we only listen when db connection is secured.
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    });
})



// http://localhost:3000/

