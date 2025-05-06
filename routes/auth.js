// routes/auth.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Endpoint login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validasi input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email dan password wajib diisi' });
  }

  // Query ke database
  const sql = 'SELECT * FROM pelanggan WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    if (results.length === 0) {
      return res.status(401).json({ error: 'Email atau password salah' });
    }

    // Sukses login
    const user = results[0];
    res.json({
      message: 'Login berhasil',
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email
      }
    });
  });
});

module.exports = router;
