const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  leftSeats: { type: Number, required: true },
  totalSeats: { type: Number, required: true },
  tags: { type: String },
  location: { type: String, required: true },
  description: { type: String },
  highlights: { type: String },
  organizer: { type: String },
  bannerPath: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// ✅ Prevent OverwriteModelError in watch mode
module.exports = mongoose.models.Event || mongoose.model('Event', eventSchema);