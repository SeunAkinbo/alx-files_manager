// utils/db.js

const { MongoClient } = require("mongodb");

class DBClient {
  constructor() {
    // Set up connection details using environment variables or defaults
    const host = process.env.DB_HOST || "localhost";
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || "files_manager";
    const uri = `mongodb://${host}:${port}`;

    // Create a MongoDB client
    this.client = new MongoClient(uri, { useUnifiedTopology: true });
    this.db = null;

    // Connect to the database
    this.client
      .connect()
      .then(() => {
        this.db = this.client.db(database);
        console.log("Connected successfully to MongoDB");
      })
      .catch((err) => {
        console.error("Could not connect to MongoDB:", err);
      });
  }

  // Method to check if the database connection is alive
  isAlive() {
    return this.client.isConnected();
  }

  // Asynchronous method to get the number of documents in the 'users' collection
  async nbUsers() {
    const usersCollection = this.db.collection("users");
    return usersCollection.countDocuments();
  }

  // Asynchronous method to get the number of documents in the 'files' collection
  async nbFiles() {
    const filesCollection = this.db.collection("files");
    return filesCollection.countDocuments();
  }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();
module.exports = dbClient;
