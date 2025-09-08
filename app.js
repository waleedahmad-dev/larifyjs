require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();

// Set up Handlebars (mimicking Laravel's Blade with server-side rendering for familiarity)
app.engine('hbs', exphbs.engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'resources/views/layouts'),
  partialsDir: path.join(__dirname, 'resources/views/partials')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Middleware for parsing requests (similar to Laravel's global middleware)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes (organized like Laravel's route files)
const webRoutes = require('./routes/web');
app.use('/', webRoutes);

// Start server (optimized for development with environment variables)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Larify server running on port ${PORT}`);
});
