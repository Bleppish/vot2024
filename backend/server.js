const express = require('express');
const mariadb = require('mariadb');
const app = express();
const port = 3000;

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5
});

app.get('/', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const rows = await connection.query("SELECT 1 as val");
    res.send(rows);
    connection.end();
  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
