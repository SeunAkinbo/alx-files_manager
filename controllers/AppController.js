// controllers/AppController.js

const redisClient = require("../utils/redis");
const dbClient = require("../utils/db");

class AppController {
  // GET /status endpoint
  static async getStatus(req, res) {
    const status = {
      redis: redisClient.isAlive(),
      db: await dbClient.isAlive(),
    };
    res.status(200).json(status);
  }

  // GET /stats endpoint
  static async getStats(req, res) {
    const stats = {
      users: await dbClient.nbUsers(),
      files: await dbClient.nbFiles(),
    };
    res.status(200).json(stats);
  }
}

module.exports = AppController;
