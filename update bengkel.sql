-- DROP DATABASE jika perlu reset
-- DROP DATABASE IF EXISTS bengkel;
CREATE DATABASE IF NOT EXISTS bengkel;
USE bengkel;

-- Tabel Pelanggan
CREATE TABLE IF NOT EXISTS pelanggan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

-- Tabel Layanan
CREATE TABLE IF NOT EXISTS layanan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  kategori VARCHAR(50),
  deskripsi TEXT,
  waktu VARCHAR(20),
  harga INT NOT NULL
);

-- Tabel Keranjang
CREATE TABLE IF NOT EXISTS keranjang (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pelanggan_id INT NOT NULL,
  layanan_id INT NOT NULL,
  FOREIGN KEY (pelanggan_id) REFERENCES pelanggan(id) ON DELETE CASCADE,
  FOREIGN KEY (layanan_id) REFERENCES layanan(id) ON DELETE CASCADE
);

-- Tabel Pesanan
CREATE TABLE IF NOT EXISTS pesanan (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pelanggan_id INT NOT NULL,
  tanggal DATE NOT NULL,
  jam TIME NOT NULL,
  total_harga INT NOT NULL,
  FOREIGN KEY (pelanggan_id) REFERENCES pelanggan(id) ON DELETE CASCADE
);

-- Tabel Pesanan Detail
CREATE TABLE IF NOT EXISTS pesanan_detail (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pesanan_id INT NOT NULL,
  layanan_id INT NOT NULL,
  FOREIGN KEY (pesanan_id) REFERENCES pesanan(id) ON DELETE CASCADE,
  FOREIGN KEY (layanan_id) REFERENCES layanan(id) ON DELETE CASCADE
);

-- Tabel Lucky Spin
CREATE TABLE IF NOT EXISTS lucky_spin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pelanggan_id INT NOT NULL,
  kode_voucher VARCHAR(20),
  nilai INT,
  tanggal DATE,
  FOREIGN KEY (pelanggan_id) REFERENCES pelanggan(id) ON DELETE CASCADE
);

-- Sample Data Layanan
INSERT INTO layanan (nama, kategori, deskripsi, waktu, harga) VALUES
('Ganti Oli', 'Mesin', 'Mengganti oli mesin kendaraan Anda', '30 menit', 75000),
('Servis CVT', 'Transmisi', 'Perawatan dan pembersihan CVT', '45 menit', 150000),
('Tune-up', 'Mesin', 'Pengecekan dan penyetelan mesin', '1 jam', 200000),
('Cuci Motor', 'Eksterior', 'Cuci motor bagian luar dan dalam', '20 menit', 30000);


-- Sample Data Pelanggan (password: 123456)
INSERT INTO pelanggan (nama, email, password) VALUES
('Ahmad', 'ahmad@example.com', '$2b$10$sJTozUUpW0PKBGVXgZKKOebY5B4aDkkZD1oNDpQkPoCr7SkP8j.L6');
