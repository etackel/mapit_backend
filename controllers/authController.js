const admin = require('firebase-admin');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const serviceAccount = require('../config/serviceAccountKey.json'); // Provide path to your Firebase service account key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

exports.firebaseCallback = async (req, res) => {
  const idToken = req.body.idToken;

  try {
    // Verify Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    // Check if user exists in the database
    let user = await User.findOne({ firebaseUid: uid });

    // If user doesn't exist, create a new user
    if (!user) {
      const { email, name } = decodedToken;
      user = new User({
        firebaseUid: uid,
        email,
        name,
      });
      await user.save();
    }

    // Generate JWT token
    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    // Redirect to frontend with JWT token (for demonstration purposes)
    res.redirect(`http://localhost:8080/?token=${jwtToken}`);
  } catch (error) {
    console.error('Firebase callback error:', error);
    res.status(500).send('Firebase callback failed');
  }
};
