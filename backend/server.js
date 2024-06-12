const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const mariadb = require('mariadb');
const path = require('path'); // Add path module

// Create a session store
const memoryStore = new session.MemoryStore();

// Load Keycloak configuration
const keycloakConfig = require('./keycloak.json'); // Adjust path if needed

// Configure Keycloak
const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig); // Pass keycloakConfig here

// Create Express app
const app = express();

// Use session
app.use(session({
  secret: 'mySecret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

// Use Keycloak middleware
app.use(keycloak.middleware());

// Database connection pool
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Unprotected route
app.get('/', (req, res) => {
  res.send('Hello, this is an unprotected route!');
});

// Protected route
app.get('/protected', keycloak.protect(), (req, res) => {
  res.send('This is a protected route. You are authenticated!');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
