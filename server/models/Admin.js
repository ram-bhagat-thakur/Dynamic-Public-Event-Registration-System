const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// ✅ Prevent OverwriteModelError in watch mode
module.exports = mongoose.models.Admin || mongoose.model('Admin', adminSchema);