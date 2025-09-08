const knex = require('knex');
const knexConfig = require('../../knexfile');
const db = knex(knexConfig.development);

class User {
  static async all() {
    return await db('users');
  }

  static async find(id) {
    return await db('users').where({ id }).first();
  }

  static async create(data) {
    return await db('users').insert(data);
  }
}

module.exports = User;
