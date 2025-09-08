// Main config file - loads individual config files
module.exports = {
  app: require('./app').app,
  
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
