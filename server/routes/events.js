const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById
} = require('../controllers/eventController');
const verifyAdmin = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');


// GET /api/events
router.get('/', getAllEvents);

// POST /api/events
router.post('/', verifyAdmin, upload.single('banner'), createEvent, async (req, res) => {
  try {
    const eventData = req.body;
    if (req.file) {
      eventData.bannerPath = req.file.filename;
    }
    const newEvent = new Event(eventData);
    const saved = await newEvent.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create event', error });
  }
});


// Update Event
router.put('/:id', verifyAdmin, upload.single('banner'), updateEvent);

// Delete Event
router.delete('/:id', verifyAdmin, deleteEvent);

router.get('/:id', getEventById);

module.exports = router;