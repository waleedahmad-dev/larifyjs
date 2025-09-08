const Model = require('../core/Model');
const bcrypt = require('bcryptjs');

class User extends Model {
  static getTable() {
    return 'users';
  }

  // Hide password from JSON output
  toJSON() {
    const json = super.toJSON();
    delete json.password;
    return json;
  }

  // Set password with hashing
  async setPassword(password) {
    const salt = await bcrypt.genSalt(10);
    this.set('password', await bcrypt.hash(password, salt));
    return this;
  }

  // Verify password
  async verifyPassword(password) {
    return await bcrypt.compare(password, this.get('password'));
  }

  // Define relationships
  posts() {
    return this.hasMany('Post');
  }

  // Relationship helper methods
  hasMany(modelName) {
    const ModelClass = require(`./${modelName}`);
    return ModelClass.query().where({ user_id: this.get('id') });
  }
}

module.exports = User;
