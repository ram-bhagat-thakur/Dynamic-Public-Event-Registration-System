const Event = require('../models/Event');
const Registration = require('../models/Registration'); // ✅ Added
const fs = require('fs');
const path = require('path');

/**
 * Event Controller
 * Handles CRUD operations for events including banner upload and seat tracking.
 * 
 * Banner images are stored in /uploads and cleaned up on update/delete.
 * leftSeats is auto-calculated based on totalSeats and registration count.
 * 
 * Expected req.body fields:
 * - title: String
 * - description: String
 * - date: ISO String
 * - totalSeats: Number
 * - removeBanner: 'true' (optional)
 */

// DELETE /api/events/:id
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Delete banner image if it exists
    if (event.bannerPath) {
      const imagePath = path.join(__dirname, '..', 'uploads', event.bannerPath);
      fs.unlink(imagePath, (err) => {
        if (err) console.warn('Image deletion failed:', err.message);
      });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete event', error });
  }
};

// GET all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events', error });
  }
};

// POST create new event
exports.createEvent = async (req, res) => {
  try {
    console.log('Incoming body:', req.body);
    console.log('Incoming file:', req.file);

    const totalSeatsRaw = req.body.totalSeats;
    const totalSeats = Number(totalSeatsRaw);

    if (!totalSeatsRaw || isNaN(totalSeats) || totalSeats < 1) {
      return res.status(400).json({ message: 'Invalid totalSeats: must be a number ≥ 1' });
    }

    const newEvent = new Event({
      ...req.body,
      totalSeats,
      leftSeats: totalSeats,
      bannerPath: req.file?.filename || ''
    });

    const savedEvent = await newEvent.save();
    console.log('✅ Event saved:', savedEvent);
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('❌ Create event error:', error);
    res.status(500).json({ message: 'Failed to create event', error: error.message });
  }
};

// PUT update event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const updatedData = req.body;

    // ✅ Recalculate leftSeats if totalSeats is changed
    if (updatedData.totalSeats !== undefined) {
      const regCount = await Registration.countDocuments({ eventId: req.params.id });
      updatedData.leftSeats = Math.max(0, updatedData.totalSeats - regCount);
    }

    // Handle banner removal
    if (req.body.removeBanner === 'true' && event.bannerPath) {
      const imagePath = path.join(__dirname, '..', 'uploads', event.bannerPath);
      fs.unlink(imagePath, (err) => {
        if (err) console.warn('Failed to delete banner:', err.message);
      });
      updatedData.bannerPath = '';
    }

    // Handle new banner upload
    if (req.file) {
      updatedData.bannerPath = req.file.filename;

      // Delete old banner if exists
      if (event.bannerPath) {
        const oldPath = path.join(__dirname, '..', 'uploads', event.bannerPath);
        fs.unlink(oldPath, (err) => {
          if (err) console.warn('Failed to delete old banner:', err.message);
        });
      }
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update event', error });
  }
};

// GET /api/events/:id
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch event', error });
  }
};