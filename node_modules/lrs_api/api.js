require('dotenv').config();
const PORT = process.env.PORT;
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./dbConn');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const registerRoute = require('./routes/registerRoute');
const loginRoute = require('./routes/authRoute');
const userSearchRoute = require('./routes/userSearchRoute')
const userProfileRoute = require('./routes/userProfileRoute')

connectDB();

app.use(cors({
    origin: true, 
    credentials: true,
  }));
app.use(express.json());
app.use(cookieParser());

//routing for user management related
app.use('/userManagement', registerRoute);
app.use('/auth', loginRoute);
app.use('/search', userSearchRoute)
app.use('/getProfile', userProfileRoute)

// function to make user we only listen when db connection is secured.
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    });
})



// http://localhost:3000/

