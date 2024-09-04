// controllers/AppController.js
const mongoose = require('mongoose');

// Import your models (assuming you have User and File models)
const User = mongoose.model('User', new mongoose.Schema({})); // Define your User schema
const File = mongoose.model('File', new mongoose.Schema({})); // Define your File schema

// Controller to check the status of Redis and DB
exports.getStatus = async (req, res) => {
    try {
        // Here you would check Redis status; for now, we'll assume it's alive
        const redisAlive = true; // Replace with actual Redis check

        // Check if MongoDB is alive
        const dbAlive = mongoose.connection.readyState === 1; // 1 means connected

        res.status(200).json({ redis: redisAlive, db: dbAlive });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller to get stats
exports.getStats = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const fileCount = await File.countDocuments();

        res.status(200).json({ users: userCount, files: fileCount });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
