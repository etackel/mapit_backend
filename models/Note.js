const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
});

const noteSchema = new mongoose.Schema({
  noteId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  taskList: [taskSchema],
  address: { type: String, required: true },
  label: { type: String },
  isPinned: { type: Boolean, default: false },
  reminderTime: { type: Date, required: true },
  isSilent: { type: Boolean, default: false },
});

module.exports = mongoose.model('Note', noteSchema);
