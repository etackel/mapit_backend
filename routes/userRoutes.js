const express = require('express');
const { generateJWT } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/login', (req, res) => {
  const { email, name, picture } = req.body;
  if (!email || !name || !picture) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  const user = { email, name, picture };
  const token = generateJWT(user);
  res.json({ token, user });
});

module.exports = router;
