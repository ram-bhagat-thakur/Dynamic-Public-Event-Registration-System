import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../app';
import Feedback from '../../models/Feedback';
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
  await Feedback.deleteMany();
});

describe('Feedback Routes', () => {
  const feedbackData = {
    name: 'Ram Bhagat',
    rating: 5,
    comment: 'Amazing experience!',
  };

  test('submits feedback (public)', async () => {
    const res = await request(app).post('/api/feedback').send(feedbackData);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Feedback submitted successfully');

    const inDb = await Feedback.findOne({ name: 'Ram Bhagat' });
    expect(inDb).not.toBeNull();
    expect(inDb.verified).toBe(false);
  });

  test('fetches verified feedback only', async () => {
    await Feedback.create({ ...feedbackData, verified: true });
    await Feedback.create({ ...feedbackData, name: 'Unverified', verified: false });

    const res = await request(app).get('/api/feedback/verified');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Ram Bhagat');
  });

  test('fetches all feedback (admin)', async () => {
    await Feedback.create(feedbackData);

    const res = await request(app)
      .get('/api/feedback/admin')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].comment).toBe('Amazing experience!');
  });

  test('verifies feedback (admin)', async () => {
    const fb = await Feedback.create(feedbackData);

    const res = await request(app)
      .patch(`/api/feedback/verify/${fb._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Feedback verified');

    const updated = await Feedback.findById(fb._id);
    expect(updated.verified).toBe(true);
  });

  test('deletes feedback (admin)', async () => {
    const fb = await Feedback.create(feedbackData);

    const res = await request(app)
      .delete(`/api/feedback/${fb._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Feedback deleted');

    const check = await Feedback.findById(fb._id);
    expect(check).toBeNull();
  });
});