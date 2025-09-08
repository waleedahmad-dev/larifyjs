// Core framework class that bootstraps the application
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const dotenv = require('dotenv');
const fs = require('fs');

class Application {
  constructor() {
    // Initialize Express
    this.app = express();
    this.bootEnvironment();
    this.bootProviders();
    this.registerMiddleware();
    this.registerViewEngine();
    this.registerRoutes();
  }

  bootEnvironment() {
    // Load environment variables (similar to Laravel's .env)
    dotenv.config();
    this.config = require('../../config');
  }

  bootProviders() {
    // Register service providers (similar to Laravel's service providers)
    this.providers = {};
    
    // Load service providers from config
    if (this.config && this.config.providers) {
      this.config.providers.forEach(Provider => {
        const provider = new Provider(this);
        provider.register();
        this.providers[provider.constructor.name] = provider;
      });
    }
  }

  registerMiddleware() {
    // Global middleware (similar to Laravel's global middleware)
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(path.join(process.cwd(), 'public')));
    
    // Load custom middleware from config
    if (this.config && this.config.middleware) {
      this.config.middleware.forEach(middleware => {
        this.app.use(middleware);
      });
    }
  }

  registerViewEngine() {
    // Register view engine (mimicking Laravel's Blade)
    this.app.engine('hbs', exphbs.engine({
      extname: 'hbs',
      defaultLayout: 'main',
      layoutsDir: path.join(process.cwd(), 'resources/views/layouts'),
      partialsDir: path.join(process.cwd(), 'resources/views/partials'),
      helpers: require('../../utils/view-helpers')
    }));
    this.app.set('view engine', 'hbs');
    this.app.set('views', path.join(process.cwd(), 'resources/views'));
  }

  registerRoutes() {
    // Auto-load all route files from the routes directory
    const routesDir = path.join(process.cwd(), 'routes');
    fs.readdirSync(routesDir).forEach(file => {
      if (file.endsWith('.js')) {
        const router = require(path.join(routesDir, file));
        // Use the file name without extension as the prefix (e.g., api.js -> /api)
        const prefix = file === 'web.js' ? '/' : `/${file.replace('.js', '')}`;
        this.app.use(prefix, router);
      }
    });
  }

  start() {
    // Start the application (similar to Laravel's serve command)
    const PORT = process.env.PORT || 3000;
    this.app.listen(PORT, () => {
      console.log(`Larify server running on port ${PORT}`);
      
      // Boot service providers
      if (this.config && this.config.providers) {
        Object.values(this.providers).forEach(provider => {
          if (provider.boot) {
            provider.boot();
          }
        });
      }
    });

    return this;
  }
}

module.exports = new Application();
