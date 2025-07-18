const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); // Make sure this model exists
const multer = require('multer');
const Registration = require('../models/Registration'); // ✅ Correct model name

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');



function verifyAdmin(req, res, next) {
  const SECRET = process.env.JWT_SECRET;
  // console.log("🔐 JWT_SECRET in middleware:", SECRET); // ✅ Should now be defined

  if (!SECRET) {
    return res.status(500).json({ message: "JWT secret not configured" });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    console.log("❌ JWT verification failed:", err.message);
    res.status(403).json({ message: "Invalid or expired token" });
  }
}

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//post 
router.post('/', upload.single('banner'), async (req, res) => {
  try {
    const {
      title,
      date,
      time,
      totalSeats,
      location,
      tags,
      description,
      highlights,
      organizer,
      bannerPath
    } = req.body;

    //     console.log("req.body:", req.body);
    // console.log("req.file:", req.file);
    if (!title || !date || !totalSeats || !location || !tags || !organizer) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    // console.log("Received time:", req.body.time); // Should match frontend
    const newEvent = new Event({
      title,
      date,
      time: req.body.time,
      totalSeats,
      leftSeate: totalSeats,
      location,
      tags,
      description,
      highlights,
      organizer,
      bannerPath: req.file?.path.replace(/\\/g, '/') || ''
    });

    await newEvent.save();
    res.status(201).json({ message: "Event added successfully" });
  } catch (err) {
    console.error("❌ Error saving event:", err);
    res.status(500).json({ error: err.message });
  }
});

// router.get('/events/registrations', verifyAdmin, async (req, res) => {
//   try {
//     const data = await Registration.find(); // ✅ Use the imported model
//     res.json(data);
//   } catch (err) {
//     console.error("Error in /registrations:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });
router.get('/events/registrations', verifyAdmin, async (req, res) => {
  try {
    const raw = await mongoose.connection.db.collection('registrations').find({}).toArray();
    // console.log("📦 Raw MongoDB query result:", raw);
    res.json(raw);
  } catch (err) {
    console.error("❌ Error in raw query:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// router.get('/events/test-insert', async (req, res) => {
//   try {
//     const inserted = await Registration.create({
//       name: "Test User",
//       email: "testuser@example.com",
//       mobile: "1234567890",
//       message: "Inserted via Mongoose",
//       eventId: "test-event-id"
//     });

//     console.log("✅ Inserted via Mongoose:", inserted);

//     const all = await Registration.find();
//     console.log("📦 All registrations after insert:", all);

//     res.json(all);
//   } catch (err) {
//     console.error("❌ Insert error:", err);
//     res.status(500).json({ error: "Insert failed" });
//   }
// });

router.get('/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/events/:eventId/registrations', verifyAdmin, async (req, res) => {
  try {
    const { eventId } = req.params;
    const registrations = await Registration.find({ eventId });
    res.json(registrations);
  } catch (err) {
    console.error("❌ Error fetching event registrations:", err);
    res.status(500).json({ error: "Server error" });
  }
});


router.delete('/events/:id', verifyAdmin, async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.put('/events/:id', verifyAdmin, async (req, res) => {
  try {
    const registrationCount = await Registration.countDocuments({ eventId: req.params.id });

    // Fetch current event to get totalSeats
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    // Recalculate leftSeate
    const totalSeats = parseInt(req.body.totalSeats || event.totalSeats);
const leftSeate = totalSeats - registrationCount;

    // Merge into update payload
    const updatePayload = {
  ...req.body,
  leftSeate
};

    // Update event
    const updated = await Event.findByIdAndUpdate(req.params.id, updatePayload, { new: true });
    res.json(updated);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.delete('/api/registrations/:id', verifyAdmin, async (req, res) => {
  console.log("🧹 DELETE request received:", req.params);
  const deleted = await Registration.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Registrant not found' });
  res.json({ message: 'Registrant deleted' });
});

router.delete('/api/events/:eventId/registrations', verifyAdmin, async (req, res) => {
  console.log("🧹 DELETE request received:", req.params);
  const result = await Registration.deleteMany({ eventId: req.params.eventId });
  res.json({ message: 'All registrants deleted', count: result.deletedCount });
});

module.exports = router;