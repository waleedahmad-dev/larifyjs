// Base controller class (similar to Laravel's Controller)
class Controller {
  // Common controller methods
  
  // Send a JSON response (similar to Laravel's response()->json())
  json(res, data, status = 200) {
    return res.status(status).json(data);
  }
  
  // Redirect to a URL (similar to Laravel's redirect())
  redirect(res, url, status = 302) {
    return res.redirect(status, url);
  }
  
  // Redirect back (similar to Laravel's redirect()->back())
  back(req, res) {
    const backUrl = req.header('Referer') || '/';
    return res.redirect(backUrl);
  }
  
  // Render a view (similar to Laravel's view())
  view(res, view, data = {}) {
    return res.render(view, data);
  }
  
  // Flash a message to the session (similar to Laravel's with())
  with(req, key, value) {
    if (req.session) {
      req.flash(key, value);
    }
    return this;
  }
  
  // Send a 404 response
  notFound(res) {
    return res.status(404).render('errors/404');
  }
  
  // Handle validation via middleware
  validate(RequestClass) {
    return (req, res, next) => {
      const request = new RequestClass(req, res, next);
      return request.process();
    };
  }
}

module.exports = Controller;
