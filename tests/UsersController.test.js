// tests/UsersController.test.js

const request = require('supertest');
const express = require('express');
const routes = require('../routes/index');
const dbClient = require('../utils/db');

const app = express();
app.use(express.json());
app.use('/', routes);

describe('POST /users', () => {
  beforeAll(async () => {
    await dbClient.connect();
  });

  beforeEach(async () => {
    await dbClient.connect().collection('users').deleteMany({});
  });

  test('should return 400 if email is missing', async () => {
    const res = await request(app).post('/users').send({ password: '123456' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Missing email');
  });

  test('should return 400 if password is missing', async () => {
    const res = await request(app).post('/users').send({ email: 'test@example.com' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Missing password');
  });

  test('should return 400 if email already exists', async () => {
    await request(app).post('/users').send({ email: 'test@example.com', password: '123456' });
    const res = await request(app).post('/users').send({ email: 'test@example.com', password: '123456' });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Already exist');
  });

  test('should create a new user and return 201 with user data', async () => {
    const res = await request(app).post('/users').send({ email: 'test@example.com', password: '123456' });
    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe('test@example.com');
    expect(res.body).toHaveProperty('id');
  });

  afterAll(async () => {
    await dbClient.client.close();
  });
});
