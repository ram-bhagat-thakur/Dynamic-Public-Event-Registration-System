const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const  dotenv= require("dotenv")
const registerRoute = require('./routes/register');
const eventRoute = require('./routes/events.js');
const transporter = require('./utils/mailer'); // adjust path if needed


require('dotenv').config(); // ✅ Load environment variables
dotenv.config();
const app = express();
//✅ These must come BEFORE any route
app.use(cors());
app.use(express.json()); // Parses JSON bodies
app.use(express.urlencoded({ extended: true })); // Parses form data
app.use('/api', require('./routes/events'));
// ✅ Then mount your routes
app.use('/api/admin', require('./routes/admin'));
app.use('/api/events', require('./routes/events'));
app.use('/api', require('./routes/events'));
app.use('/api/register', require('./routes/register'));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
const adminRoutes = require('./routes/admin');
const router = require("./routes/register");
app.use('/api/admin', adminRoutes); // ✅ This works only if adminRoutes is a router

console.log("adminRoutes type:", typeof adminRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Server is running');
});


app.get('/test-email', async (req, res) => {
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
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));