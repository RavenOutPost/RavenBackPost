const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

// app.use(cors({ origin: 'http://ton-site-frontend.com' }));

app.get('/api', (req, res) => {
  res.json({ message: 'CORS configuré!' });
});

app.listen(3000, () => {
  console.log('API running on http://localhost:3000');
});
