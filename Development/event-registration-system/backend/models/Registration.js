const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  eventId: String,
  eventTitle: String,
  name: String,
  email: String,
  phone: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registration', registrationSchema);
  