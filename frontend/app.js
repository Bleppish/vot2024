const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello from Frontend');
});

app.listen(port, () => {
  console.log(`Frontend listening at http://localhost:${port}`);
});
