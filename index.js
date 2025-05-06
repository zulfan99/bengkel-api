const express = require('express');
const app = express();
require('dotenv').config();

const layananRoute = require('./routes/layanan');

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Bengkel API is running!');
});
app.use('/api/layanan', layananRoute);

// Global error handler (opsional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
