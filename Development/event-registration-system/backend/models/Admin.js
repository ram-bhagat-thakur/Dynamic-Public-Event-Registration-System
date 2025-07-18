const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // plain or hashed
  isAdmin: { type: Boolean, default: true }   // optional but useful
});

module.exports = mongoose.model('Admin', adminSchema);