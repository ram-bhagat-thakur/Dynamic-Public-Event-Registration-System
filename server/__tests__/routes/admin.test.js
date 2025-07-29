import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../app';
import Admin from '../../models/Admin';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Admin.deleteMany();
});

describe('Admin Routes', () => {
  const adminData = {
    name: 'Ram Bhagat',
    username: 'ramdev',
    email: 'ram@example.com',
    password: 'securepass123',
  };

  test('registers a new admin successfully', async () => {
    const res = await request(app).post('/api/admin/register').send(adminData);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Admin registered successfully');

    const adminInDb = await Admin.findOne({ username: 'ramdev' });
    expect(adminInDb).not.toBeNull();
    expect(adminInDb.email).toBe('ram@example.com');
  });

  test('fails to register with existing username/email', async () => {
    await request(app).post('/api/admin/register').send(adminData);

    const res = await request(app).post('/api/admin/register').send(adminData);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Username or email already exists');
  });

  test('logs in with correct credentials', async () => {
    await request(app).post('/api/admin/register').send(adminData);

    const res = await request(app).post('/api/admin/login').send({
      username: 'ramdev',
      password: 'securepass123',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.name).toBe('Ram Bhagat');
  });

  test('fails login with wrong password', async () => {
    await request(app).post('/api/admin/register').send(adminData);

    const res = await request(app).post('/api/admin/login').send({
      username: 'ramdev',
      password: 'wrongpass',
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid credentials');
  });

  test('fails login with non-existent username', async () => {
    const res = await request(app).post('/api/admin/login').send({
      username: 'unknown',
      password: 'anypass',
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid credentials');
  });
});