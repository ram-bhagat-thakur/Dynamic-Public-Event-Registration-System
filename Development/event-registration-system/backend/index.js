const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// API Routes
app.use('/api/register', require('./routes/register'));
app.use('/api/events', require('./routes/events'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/registrations', require('./routes/registrations'));
app.use('/uploads', express.static('uploads'));

// Optional: Log route status (debugging)
console.log("✅ All API routes mounted");

// Test route
app.get('/test-email', async (req, res) => {
  const transporter = require('./utils/mailer');
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: 'yourtestemail@gmail.com',
      subject: 'Test Email',
      text: 'This is a test email from Nodemailer'
    });
    res.send("✅ Email sent");
  } catch (err) {
    console.error("❌ Test email error:", err.message);
    res.status(500).send("Email failed");
  }
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ MongoDB connected");
}).catch((err) => {
  console.error("❌ MongoDB error:", err.message);
});

// 🧱 Serve frontend build (Vite SPA)
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});