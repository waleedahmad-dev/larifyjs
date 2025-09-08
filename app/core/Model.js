// Base model class with active record pattern (similar to Laravel's Eloquent)
class Model {
  constructor() {
    this.table = this.constructor.getTable();
    this.primaryKey = 'id';
    this.attributes = {};
    this.original = {};
    this.relations = {};
  }

  // Get database instance
  static get db() {
    return global.DB;
  }

  // Get model table name (e.g., User -> users)
  static getTable() {
    return this.constructor.name.toLowerCase() + 's';
  }

  // Create a new query builder for this model
  static query() {
    return this.db(this.getTable());
  }

  // Find a record by primary key
  static async find(id) {
    const data = await this.query().where({ [this.primaryKey]: id }).first();
    if (!data) return null;
    
    const model = new this();
    model.fill(data);
    model.syncOriginal();
    return model;
  }

  // Get all records
  static async all() {
    const data = await this.query();
    return data.map(item => {
      const model = new this();
      model.fill(item);
      model.syncOriginal();
      return model;
    });
  }

  // Create a new record
  static async create(data) {
    const [id] = await this.query().insert(data);
    return this.find(id);
  }

  // Fill model with attributes
  fill(data) {
    this.attributes = { ...this.attributes, ...data };
    return this;
  }

  // Sync original attributes
  syncOriginal() {
    this.original = { ...this.attributes };
    return this;
  }

  // Get an attribute
  get(key) {
    return this.attributes[key];
  }

  // Set an attribute
  set(key, value) {
    this.attributes[key] = value;
    return this;
  }

  // Save the model to the database
  async save() {
    if (this.get(this.primaryKey)) {
      // Update existing record
      await this.constructor.query()
        .where({ [this.primaryKey]: this.get(this.primaryKey) })
        .update(this.attributes);
    } else {
      // Insert new record
      const [id] = await this.constructor.query().insert(this.attributes);
      this.set(this.primaryKey, id);
    }
    
    this.syncOriginal();
    return this;
  }

  // Delete the model
  async delete() {
    if (!this.get(this.primaryKey)) return false;
    
    await this.constructor.query()
      .where({ [this.primaryKey]: this.get(this.primaryKey) })
      .del();
      
    return true;
  }

  // Define a relationship (e.g., belongsTo, hasMany)
  relate(relation, models) {
    this.relations[relation] = Array.isArray(models) ? models : [models];
    return this;
  }

  // Convert to plain object
  toJSON() {
    return {
      ...this.attributes,
      ...this.relations
    };
  }
}

module.exports = Model;
