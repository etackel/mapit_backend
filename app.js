// const express = require("express");
// const app = express();

// const connectDB = require('./db/connect.js')
// const tasks = require("./routes/tasks.js");
// require("dotenv").config()

// //middleware
// app.use(express.static('./public'));
// app.use(express.json());

// //routes

// const authRoutes = require('./routes/oauthRoutes.js');
// const taskRoutes = require('./routes/tasks.js');

// app.use('/oauth', authRoutes);
// app.use('/tasks', taskRoutes);


// const port = 5000;
// const start  = async () => {
//     try {
//         await connectDB(process.env.MONGO_URI);
//         app.listen(port, console.log(`Server is listening on port ${port}`));
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

// start();




const express = require('express');
const app = express();
const connectDB = require('./db/connect.js');

// Middleware
app.use(express.static('./public'));
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes.js');
const taskRoutes = require('./routes/tasks.js');

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (err) {
    console.error('Server startup error:', err);
  }
};

start();
