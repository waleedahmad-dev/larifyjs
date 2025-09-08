const Controller = require('../core/Controller');
const User = require('../models/User');

class HomeController extends Controller {
  constructor() {
    super();
    // Bind methods to this instance
    this.index = this.index.bind(this);
    this.about = this.about.bind(this);
  }

  // Display the home page
  async index(req, res) {
    // Example of fetching users (similar to Laravel's User::all())
    let users = [];
    try {
      users = await User.all();
    } catch (err) {
      console.log('Database not yet set up:', err.message);
    }
    
    // Render view with data (similar to Laravel's view with compact())
    return this.view(res, 'home', { 
      title: 'Home', 
      message: 'Welcome to Larify!',
      users: users
    });
  }
  
  // Example of another controller method
  about(req, res) {
    return this.view(res, 'about', { title: 'About' });
  }
}

module.exports = new HomeController();
