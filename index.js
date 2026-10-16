const express = require('express');
const os = require('os');

const app = express();

// Health check used by the pipeline (smoke test, integration test, DAST)
app.get('/live', (req, res) => res.json({ status: 'live' }));

app.get('/hello', (req, res) => res.json({ message: 'Hello from Dasher!' }));

// Shows which environment / pod answered (useful once deployed)
app.get('/os', (req, res) =>
  res.json({ host: os.hostname(), env: process.env.APP_ENV || 'local' })
);

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Dasher app listening on port ${port}`));
}

module.exports = app;
