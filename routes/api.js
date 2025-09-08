const express = require('express');
const router = express.Router();

// API routes
router.get('/', (req, res) => {
  res.json({
    name: 'Larify API',
    version: '1.0.0'
  });
});

// Users API
router.get('/users', async (req, res) => {
  const User = require('../app/models/User');
  try {
    const users = await User.all();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
