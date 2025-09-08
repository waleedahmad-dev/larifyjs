// Auth controller for authentication (similar to Laravel's Auth system)
const Controller = require('../core/Controller');
const User = require('../models/User');
const LoginRequest = require('../requests/LoginRequest');

class AuthController extends Controller {
  // Show login form
  showLogin(req, res) {
    return this.view(res, 'auth/login', { title: 'Login' });
  }

  // Handle login
  async login(req, res) {
    const { email, password } = req.validated;
    
    try {
      // Find user by email
      const user = await User.query().where({ email }).first();
      
      if (!user) {
        return this.with(req, 'error', 'Invalid credentials')
          .back(req, res);
      }
      
      // Create user model instance
      const userModel = new User().fill(user);
      
      // Verify password
      const validPassword = await userModel.verifyPassword(password);
      if (!validPassword) {
        return this.with(req, 'error', 'Invalid credentials')
          .back(req, res);
      }
      
      // Store user in session
      req.session.user = userModel.toJSON();
      
      return this.with(req, 'success', 'Logged in successfully')
        .redirect(res, '/dashboard');
    } catch (error) {
      console.error(error);
      return this.with(req, 'error', 'An error occurred')
        .back(req, res);
    }
  }

  // Handle logout
  logout(req, res) {
    req.session.destroy();
    return this.redirect(res, '/login');
  }
  
  // Show registration form
  showRegister(req, res) {
    return this.view(res, 'auth/register', { title: 'Register' });
  }
  
  // Handle registration
  async register(req, res) {
    const { name, email, password } = req.body;
    
    try {
      // Check if user already exists
      const existingUser = await User.query().where({ email }).first();
      if (existingUser) {
        return this.with(req, 'error', 'Email already in use')
          .back(req, res);
      }
      
      // Create new user
      const user = new User();
      user.fill({ name, email });
      await user.setPassword(password);
      await user.save();
      
      // Store user in session
      req.session.user = user.toJSON();
      
      return this.with(req, 'success', 'Registered successfully')
        .redirect(res, '/dashboard');
    } catch (error) {
      console.error(error);
      return this.with(req, 'error', 'An error occurred')
        .back(req, res);
    }
  }
}

module.exports = new AuthController();
