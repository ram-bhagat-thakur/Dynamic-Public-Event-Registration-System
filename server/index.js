const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend build
app.use(express.static(path.join(__dirname, 'dist')));

// API Routes
app.use('/api/events', require('./routes/events'));
app.use('/api/register', require('./routes/register'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/registrations', require('./routes/registration'));
app.use('/api/feedback', require('./routes/feedbackRoutes'));
app.use('/uploads', express.static('uploads'));

// Health check
app.get('/health', (req, res) => res.status(200).send('OK'));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on ${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});