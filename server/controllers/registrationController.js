const Registration = require('../models/Registration');
const sendConfirmationEmail = require('../utils/sendConfirmationEmail');
const Event = require('../models/Event');

// GET /api/registrations
exports.getAllRegistrants = async (req, res) => {
  try {
    const registrants = await Registration.find().populate('eventId', 'title');
    res.json(registrants);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch registrants', error });
  }
};

// GET /api/registrations/event/:eventId
exports.getRegistrantsByEvent = async (req, res) => {
  try {
    const registrants = await Registration.find({ eventId: req.params.eventId });
    res.json(registrants);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch event registrants', error });
  }
};

// POST /api/register
exports.registerUser = async (req, res) => {
  try {
    const event = await Event.findById(req.body.eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (event.leftSeats <= 0) {
      return res.status(400).json({ message: 'No seats left for this event' });
    }

    // Save registration
    const newRegistration = new Registration(req.body);
    const saved = await newRegistration.save();

    // Update leftSeats
    event.leftSeats -= 1;
    await event.save();

    // Send confirmation email
    await sendConfirmationEmail({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      eventTitle: event.title || 'Your Event',
      eventDate: event.date,
      time: event.time,
      location: event.location,
    });

    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Registration failed', error });
  }
};

// GET /api/register?eventId=xyz
exports.getRegistrationsByEvent = async (req, res) => {
  try {
    const { eventId } = req.query;
    const registrations = await Registration.find({ eventId });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching registrations', error });
  }
};

// DELETE /api/registrations/event/:eventId
exports.deleteAllRegistrants = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const registrations = await Registration.find({ eventId });
    const count = registrations.length;

    await Registration.deleteMany({ eventId });

    const event = await Event.findById(eventId);
    if (event) {
      event.leftSeats += count;
      await event.save();
    }

    res.json({ message: 'All registrants deleted', restoredSeats: count });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete registrants', error });
  }
};

// DELETE /api/registrations/:id
exports.deleteSingleRegistrant = async (req, res) => {
  try {
    const registrant = await Registration.findById(req.params.id);
    if (!registrant) return res.status(404).json({ message: 'Registrant not found' });

    await Registration.findByIdAndDelete(req.params.id);

    const event = await Event.findById(registrant.eventId);
    if (event) {
      event.leftSeats += 1;
      await event.save();
    }

    res.json({ message: 'Registrant deleted and seat restored' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete registrant', error });
  }
};