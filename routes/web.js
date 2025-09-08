const express = require('express');
const router = express.Router();
const HomeController = require('../app/controllers/HomeController');

// Routes (mimicking Laravel's web.php for web routes)
router.get('/', HomeController.index);

module.exports = router;
