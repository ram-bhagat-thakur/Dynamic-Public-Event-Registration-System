const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middleware/auth');
const Registration = require('../models/Registration');

// ✅ Delete one registrant by ID
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const deleted = await Registration.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Registrant not found' });
    }
    res.json({ message: 'Registrant deleted successfully' });
  } catch (err) {
    console.error("❌ Delete registrant error:", err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

// ✅ Delete all registrants for an event
router.delete('/event/:eventId', verifyAdmin, async (req, res) => {
  try {
    const result = await Registration.deleteMany({ eventId: req.params.eventId });
    res.json({ message: 'All registrants deleted', count: result.deletedCount });
  } catch (err) {
    console.error("❌ Delete all error:", err);
    res.status(500).json({ error: 'Server error' });
  }
});
module.exports = router;