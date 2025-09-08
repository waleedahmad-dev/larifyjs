// Global helper functions (similar to Laravel's helper functions)

// Get config value
global.config = function(key, defaultValue = null) {
  const config = require('../config');
  const keys = key.split('.');
  
  let value = config;
  for (const k of keys) {
    if (value === undefined || value === null || !value.hasOwnProperty(k)) {
      return defaultValue;
    }
    value = value[k];
  }
  
  return value !== undefined ? value : defaultValue;
};

// Asset URL
global.asset = function(path) {
  return `/assets/${path}`;
};

// URL helper
global.url = function(path) {
  path = path.startsWith('/') ? path.substring(1) : path;
  return `/${path}`;
};

// Env variable
global.env = function(key, defaultValue = null) {
  return process.env[key] || defaultValue;
};
