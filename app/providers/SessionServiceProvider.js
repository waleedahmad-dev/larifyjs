const ServiceProvider = require('../core/ServiceProvider');
const session = require('express-session');
const flash = require('connect-flash');

class SessionServiceProvider extends ServiceProvider {
  register() {
    // Register session middleware (similar to Laravel's session)
    this.app.app.use(session({
      secret: process.env.APP_KEY || 'larify-secret',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: process.env.NODE_ENV === 'production' }
    }));

    // Register flash messages (similar to Laravel's flash)
    this.app.app.use(flash());
    
    // Make flash messages available to all views
    this.app.app.use((req, res, next) => {
      res.locals.flash = req.flash();
      next();
    });
  }
}

module.exports = SessionServiceProvider;
