const mongoose = require("mongoose")

const registrationSchema = new mongoose.Schema({
  
  name: String,
  email: String,
  phone: Number,
  message: String,
  eventId: Number,
  eventTitle: String

});

module.exports=mongoose.model('Registration', registrationSchema);