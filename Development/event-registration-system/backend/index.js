const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const  dotenv= require("dotenv")
const registerRoute = require('./routes/register');
const eventRoute = require('./routes/events.js');



dotenv.config();
const app = express();
app.use(cors());
app.use('/api/register', registerRoute);
app.use('/api/events', eventRoute);
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Import and use registration route
app.use('/api/register', registerRoute);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));