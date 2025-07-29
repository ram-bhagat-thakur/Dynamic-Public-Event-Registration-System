const Contact = require('../models/Contact');

// POST /api/contact
exports.submitContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const saved = await newContact.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Failed to submit contact form', error });
  }
};

// GET /api/contact (admin only)
exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages', error });
  }
};

// PATCH /api/contact/:id/read
exports.markAsRead = async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark as read', error });
  }
};

// DELETE /api/contact/:id
exports.deleteMessage = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete message', error });
  }
};