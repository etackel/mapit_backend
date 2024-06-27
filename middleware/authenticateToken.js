// const jwt = require('jsonwebtoken');

// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (token == null) return res.sendStatus(401);

//     jwt.verify(token, JWT_SECRET, (err, user) => {
//         if (err) return res.sendStatus(403);
//         req.user = user;
//         next();
//     });
// }

// module.exports = authenticateToken;


// middleware/authenticateToken.js

// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// const authenticateToken = async (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized - Missing token' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findById(decoded.userId);

//         if (!user) {
//             return res.status(401).json({ message: 'Unauthorized - Invalid token' });
//         }

//         req.user = user;
//         next();
//     } catch (err) {
//         return res.status(401).json({ message: 'Unauthorized - Invalid token' });
//     }
// };

// module.exports = authenticateToken;


const admin = require('firebase-admin');

const authenticateToken = async (req, res, next) => {
  const idToken = req.headers.authorization;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Attach user information to the request object
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = authenticateToken;
