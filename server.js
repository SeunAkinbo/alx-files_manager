// server.js

const express = require('express');
const routes = require('./routes/index');

// Create the Express app
const app = express();

// Load routes from the routes/index.js file
app.use('/', routes);

// Set the port to the environment variable PORT or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
