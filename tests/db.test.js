// tests/db.test.js

const dbClient = require('../utils/db');

describe('DBClient', () => {
  beforeAll(async () => {
    await dbClient.connect();
    expect(dbClient.isAlive()).toBe(true);
  });

  test('should return the number of users', async () => {
    const nbUsers = await dbClient.nbUsers();
    expect(typeof nbUsers).toBe('number');
  });

  test('should return the number of files', async () => {
    const nbFiles = await dbClient.nbFiles();
    expect(typeof nbFiles).toBe('number');
  });

  afterAll(async () => {
    await dbClient.client.close();
  });
});

