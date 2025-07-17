const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Registration = require('../models/Registration'); // ✅ Add this
const sendConfirmationEmail = require('../utils/sendConfirmationEmail'); 

router.post('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.leftSeate <= 0) {
      return res.status(400).json({ message: "No seats left" });
    }

    const { name, email, mobile, message } = req.body;

    // Create registration
    const registration = new Registration({
      name,
      email,
      mobile,
      message,
      eventId: req.params.id
    });
    await registration.save();

    // Update event stats
    event.leftSeate -= 1;
    event.TotalResister += 1;
    await event.save();

    // ✅ Send confirmation email
    await sendConfirmationEmail(registration, event);

    res.status(200).json({
      message: "Registration successful",
      registration,
      updatedEvent: {
        _id: event._id,
        title: event.title,
        location: event.location,
        date: event.date,
        leftSeate: event.leftSeate,
        TotalResister: event.TotalResister
      }
    });
  } catch (err) {
    console.error("❌ Registration error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});



module.exports = router;