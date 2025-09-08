// Auth middleware (similar to Laravel's auth middleware)
function auth(req, res, next) {
  if (!req.session || !req.session.user) {
    // Store intended URL
    req.session.intendedUrl = req.originalUrl;
    
    // Flash message
    if (req.flash) {
      req.flash('error', 'Please login to continue');
    }
    
    // Redirect to login
    return res.redirect('/login');
  }
  
  // Make user available to views
  res.locals.user = req.session.user;
  
  // Continue to route
  return next();
}

module.exports = auth;
