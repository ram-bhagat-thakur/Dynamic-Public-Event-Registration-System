const Event = require('../models/Event');
const Registration = require('../models/Registration'); // ✅ Added
const fs = require('fs');
const path = require('path');

const cloudinary = require('cloudinary').v2;

// DELETE /api/events/:id
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // 🔥 Delete banner image from Cloudinary if it exists
    if (event.bannerPath) {
      await cloudinary.uploader.destroy(event.bannerPath); // bannerPath should be public_id
    }

    // 🗑 Delete event from DB
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event and banner deleted successfully' });
  } catch (error) {
    console.error('Deletion error:', error);
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
    const newEvent = new Event({
      ...req.body,
      bannerPath: req.file ? req.file.filename : '',
      leftSeats: req.body.totalSeats // ✅ initialize leftSeats
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Create event error:', error.message);
    res.status(500).json({ message: 'Failed to create event', error });
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