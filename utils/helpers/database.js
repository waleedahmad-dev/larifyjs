// Database helper functions (similar to Laravel's DB facade)

// Raw SQL query
global.raw = function(sql, bindings = []) {
  return global.DB.raw(sql, bindings);
};

// Transaction
global.transaction = async function(callback) {
  return await global.DB.transaction(callback);
};
