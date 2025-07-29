import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../../app';
import Contact from '../../models/Contact';
import jwt from 'jsonwebtoken';

let mongoServer;
let token;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);

  // ✅ Create a dummy admin token for protected routes
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
  await Contact.deleteMany();
});

describe('Contact Routes', () => {
  const contactData = {
    name: 'Ram Bhagat',
    email: 'ram@example.com',
    mobile: '9876543210',
    message: 'I love your platform!',
  };

  test('submits a contact form (public)', async () => {
    const res = await request(app).post('/api/contact').send(contactData);

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Ram Bhagat');
    expect(res.body.read).toBe(false);
  });

  test('fetches all messages (admin only)', async () => {
    await Contact.create(contactData);

    const res = await request(app)
      .get('/api/contact')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].email).toBe('ram@example.com');
  });

  test('marks a message as read (admin only)', async () => {
    const msg = await Contact.create(contactData);

    const res = await request(app)
      .patch(`/api/contact/${msg._id}/read`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.read).toBe(true);
  });

  test('deletes a message (admin only)', async () => {
    const msg = await Contact.create(contactData);

    const res = await request(app)
      .delete(`/api/contact/${msg._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Message deleted');

    const check = await Contact.findById(msg._id);
    expect(check).toBeNull();
  });

  test('fails to access protected route without token', async () => {
    const res = await request(app).get('/api/contact');
    expect(res.statusCode).toBe(401); // Or 403 depending on your middleware
  });
});