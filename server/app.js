// For testing
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import registrationRoutes from './routes/registration.js';
import eventRoutes from './routes/events.js';
import registerRoutes from './routes/register.js';
import contactRoutes from './routes/contact.js';
import adminRoutes from './routes/admin.js';
import feedbackRoutes from './routes/feedbackRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/registrations', registrationRoutes); // ✅ main registration routes
app.use('/api/events', eventRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/feedback', feedbackRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('API is running...');
});

export default app; // ✅ for Vitest and Supertest