#!/usr/bin/env node

require('dotenv').config();
const { Command } = require('commander');
const program = new Command();
const knex = require('knex');
const knexConfig = require('../knexfile');
const db = knex(knexConfig[process.env.NODE_ENV || 'development']);
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

program
  .name('larify')
  .description('CLI tool for Larify framework (mimicking Laravel\'s Artisan)')
  .version('1.0.0');

// Make commands (generate files)
program
  .command('make:migration <name>')
  .description('Create a new migration file (like php artisan make:migration)')
  .action((name) => {
    const timestamp = Date.now();
    const filename = `${timestamp}_${name}.js`;
    const filepath = path.join(__dirname, '../database/migrations', filename);
    const template = `exports.up = function(knex) {
  // Create table or modify
  return knex.schema.createTable('table_name', (table) => {
    table.increments('id');
    // Add columns
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  // Rollback
  return knex.schema.dropTable('table_name');
};
`;
    fs.writeFileSync(filepath, template);
    console.log(chalk.green(`✓ Migration created: ${filename}`));
  });

program
  .command('make:controller <name>')
  .description('Create a new controller (like php artisan make:controller)')
  .option('-r, --resource', 'Create a resource controller with CRUD methods')
  .action((name, options) => {
    const filename = `${name}.js`;
    const filepath = path.join(__dirname, '../app/controllers', filename);
    
    let template;
    if (options.resource) {
      template = `const Controller = require('../core/Controller');

class ${name} extends Controller {
  // Display a listing of the resource
  async index(req, res) {
    return this.view(res, 'resource/index');
  }

  // Show the form for creating a new resource
  create(req, res) {
    return this.view(res, 'resource/create');
  }

  // Store a newly created resource
  async store(req, res) {
    // Validate and store
    return this.redirect(res, '/resource');
  }

  // Display the specified resource
  async show(req, res) {
    const id = req.params.id;
    return this.view(res, 'resource/show', { id });
  }

  // Show the form for editing the specified resource
  async edit(req, res) {
    const id = req.params.id;
    return this.view(res, 'resource/edit', { id });
  }

  // Update the specified resource
  async update(req, res) {
    const id = req.params.id;
    // Validate and update
    return this.redirect(res, \`/resource/\${id}\`);
  }

  // Remove the specified resource
  async destroy(req, res) {
    const id = req.params.id;
    // Delete
    return this.redirect(res, '/resource');
  }
}

module.exports = new ${name}();`;
    } else {
      template = `const Controller = require('../core/Controller');

class ${name} extends Controller {
  // Define your controller methods
  index(req, res) {
    return this.view(res, 'index');
  }
}

module.exports = new ${name}();`;
    }
    
    fs.writeFileSync(filepath, template);
    console.log(chalk.green(`✓ Controller created: ${filename}`));
  });

program
  .command('make:model <name>')
  .description('Create a new model (like php artisan make:model)')
  .option('-m, --migration', 'Create a migration file for the model')
  .action((name, options) => {
    // Create model
    const modelFilename = `${name}.js`;
    const modelFilepath = path.join(__dirname, '../app/models', modelFilename);
    
    const modelTemplate = `const Model = require('../core/Model');

class ${name} extends Model {
  static getTable() {
    return '${name.toLowerCase()}s';
  }
}

module.exports = ${name};`;
    
    fs.writeFileSync(modelFilepath, modelTemplate);
    console.log(chalk.green(`✓ Model created: ${modelFilename}`));
    
    // Create migration if requested
    if (options.migration) {
      const timestamp = Date.now();
      const tableName = `${name.toLowerCase()}s`;
      const migrationFilename = `${timestamp}_create_${tableName}_table.js`;
      const migrationFilepath = path.join(__dirname, '../database/migrations', migrationFilename);
      
      const migrationTemplate = `exports.up = function(knex) {
  return knex.schema.createTable('${tableName}', (table) => {
    table.increments('id');
    // Define columns
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('${tableName}');
};`;
      
      fs.writeFileSync(migrationFilepath, migrationTemplate);
      console.log(chalk.green(`✓ Migration created: ${migrationFilename}`));
    }
  });

// Database commands
program
  .command('migrate')
  .description('Run migrations (like php artisan migrate)')
  .action(async () => {
    try {
      await db.migrate.latest();
      console.log(chalk.green('✓ Migrations run successfully'));
    } catch (error) {
      console.error(chalk.red(`✗ Migration failed: ${error.message}`));
    } finally {
      db.destroy();
    }
  });

program
  .command('migrate:reset')
  .description('Reset migrations (like php artisan migrate:reset)')
  .action(async () => {
    try {
      await db.migrate.rollback(null, true);
      console.log(chalk.green('✓ Migrations reset successfully'));
    } catch (error) {
      console.error(chalk.red(`✗ Reset failed: ${error.message}`));
    } finally {
      db.destroy();
    }
  });

program
  .command('migrate:rollback')
  .description('Rollback the last migration batch (like php artisan migrate:rollback)')
  .action(async () => {
    try {
      await db.migrate.rollback();
      console.log(chalk.green('✓ Last migration batch rolled back'));
    } catch (error) {
      console.error(chalk.red(`✗ Rollback failed: ${error.message}`));
    } finally {
      db.destroy();
    }
  });

program
  .command('migrate:fresh')
  .description('Drop all tables and re-run migrations (like php artisan migrate:fresh)')
  .action(async () => {
    try {
      await db.migrate.rollback(null, true);
      await db.migrate.latest();
      console.log(chalk.green('✓ Database refreshed successfully'));
    } catch (error) {
      console.error(chalk.red(`✗ Refresh failed: ${error.message}`));
    } finally {
      db.destroy();
    }
  });

// Server commands
program
  .command('serve')
  .description('Start the development server (like php artisan serve)')
  .option('-p, --port <port>', 'Port to run on', '3000')
  .action((options) => {
    const { spawn } = require('child_process');
    console.log(chalk.green(`Starting development server on port ${options.port}...`));
    
    const server = spawn('node', ['app.js'], {
      env: { ...process.env, PORT: options.port },
      stdio: 'inherit'
    });
    
    server.on('close', (code) => {
      if (code !== 0) {
        console.error(chalk.red(`Server exited with code ${code}`));
      }
    });
  });

// Parse command line arguments
program.parse();
