const Request = require('../core/Request');
const { check } = require('express-validator');

class LoginRequest extends Request {
  validate() {
    this.rules = {
      email: 'required|email',
      password: 'required|min:6'
    };
    
    return [
      check('email')
        .isEmail()
        .withMessage('Please enter a valid email address'),
      check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
    ];
  }
}

module.exports = LoginRequest;
