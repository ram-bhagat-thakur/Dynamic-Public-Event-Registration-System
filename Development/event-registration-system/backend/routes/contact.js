const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact'); // MongoDB model
const nodemailer = require('nodemailer'); // Optional

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Save to DB
    const contact = new Contact({ name, email, message });
    await contact.save();

    // Optional: Send email confirmation
    // const transporter = nodemailer.createTransport({ ... });
    // await transporter.sendMail({ ... });

    res.status(200).json({ message: 'Message received successfully' });
  } catch (err) {
    console.error('❌ Contact form error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/all', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error('❌ Fetch messages error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Message not found' });
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (err) {
    console.error('❌ Delete error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/', async (req, res) => {
  try {
    await Contact.deleteMany({});
    res.status(200).json({ message: 'All messages deleted successfully' });
  } catch (err) {
    console.error('❌ Delete all error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});
module.exports = router;