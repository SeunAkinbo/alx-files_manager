// tests/redis.test.js

const redisClient = require('../utils/redis');

describe('RedisClient', () => {
  beforeAll(() => {
    // Set up before running the tests, if needed
  });

  afterAll(() => {
    // Clean up after tests
    redisClient.client.quit();
  });

  test('isAlive should return true if connected to Redis', () => {
    expect(redisClient.isAlive()).toBe(true);
  });

  test('set and get should store and retrieve a value', async () => {
    const key = 'test_key';
    const value = 'test_value';
    const duration = 10; // seconds

    await redisClient.set(key, value, duration);
    const result = await redisClient.get(key);

    expect(result).toBe(value);
  });

  test('del should remove a value', async () => {
    const key = 'test_key_to_delete';
    const value = 'test_value_to_delete';
    const duration = 10; // seconds

    await redisClient.set(key, value, duration);
    await redisClient.del(key);
    const result = await redisClient.get(key);

    expect(result).toBe(null);
  });
});

