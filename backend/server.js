const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Define your routes here

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// Extension routing
app.post('/scan-url', (req, res) => {
    const url = req.body.url;
    console.log('Received URL:', url);
  
    // Perform scanning logic here
    // You can use the existing scanner module or create a new one
  });
  