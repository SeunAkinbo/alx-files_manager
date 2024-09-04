// controllers/UsersController.js

const sha1 = require('sha1');
const { ObjectId } = require('mongodb');
const dbClient = require('../utils/db');

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }

    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }

    const existingUser = await dbClient.connect().collection('users').findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Already exist' });
    }

    const hashedPassword = sha1(password);
    const newUser = {
      email,
      password: hashedPassword,
    };

    const result = await dbClient.connect().collection('users').insertOne(newUser);

    return res.status(201).json({
      id: result.insertedId,
      email,
    });
  }
}

module.exports = UsersController;
