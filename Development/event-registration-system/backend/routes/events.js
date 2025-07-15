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

// POST route with file + form fields
router.post('/', upload.single('banner'), async (req, res) => {
    try {
        const newEvent = new Event({

            title: req.body.title,
            date: req.body.date,
            time: req.body.time,
            totalSeats: req.body.totalSeats,
            location: req.body.location,
            tags: req.body.tags,
            description: req.body.description,
            highlights: req.body.highlights,
            organizer: req.body.organizer,
            leftSeate: req.body.totalSeats,
            bannerPath: req.file?.path || '' // ✅ Save file path
        });



        if (!title || !date || !totalSeats || !location || !tags || !organizer) {
            return res.status(400).json({ error: "Missing required fields" });
        }


        await newEvent.save();
        res.status(201).json({ message: "Event added successfully" });
    } catch (err) {
        console.error("❌ Error saving event:", err);
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;