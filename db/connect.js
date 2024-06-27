// const mongoose = require("mongoose");

// const connectDB = (url) => {
//   return mongoose.connect(url, {
//   });
// };

// module.exports = connectDB;


const mongoose = require('mongoose');

const connectDB = async (url) => {
  try {
    await mongoose.connect(url, {
      // MongoDB connection options
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
};

module.exports = connectDB;
