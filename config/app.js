const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

module.exports = {
  // Application configuration
  app: {
    name: process.env.APP_NAME || 'Larify',
    env: process.env.NODE_ENV || 'development',
    debug: process.env.APP_DEBUG === 'true',
    url: process.env.APP_URL || 'http://localhost:3000',
    key: process.env.APP_KEY || 'larify-secret-key',
  },
  
  // Service providers
  providers: [
    require('../app/providers/AppServiceProvider'),
    require('../app/providers/DatabaseServiceProvider'),
    require('../app/providers/SessionServiceProvider'),
  ],
  
  // Global middleware
  middleware: [
    // Global middleware (automatically loaded)
  ],
  
  // Route middleware (loaded on demand)
  routeMiddleware: {
    'auth': require('../app/middleware/auth'),
    'guest': require('../app/middleware/guest'),
  },
};
