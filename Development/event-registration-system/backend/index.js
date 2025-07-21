const express = require("express")
const mongoose = require("mongoose")
const path = require("path");
const cors = require("cors")
const  dotenv= require("dotenv")
const registrationsRoutes = require('./routes/registrations');
const contactRoutes = require('./routes/contact');

require('dotenv').config(); // ✅ Load environment variables
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parses form data
//✅ BEFORE any route
app.use(cors());
app.use('/api/registrations', registrationsRoutes);
app.use('/api', require('./routes/events'));
// ✅ mounted routes
app.use('/api/contact', contactRoutes);
app.use('/api/admin', require('./routes/admin'));
app.use('/api/events', require('./routes/events'));
app.use('/api', require('./routes/events'));
app.use('/api/register', require('./routes/register'));
app.use('/uploads', express.static('uploads'));
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);
app.use(express.static(path.join(__dirname, "dist")));

// Test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

app.get("/{*any}", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));