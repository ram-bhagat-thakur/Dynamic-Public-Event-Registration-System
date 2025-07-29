const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// ✅ Prevent OverwriteModelError in watch mode
module.exports = mongoose.models.Contact || mongoose.model('Contact', contactSchema);