// server.js
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// Load routes
app.use('/api', routes);

// Connect to MongoDB (replace with your connection string)
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('Could not connect to MongoDB:', err);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
