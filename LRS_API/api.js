require('dotenv').config
const port = process.env.PORT || 3000;
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get((req, res) => {
});

app.listen(port, () => {
});

// http://localhost:3000/

