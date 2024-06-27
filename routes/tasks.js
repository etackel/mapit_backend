// const express = require("express");
// const router = express.Router();

// const {getAllTasks,createTasks,getTasks,updateTasks,deleteTasks} = require("../controllers/tasks");

// router.route("/").get(getAllTasks).post(createTasks);
// router.route("/:id").get(getTasks).patch(updateTasks).delete(deleteTasks);

// module.exports = router;
 

const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authenticateToken = require('../middleware/authenticateToken');
const User = require('../models/User');

// Get all tasks
router.get('/', authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a task by ID
router.get('/:id', authenticateToken,  async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a task
router.post('/', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a task by ID
router.patch('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a task by ID
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
