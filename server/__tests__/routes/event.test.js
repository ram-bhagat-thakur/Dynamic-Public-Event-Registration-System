import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../app';
import Event from '../../models/Event';
import jwt from 'jsonwebtoken';

let mongoServer;
let token;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // ✅ Dummy admin token
  token = jwt.sign(
    { id: 'dummyid', name: 'Admin', username: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Event.deleteMany();
});

describe('Event Routes', () => {
  const eventData = {
    title: 'Tech Summit',
    date: '2025-08-01',
    time: '10:00 AM',
    totalSeats: 100,
    leftSeats: 100,
    location: 'Patna',
    description: 'A tech conference',
    organizer: 'Ram Bhagat',
  };

  test('creates a new event (admin only)', async () => {
    const res = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${token}`)
      .field('title', eventData.title)
      .field('date', eventData.date)
      .field('time', eventData.time)
      .field('totalSeats', eventData.totalSeats)
      .field('leftSeats', eventData.leftSeats)
      .field('location', eventData.location)
      .field('description', eventData.description)
      .field('organizer', eventData.organizer);

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Tech Summit');
    expect(res.body.leftSeats).toBe(100);
  });

  test('fetches all events (public)', async () => {
    await Event.create(eventData);

    const res = await request(app).get('/api/events');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].title).toBe('Tech Summit');
  });

  test('fetches single event by ID', async () => {
    const event = await Event.create(eventData);

    const res = await request(app).get(`/api/events/${event._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Tech Summit');
  });

  test('updates an event (admin only)', async () => {
    const event = await Event.create(eventData);

    const res = await request(app)
      .put(`/api/events/${event._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Summit', totalSeats: 120 });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Summit');
    expect(res.body.leftSeats).toBe(120); // ✅ Recalculated
  });

  test('deletes an event (admin only)', async () => {
    const event = await Event.create(eventData);

    const res = await request(app)
      .delete(`/api/events/${event._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Event deleted successfully');

    const check = await Event.findById(event._id);
    expect(check).toBeNull();
  });

  test('returns 404 for non-existent event', async () => {
    const fakeId = new mongoose.Types.ObjectId();

    const res = await request(app).get(`/api/events/${fakeId}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toBe('Event not found');
  });
});