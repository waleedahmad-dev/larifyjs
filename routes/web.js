const express = require('express');
const router = express.Router();
const HomeController = require('../app/controllers/HomeController');
const AuthController = require('../app/controllers/AuthController');
const LoginRequest = require('../app/requests/LoginRequest');

// Middleware
const auth = require('../app/middleware/auth');
const guest = require('../app/middleware/guest');

// Public routes
router.get('/', HomeController.index);
router.get('/about', HomeController.about);

// Documentation routes
router.get('/docs', (req, res) => {
  res.render('docs/index', { title: 'Documentation' });
});

// Auth routes (guest only)
router.get('/login', guest, AuthController.showLogin.bind(AuthController));
router.post('/login', guest, LoginRequest.validate(LoginRequest), AuthController.login.bind(AuthController));
router.get('/register', guest, AuthController.showRegister.bind(AuthController));
router.post('/register', guest, AuthController.register.bind(AuthController));

// Auth routes (authenticated only)
router.get('/logout', auth, AuthController.logout.bind(AuthController));

module.exports = router;
