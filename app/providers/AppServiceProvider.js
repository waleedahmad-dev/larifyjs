const ServiceProvider = require('../core/ServiceProvider');
const fs = require('fs');
const path = require('path');

class AppServiceProvider extends ServiceProvider {
  register() {
    // Register app services
  }

  boot() {
    // Boot app services
    this.registerHelpers();
  }

  registerHelpers() {
    // Register global helpers (similar to Laravel's helpers)
    const helpersDir = path.join(process.cwd(), 'utils/helpers');
    if (fs.existsSync(helpersDir)) {
      fs.readdirSync(helpersDir).forEach(file => {
        if (file.endsWith('.js')) {
          require(path.join(helpersDir, file));
        }
      });
    }
  }
}

module.exports = AppServiceProvider;
