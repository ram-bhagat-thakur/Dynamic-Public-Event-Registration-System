const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middleware/auth');
const Registration = require('../models/Registration');
const Event = require('../models/Event');

// ✅ Delete one registrant by ID
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const registrant = await Registration.findById(req.params.id);
    if (!registrant) {
      return res.status(404).json({ error: 'Registrant not found' });
    }

    // ✅ Delete registrant
    await registrant.deleteOne();

    // ✅ Increment event's leftSeate
    await Event.findByIdAndUpdate(
      registrant.eventId,
      { $inc: { leftSeate: 1 } },
      { new: true }
    );

    res.json({ message: 'Registrant deleted and seat updated' });
  } catch (err) {
    console.error("❌ Delete registrant error:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

// ✅ Delete all registrants for an event
router.delete('/event/:eventId', verifyAdmin, async (req, res) => {
  try {
    const count = await Registration.countDocuments({ eventId: req.params.eventId });

    // ✅ Delete all
    await Registration.deleteMany({ eventId: req.params.eventId });

    // ✅ Increment leftSeate
    await Event.findByIdAndUpdate(req.params.eventId, {
      $inc: { leftSeate: count }
    });

    res.json({ message: `Deleted ${count} registrants`, count });
  } catch (err) {
    console.error("❌ Bulk delete error:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/', verifyAdmin, async (req, res) => {
  try {
    const result = await Registration.deleteMany({});
    res.json({ message: 'All registrants deleted globally', count: result.deletedCount });
  } catch (err) {
    console.error("❌ Global delete error:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;