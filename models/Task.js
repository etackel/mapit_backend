const mongoose = require("mongoose");

// const TaskSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: [true,"must provide name"],
//         maxlength: [20,"The maximum length of the string can be 20 letters"],
//         trim: true,
//     },
//     completed: {
//         type: Boolean,
//         default: false,
//     },
// })

// import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  latitude: {
    type: Number,
    trim: true,
  },
  longitude: {
    type: Number,
    trim: true,
  },
  taskList: {
    type: [String],
    trim: true,
  },
  label: {
    type: String,
    trim: true,
  },
  addr: {
    type: String,
    trim: true,
  },
});

// const Task = mongoose.model("Task", TaskSchema);
// export default Task;

module.exports = mongoose.model("Task", TaskSchema);
