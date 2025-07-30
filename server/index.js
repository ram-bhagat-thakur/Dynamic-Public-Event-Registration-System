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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect Route to Server
const eventRoutes = require('./routes/events');
app.use('/api/events', eventRoutes);

const registerRoutes = require('./routes/register');
app.use('/api/register', registerRoutes);

const contactRoutes = require('./routes/contact');
app.use('/api/contact', contactRoutes);

const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

// app.use('/uploads', express.static('uploads'));

app.use('/api/registrations', require('./routes/registration'));

const feedbackRoutes = require('./routes/feedbackRoutes');
app.use('/api/feedback', feedbackRoutes);


// Routes placeholder
app.get('/', (req, res) => {
  res.send('API is running...');
});


// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Connect to MongoDB

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});
