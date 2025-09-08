const { check, validationResult } = require('express-validator');

// Request class for validating and processing requests (similar to Laravel's FormRequest)
class Request {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.rules = {};
    this.messages = {};
    this.validator = null;
  }

  // Define validation rules (to be overridden by child classes)
  validate() {
    return [];
  }

  // Run validation
  async process() {
    const validators = this.validate();
    
    try {
      // Run validators
      await Promise.all(validators.map(validator => validator.run(this.req)));
      
      // Check for validation errors
      const errors = validationResult(this.req);
      if (!errors.isEmpty()) {
        // Flash errors to session (Laravel-like behavior)
        if (this.req.flash) {
          this.req.flash('errors', errors.array());
          this.req.flash('old', this.req.body);
        }
        
        if (this.req.xhr || this.req.headers.accept.includes('json')) {
          // Return JSON response for API requests
          return this.res.status(422).json({ 
            errors: errors.array() 
          });
        } else {
          // Redirect back with errors for web requests
          return this.res.redirect('back');
        }
      }
      
      // Add validated data to request
      this.req.validated = this.only(Object.keys(this.rules));
      
      // Continue to controller
      return this.next();
    } catch (error) {
      return this.next(error);
    }
  }

  // Get specific fields from request (similar to Laravel's only())
  only(fields) {
    const data = {};
    fields.forEach(field => {
      if (this.req.body[field] !== undefined) {
        data[field] = this.req.body[field];
      }
    });
    return data;
  }

  // Static factory method to use as middleware
  static validate(RequestClass) {
    return (req, res, next) => {
      const request = new RequestClass(req, res, next);
      return request.process();
    };
  }
}

module.exports = Request;
