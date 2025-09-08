const HomeController = {
  index: (req, res) => {
    // Render view with data (similar to Laravel controllers passing data to Blade views)
    res.render('home', { title: 'Home', message: 'Welcome to Larify!' });
  }
};

module.exports = HomeController;
