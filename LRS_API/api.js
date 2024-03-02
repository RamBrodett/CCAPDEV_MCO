require('dotenv').config
const PORT = process.env.PORT || 3000;
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./dbConn');
const cors = require('cors');
const { handleNewUser } = require('./controllers/registerController');
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

//testing will fix routing later
app.post('/api/register', handleNewUser);

// function to make user we only listen when db connection is secured.
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    });
})



// http://localhost:3000/

