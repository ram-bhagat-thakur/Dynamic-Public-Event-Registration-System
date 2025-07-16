const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const  dotenv= require("dotenv")
const registerRoute = require('./routes/register');
const eventRoute = require('./routes/events.js');



dotenv.config();
const app = express();
//✅ These must come BEFORE any routes
app.use(cors());
app.use(express.json()); // Parses JSON bodies
app.use(express.urlencoded({ extended: true })); // Parses form data

// ✅ Then mount your routes
app.use('/api/admin', require('./routes/admin'));
app.use('/api/events', require('./routes/events'));

app.use('/api/register', require('./routes/register'));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes); // ✅ This works only if adminRoutes is a router

console.log("adminRoutes type:", typeof adminRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Server is running');
});


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));