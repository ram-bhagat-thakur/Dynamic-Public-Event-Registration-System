import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

import registerRoute from './routes/register.js';
import eventRoute from './routes/events.js';
import adminRoutes from './routes/admin.js';
import contactRoutes from './routes/contact.js';
import registrationsRoutes from './routes/registrations.js';
import transporter from './utils/mailer.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static frontend
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Routes
app.use('/api/events', eventRoute);
app.use('/api/register', registerRoute);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/registrations', registrationsRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test Route
app.get('/', (req, res) => {
  res.send('✅ Server is running');
});

// Nodemailer test
app.get('/test-email', async (req, res) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: 'yourtestemail@gmail.com',
      subject: 'Test Email',
      text: 'This is a test email from Nodemailer'
    });
    res.send('✅ Email sent');
  } catch (err) {
    console.error("❌ Email error:", err.message);
    res.status(500).send('Email failed');
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ MongoDB connected");
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));