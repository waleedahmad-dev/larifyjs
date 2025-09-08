// Base service provider class (similar to Laravel's ServiceProvider)
class ServiceProvider {
  constructor(app) {
    this.app = app;
  }

  register() {
    // Register bindings and services
  }

  boot() {
    // Boot after all providers are registered
  }
}

module.exports = ServiceProvider;
