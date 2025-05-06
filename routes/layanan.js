const express = require('express');
const router = express.Router();
const db = require('../db');

// GET semua layanan
router.get('/', (req, res) => {
  db.query('SELECT * FROM layanan', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ✅ Tambahkan ini sebelum module.exports
router.get('/search', (req, res) => {
  const { nama, kategori } = req.query;
  let sql = 'SELECT * FROM layanan WHERE 1=1';
  const params = [];

  if (nama) {
    sql += ' AND nama LIKE ?';
    params.push(`%${nama}%`);
  }

  if (kategori) {
    sql += ' AND kategori = ?';
    params.push(kategori);
  }

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ✅ Di paling akhir
module.exports = router;
