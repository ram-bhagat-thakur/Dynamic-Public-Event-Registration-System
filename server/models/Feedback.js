const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  verified: { type: Boolean, default: false },
}, { timestamps: true });

// ✅ Prevent OverwriteModelError in watch mode
module.exports = mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);