const express = require('express');
const router = express.Router();
const db = require('../db');

// Buat pesanan baru
router.post('/', (req, res) => {
  const { pelanggan_id, layanan_ids, tanggal, waktu } = req.body;

  if (!pelanggan_id || !layanan_ids || !tanggal || !waktu) {
    return res.status(400).json({ error: 'Semua data wajib diisi' });
  }

  // Simpan ke tabel pesanan
  const sqlPesanan = 'INSERT INTO pesanan (pelanggan_id, tanggal, waktu) VALUES (?, ?, ?)';
  db.query(sqlPesanan, [pelanggan_id, tanggal, waktu], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    const pesananId = result.insertId;

    // Simpan ke tabel pesanan_detail
    const sqlDetail = 'INSERT INTO pesanan_detail (pesanan_id, layanan_id) VALUES ?';
    const values = layanan_ids.map(id => [pesananId, id]);

    db.query(sqlDetail, [values], (err2) => {
      if (err2) return res.status(500).json({ error: err2.message });

      res.json({ message: 'Pesanan berhasil dibuat', pesanan_id: pesananId });
    });
  });
});

// Ambil riwayat pesanan berdasarkan pelanggan
router.get('/riwayat/:pelanggan_id', (req, res) => {
  const { pelanggan_id } = req.params;

  const sql = `
    SELECT p.id as pesanan_id, p.tanggal, p.waktu, l.nama, l.harga
    FROM pesanan p
    JOIN pesanan_detail pd ON p.id = pd.pesanan_id
    JOIN layanan l ON pd.layanan_id = l.id
    WHERE p.pelanggan_id = ?
    ORDER BY p.tanggal DESC
  `;

  db.query(sql, [pelanggan_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


module.exports = router;
