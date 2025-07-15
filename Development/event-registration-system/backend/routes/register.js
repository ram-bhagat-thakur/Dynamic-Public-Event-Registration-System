const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

router.get('/', async (req, res) => {
  try {
    const registrations = await Registration.find();
    res.status(200).json(registrations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;