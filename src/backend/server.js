const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const proffileRoute = require('./routes/proffileRoute');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/proffileDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Use the achievement routes
app.use('/proffile', proffileRoute);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));