const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

router.post('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.leftSeate <= 0) {
      return res.status(400).json({ message: "No seats left" });
    }

    event.leftSeate -= 1;
    await event.save();
    event.TotalResister +=1;
    await event.save(); 

    res.status(200).json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;