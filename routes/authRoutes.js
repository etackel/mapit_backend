const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/firebase-callback', authController.firebaseCallback);

module.exports = router;
