const ServiceProvider = require('../core/ServiceProvider');
const knex = require('knex');
const knexConfig = require('../../knexfile');

class DatabaseServiceProvider extends ServiceProvider {
  register() {
    // Register database connection (similar to Laravel's DB facade)
    const env = process.env.NODE_ENV || 'development';
    this.app.db = knex(knexConfig[env]);
    
    // Make DB available globally
    global.DB = this.app.db;
  }

  boot() {
    // Set up database events or listeners
    this.app.db.on('query', (data) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(`[DB Query] ${data.sql} [${data.bindings ? data.bindings.join(', ') : ''}]`);
      }
    });
  }
}

module.exports = DatabaseServiceProvider;
