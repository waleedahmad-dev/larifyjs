// Guest middleware (similar to Laravel's guest middleware)
function guest(req, res, next) {
  if (req.session && req.session.user) {
    // Redirect to home if already authenticated
    return res.redirect('/');
  }
  
  // Continue to route
  return next();
}

module.exports = guest;
