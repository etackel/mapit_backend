const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
});

module.exports = mongoose.model('User', userSchema);
