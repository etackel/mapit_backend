const express = require('express');
const Note = require('../models/Note');
const { authenticateJWT } = require('../middleware/authMiddleware');
const router = express.Router();

// Create Note
router.post('/', authenticateJWT, async (req, res) => {
  try {
    const note = new Note({
      noteId: req.body.noteId,
      title: req.body.title,
      description: req.body.description,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      taskList: req.body.taskList,
      address: req.body.address,
      label: req.body.label,
      isPinned: req.body.isPinned,
      reminderTime: req.body.reminderTime,
      isSilent: req.body.isSilent,
    });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all notes
router.get('/', authenticateJWT, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.email });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single note
router.get('/:id', authenticateJWT, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.userId !== req.user.email) {
      return res.status(404).json({ error: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update note
router.put('/:id', authenticateJWT, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.userId !== req.user.email) {
      return res.status(404).json({ error: 'Note not found' });
    }
    Object.assign(note, req.body);
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete note
router.delete('/:id', authenticateJWT, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note || note.userId !== req.user.email) {
      return res.status(404).json({ error: 'Note not found' });
    }
    await note.remove();
    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
