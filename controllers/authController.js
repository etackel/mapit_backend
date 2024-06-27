// const axios = require("axios");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// require("dotenv").config();

// // const oauthConfig = {
// //     // Your OAuth configuration

// // };

// const oauthConfig = {
//   clientId: "process.env.clientID",
//   clientSecret: "process.env.clientSecret",
//   redirectUri: "http://localhost:3000/callback",
//   authorizationUrl: "https://accounts.google.com/o/oauth2/auth",
//   tokenUrl: "https://oauth2.googleapis.com/token",
//   userInfoUrl: "https://openidconnect.googleapis.com/v1/userinfo",
//   scope: "openid email profile",
// };

// exports.callback = async (req, res) => {
//   const code = req.query.code;

//   try {
//     // OAuth code exchange and user info retrieval
//     // (Same code as before)

//     const tokenResponse = await axios.post(oauthConfig.tokenUrl, {
//       code,
//       client_id: oauthConfig.clientId,
//       client_secret: oauthConfig.clientSecret,
//       redirect_uri: oauthConfig.redirectUri,
//       grant_type: "authorization_code",
//     });

//     const accessToken = tokenResponse.data.access_token;

//     // Fetch user information using the access token
//     const userInfoResponse = await axios.get(oauthConfig.userInfoUrl, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     const userInfo = userInfoResponse.data;

//     // Create or update user in the database
//     let user = await User.findOne({ googleId: userInfo.sub });

//     if (!user) {
//       user = new User({
//         googleId: userInfo.sub,
//         email: userInfo.email,
//         name: userInfo.name,
//       });
//       await user.save();
//     }

//     // Generate JWT token
//     const jwtToken = jwt.sign({ userId: user._id }, "your_jwt_secret");

//     // Store JWT token in the database
//     user.jwtToken = jwtToken;
//     await user.save();

//     // Redirect to frontend with JWT token (for demonstration purposes)
//     res.redirect(`http://localhost:8080/?token=${jwtToken}`);
//   } catch (error) {
//     console.error("OAuth callback error:", error);
//     res.status(500).send("OAuth callback failed");
//   }
// };



const admin = require('firebase-admin');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Initialize Firebase Admin SDK
const serviceAccount = require('../config/serviceAccountKey.json'); // Provide path to your Firebase service account key
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Other Firebase configuration options
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
