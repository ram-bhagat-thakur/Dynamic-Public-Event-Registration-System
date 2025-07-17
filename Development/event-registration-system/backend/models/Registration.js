const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  message: String,
  eventId: String
}, {
  collection: 'registrations' // ✅ Must match exactly
});

module.exports = mongoose.model('Registration', registrationSchema);