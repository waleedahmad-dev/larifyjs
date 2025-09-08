# Larify

A Laravel-like framework for Node.js Express, designed to provide PHP developers with familiar structure and commands.

## Features

- MVC architecture similar to Laravel
- MySQL database with Knex migrations
- Handlebars templating with partials
- CLI tool for migrations and other commands
- ESLint for code quality

## Installation

1. Clone the repository
2. Run `npm install`
3. Copy `.env.example` to `.env` and configure your database
4. Run migrations: `npm run migrate`
5. Start the server: `npm run dev`

## Structure

- `app/` - Application logic (controllers, models, middleware, services)
- `config/` - Configuration files
- `database/` - Migrations
- `public/` - Static assets
- `resources/` - Views and assets
- `routes/` - Route definitions
- `storage/` - Logs and cache
- `tests/` - Test files
- `utils/` - Helper functions

## CLI Commands

- `npm run migrate:make <name>` - Create a new migration
- `npm run migrate` - Run migrations
- `npm run migrate:reset` - Reset migrations

## Contributing

Contributions are welcome! Please read the contributing guidelines.

## License

MIT
