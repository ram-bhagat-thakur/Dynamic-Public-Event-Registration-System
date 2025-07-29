const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  message: { type: String },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  registeredAt: { type: Date, default: Date.now },
});

// ✅ Prevent OverwriteModelError in watch mode
module.exports = mongoose.models.Registration || mongoose.model('Registration', registrationSchema);