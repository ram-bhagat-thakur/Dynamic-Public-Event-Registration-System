const express = require('express');
const router = express.Router();
const Event = require('../models/Event'); // Make sure this model exists
const multer = require('multer');


// Configure multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });


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

    console.log("req.body:", req.body);
console.log("req.file:", req.file);
    if (!title || !date || !totalSeats || !location || !tags || !organizer) {
      return res.status(400).json({ error: "Missing required fields" });
    }
console.log("Received time:", req.body.time); // Should match frontend
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

router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;