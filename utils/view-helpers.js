// View helpers (similar to Laravel's Blade helpers)
module.exports = {
  // Get config value (similar to Laravel's config() helper)
  config: function(key, defaultValue = null) {
    try {
      const config = require('../config');
      const keys = key.split('.');
      
      let value = config;
      for (const k of keys) {
        if (value === undefined || value === null || !Object.prototype.hasOwnProperty.call(value, k)) {
          return defaultValue;
        }
        value = value[k];
      }
      
      return value !== undefined ? value : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  },
  
  // Format date
  formatDate: function(date, format) {
    const d = new Date(date);
    return d.toLocaleDateString();
  },
  
  // Check if value equals comparison
  eq: function(value, comparison) {
    return value === comparison;
  },
  
  // Not equal
  ne: function(value, comparison) {
    return value !== comparison;
  },
  
  // If condition with block content
  ifCond: function(v1, operator, v2, options) {
    switch (operator) {
      case '==': return (v1 == v2) ? options.fn(this) : options.inverse(this);
      case '===': return (v1 === v2) ? options.fn(this) : options.inverse(this);
      case '!=': return (v1 != v2) ? options.fn(this) : options.inverse(this);
      case '!==': return (v1 !== v2) ? options.fn(this) : options.inverse(this);
      case '<': return (v1 < v2) ? options.fn(this) : options.inverse(this);
      case '<=': return (v1 <= v2) ? options.fn(this) : options.inverse(this);
      case '>': return (v1 > v2) ? options.fn(this) : options.inverse(this);
      case '>=': return (v1 >= v2) ? options.fn(this) : options.inverse(this);
      case '&&': return (v1 && v2) ? options.fn(this) : options.inverse(this);
      case '||': return (v1 || v2) ? options.fn(this) : options.inverse(this);
      default: return options.inverse(this);
    }
  }
};
