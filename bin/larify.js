#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

program
  .name('larify')
  .description('CLI tool for Larify framework (mimicking Laravel\'s Artisan)')
  .version('1.0.0');

program
  .command('make:migration <name>')
  .description('Create a new migration file (like php artisan make:migration)')
  .action((name) => {
    const fs = require('fs');
    const path = require('path');
    const timestamp = Date.now();
    const filename = `${timestamp}_${name}.js`;
    const filepath = path.join(__dirname, '../database/migrations', filename);
    const template = `exports.up = function(knex) {
  // Create table or modify
};

exports.down = function(knex) {
  // Rollback
};
`;
    fs.writeFileSync(filepath, template);
    console.log(`Migration created: ${filename}`);
  });

program
  .command('migrate')
  .description('Run migrations (like php artisan migrate)')
  .action(async () => {
    try {
      await db.migrate.latest();
      console.log('Migrations run successfully');
    } catch (error) {
      console.error('Migration failed:', error);
    } finally {
      db.destroy();
    }
  });

program
  .command('migrate:reset')
  .description('Reset migrations (like php artisan migrate:reset)')
  .action(async () => {
    try {
      await db.migrate.rollback();
      console.log('Migrations reset successfully');
    } catch (error) {
      console.error('Reset failed:', error);
    } finally {
      db.destroy();
    }
  });

program.parse();
