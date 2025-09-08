# Larify

A Laravel-like framework for Node.js Express, designed to provide PHP developers with familiar structure and commands. Larify makes it easy to transition from Laravel to Node.js while maintaining the same development patterns.

## Features

- **MVC Architecture**: Controllers, Models, and Views structured like Laravel
- **Database**: MySQL support with Eloquent-like models and Knex migrations
- **Views**: Handlebars templating with layouts and partials (similar to Blade)
- **Command Line Interface**: Laravel Artisan-like CLI for common tasks
- **Service Providers**: For bootstrapping and extending the framework
- **Request Validation**: Express-validator integration with Laravel-like validation rules
- **Middleware**: Route and global middleware support
- **Authentication**: Built-in user authentication system
- **Session and Flash Messages**: Express-session with connect-flash for notifications
- **Helper Functions**: Global helpers like in Laravel

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/larify.git
   cd larify
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment:

   ```bash
   cp .env.example .env
   # Edit .env with your database details
   ```

4. Run migrations:

   ```bash
   npm run migrate
   ```

5. Start the server:
   ```bash
   npm run serve
   # or for development with auto-reload
   npm run dev
   ```

## Project Structure

```
larify/
├── app/                  # Application logic
│   ├── controllers/      # Request handlers
│   ├── core/             # Framework core classes
│   ├── middleware/       # Route middleware
│   ├── models/           # Data models
│   ├── providers/        # Service providers
│   ├── requests/         # Form requests and validation
│   └── services/         # Business logic
├── bin/                  # CLI commands
│   └── larify.js         # Command line tool
├── config/               # Configuration files
├── database/             # Database files
│   └── migrations/       # Database migrations
├── public/               # Static assets
│   ├── css/              # CSS files
│   ├── js/               # JavaScript files
│   └── images/           # Image files
├── resources/            # Resources
│   ├── assets/           # Pre-compiled assets
│   └── views/            # View templates
│       ├── layouts/      # Layout templates
│       └── partials/     # Partial templates
├── routes/               # Route definitions
│   ├── api.js            # API routes
│   └── web.js            # Web routes
├── storage/              # Storage files
│   └── logs/             # Log files
├── tests/                # Test files
└── utils/                # Helper functions
    └── helpers/          # Global helpers
```

## CLI Commands

Larify comes with a powerful command line interface inspired by Laravel's Artisan:

```bash
# Start the development server
npm run serve

# Database migrations
npm run migrate            # Run pending migrations
npm run migrate:make name  # Create a new migration
npm run migrate:reset      # Rollback all migrations
npm run migrate:fresh      # Drop all tables and re-run migrations

# Generate files
node bin/larify make:controller UserController --resource  # Create a resource controller
node bin/larify make:model User --migration                # Create model with migration
```

## Laravel to Node.js Comparison

| Laravel                                  | Larify                                 |
| ---------------------------------------- | -------------------------------------- |
| Eloquent Models                          | Model class with active record pattern |
| Blade Templates                          | Handlebars with layouts and partials   |
| Route::get('/path', 'Controller@method') | router.get('/path', Controller.method) |
| Middleware                               | Express middleware                     |
| FormRequest                              | Request validation class               |
| Artisan CLI                              | Larify CLI                             |
| Service Providers                        | Service provider classes               |
| Dependency Injection                     | Module exports/imports                 |
| Facades                                  | Global helper functions                |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License
