const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  id: Number,
  title: String,
  date: String,
  time: String,
  leftSeate: Number,
  totalSeats: Number,
  tags: String,
  location: String,
  description: String,
  highlights: String,
  organizer: String,
  bannerPath: String,
});

module.exports = mongoose.model('Event', eventSchema);