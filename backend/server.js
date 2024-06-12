const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const mariadb = require('mariadb');

// Create a session store
const memoryStore = new session.MemoryStore();

// Configure Keycloak
const keycloak = new Keycloak({ store: memoryStore });

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
  host: 'mariadb', 
  user: 'root', 
  password: 'password', 
  database: 'test'
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
