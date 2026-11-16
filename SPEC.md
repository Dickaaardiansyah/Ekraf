# SPEC.md — LintasRoda

## 1. Tujuan
LintasRoda adalah aplikasi web katalog rental motor harian dan mingguan (matic, bebek, sport, trail) dengan dashboard pengelolaan armada sederhana. Aplikasi dibuat sebagai latihan pengembangan selama satu hari, berjalan sepenuhnya di browser tanpa backend dan tanpa autentikasi.

Tujuan MVP:
- Menampilkan armada motor dengan informasi yang mudah dipahami calon penyewa.
- Menghitung perkiraan total sewa berdasarkan tarif per hari dan lama sewa.
- Membantu pengelola melihat ringkasan armada dan mengelola data motor.
- Menyediakan jalur pemesanan melalui WhatsApp.
- Mempertahankan perubahan data pada perangkat/browser melalui `localStorage`.

## 2. Pengguna
1. **Calon penyewa** — melihat katalog, mencari motor, memfilter jenis, mengurutkan, mengatur lama sewa, dan menghubungi rental melalui WhatsApp.
2. **Pengelola rental** — melihat ringkasan armada, menambah motor, mengubah motor, dan menghapus motor.

Kedua peran menggunakan perangkat dan halaman yang sama. Navigasi katalog/dashboard bukan sistem hak akses; dashboard merupakan area demo yang dapat dibuka siapa pun pada perangkat tersebut.

## 3. Daftar fitur MVP
### Katalog
- Menampilkan 8 motor contoh saat aplikasi pertama kali dibuka.
- Kartu motor berisi placeholder ikon lokal, nama, jenis, kapasitas mesin (cc), tarif per hari, total untuk lama sewa terpilih, jumlah unit tersedia, deskripsi singkat, dan penanda pilihan kami.
- Pencarian berdasarkan nama, deskripsi, dan jenis motor.
- Filter jenis (chip): Semua, Matic, Bebek, Sport, Trail (mengikuti data).
- Sorting: pilihan kami (default), nama A–Z, harga terendah, harga tertinggi, dan unit terbanyak.
- **Lama sewa:** input angka 1–30 hari (default 1). Total pada tiap kartu = tarif per hari × lama sewa.
- Tombol sewa WhatsApp dengan pesan awal berisi nama motor dan lama sewa. Nomor WhatsApp rental disimpan sebagai konstanta konfigurasi pada JavaScript dan harus diganti sebelum penggunaan nyata.
- Motor dengan unit 0 ditampilkan sebagai "Sedang disewa" dengan tombol nonaktif "Belum tersedia".
- Syarat sewa (KTP dan SIM C yang berlaku) tampil pada footer dan pada langkah ketiga bagian Cara sewa.

### Dashboard pengelola
- Ringkasan total model motor, total unit tersedia, jumlah model dengan unit menipis (unit ≤ 1), dan potensi sewa per hari (jumlah tarif × unit seluruh motor).
- Daftar motor untuk dikelola.
- CRUD demo: tambah, edit, dan hapus motor.
- Validasi nama wajib diisi; tarif harus angka >= 0; unit harus integer >= 0; mesin (cc) opsional.
- Perubahan disimpan ke `localStorage` dan dimuat kembali saat halaman dibuka ulang.

### Penyimpanan
- Key `lintasroda_motor_v1` pada `localStorage`.
- Seed 8 motor hanya digunakan ketika key belum memiliki data valid.
- Tombol reset data demo mengembalikan seed awal.

## 4. Data model
Satu objek motor memiliki struktur:

| Field | Tipe | Aturan |
|---|---|---|
| `id` | string | Unik dan stabil |
| `nama` | string | Wajib, tidak boleh kosong |
| `kategori` | string | Wajib: Matic, Bebek, Sport, atau Trail |
| `cc` | integer | Opsional; kapasitas mesin. Kosong disimpan sebagai `0` dan tidak ditampilkan |
| `harga` | number | Tarif per hari (Rupiah), angka >= 0, disimpan sebagai angka |
| `stok` | integer | Jumlah unit tersedia, bilangan bulat >= 0 |
| `deskripsi` | string | Teks singkat |
| `imageUrl` | string | Path/URL lokal; MVP menggunakan placeholder emoji lokal (`local:🛵` atau `local:🏍️`) |
| `unggulan` | boolean | Penanda pilihan kami |

Contoh:
```json
{
  "id": "mt-001",
  "nama": "Honda Vario 160",
  "kategori": "Matic",
  "cc": 160,
  "harga": 120000,
  "stok": 6,
  "deskripsi": "Matic irit dan nyaman untuk keliling kota, bagasi luas.",
  "imageUrl": "local:🛵",
  "unggulan": true
}
```

### Seed 8 motor
| ID | Nama | Jenis | cc | Tarif/hari | Unit | Pilihan |
|---|---|---|---:|---:|---:|:---:|
| mt-001 | Honda Vario 160 | Matic | 160 | 120.000 | 6 | Ya |
| mt-002 | Yamaha NMAX 155 | Matic | 155 | 180.000 | 3 | Ya |
| mt-003 | Honda Scoopy | Matic | 110 | 90.000 | 8 | Tidak |
| mt-004 | Honda Supra X 125 | Bebek | 125 | 75.000 | 5 | Tidak |
| mt-005 | Kawasaki KLX 150 | Trail | 150 | 200.000 | 2 | Ya |
| mt-006 | Honda CRF 150L | Trail | 150 | 220.000 | 1 | Tidak |
| mt-007 | Yamaha R15 | Sport | 155 | 250.000 | 2 | Tidak |
| mt-008 | Kawasaki Ninja 250 | Sport | 250 | 400.000 | 0 | Tidak |

Ringkasan seed: 8 model, total 27 unit, 4 jenis, 2 model unit menipis (CRF 150L dan Ninja 250), potensi sewa per hari Rp3.475.000.

## 5. Nonfunctional requirements
- **Kompatibilitas:** berjalan pada browser modern berbasis Chromium, Firefox, dan Safari.
- **Responsif:** nyaman digunakan pada desktop dan layar ponsel.
- **Performa:** tidak memerlukan build server saat prototype single-file dibuka; interaksi utama berjalan lokal.
- **Animasi:** animasi hero, kartu, dan modal ringan (CSS/JS tanpa library) dan wajib nonaktif saat `prefers-reduced-motion: reduce`. Tidak ada informasi penting yang hanya tersampaikan lewat animasi.
- **Aksesibilitas dasar:** label input jelas, tombol memiliki teks yang bermakna, fokus keyboard terlihat, dan kontras teks memadai.
- **Keamanan:** tidak ada backend, API key, kredensial, atau autentikasi palsu. Teks input ditampilkan dengan aman (hindari injeksi HTML).
- **Privasi:** data contoh nonpribadi; data motor tersimpan hanya pada browser/perangkat yang digunakan. Aplikasi tidak menyimpan data KTP/SIM penyewa.
- **Ketahanan data:** penanganan kondisi `localStorage` tidak tersedia/berisi JSON rusak dengan fallback seed yang aman.
- **Aset:** gunakan placeholder CSS/emoji atau aset buatan sendiri; jangan mengambil gambar berhak cipta.

## 6. Risiko dan mitigasi
| Risiko | Dampak | Mitigasi |
|---|---|---|
| Data `localStorage` dihapus browser | Perubahan data motor hilang | Jelaskan penyimpanan bersifat lokal; sediakan reset demo |
| Dibuka di perangkat/browser berbeda | Data tidak tersinkron | Tegaskan tidak ada backend/sinkronisasi |
| Nomor WhatsApp belum diganti | Tombol sewa salah tujuan | Tandai konstanta nomor dan instruksi konfigurasi |
| Input tarif/unit tidak valid | Data tidak konsisten | Validasi di form dan sebelum penyimpanan |
| Ikon dianggap foto unit | Ekspektasi visual keliru | Gunakan ikon/placeholder, bukan foto palsu; jangan mengklaim warna, tahun, atau kondisi spesifik unit |
| Jumlah unit diubah manual, bukan real-time | Unit tampil tersedia padahal sudah disewa (dobel sewa) | Pesan WhatsApp menanyakan ketersediaan; pengelola mengonfirmasi sebelum menyepakati sewa |
| Klaim layanan pada teks contoh (helm, jas hujan, antar jemput, servis rutin) belum tentu sesuai | Salah paham layanan | Tandai sebagai teks contoh; pemilik wajib menyesuaikan sebelum penggunaan nyata |
| Rental nyata terkait izin usaha, perjanjian sewa, deposit, asuransi, dan tanggung jawab kecelakaan/kehilangan | Masalah hukum atau sengketa | Catat sebagai hal yang perlu dicek pemilik sebelum penggunaan nyata; aplikasi ini tidak memberi saran hukum |
| Dibuka melalui `file://` pada browser tertentu | Perilaku penyimpanan dapat berbeda | Uji pada browser target; untuk Vite jalankan development server |

## 7. Out of scope
- Backend, database server, sinkronisasi antarperangkat.
- Login, registrasi, role-based access control, dan keamanan akun.
- Pembayaran online, deposit online, checkout, dan pelacakan pesanan.
- Kalender booking, pemilihan tanggal sewa, dan deteksi bentrok jadwal.
- Verifikasi atau penyimpanan KTP/SIM penyewa, kontrak digital, dan asuransi.
- Pelacakan GPS unit, manajemen servis, dan pencatatan kerusakan.
- Integrasi WhatsApp Business API; tombol hanya membuka tautan `wa.me`.
- Upload dan hosting gambar motor.
- Harga dinamis (musiman, diskon, tarif mingguan/bulanan otomatis).
- Laporan transaksi dan akuntansi, manajemen pelanggan, dan multi-cabang.
- Deployment produksi dan domain publik.

## 8. Acceptance criteria (pemeriksaan manual)
1. Saat pertama dibuka, katalog menampilkan tepat 8 motor contoh.
2. Setiap kartu menampilkan nama, jenis, cc (bila ada), tarif per hari berformat Rupiah, total untuk lama sewa, jumlah unit, dan deskripsi.
3. Motor pilihan memiliki penanda visual yang terlihat.
4. Ketik kata yang cocok (misalnya "vario" atau "trail") pada pencarian; daftar hanya menampilkan motor yang cocok pada nama/deskripsi/jenis. Hapus kata kunci; seluruh motor kembali.
5. Pilih jenis; hanya motor pada jenis tersebut yang tampil. Pilih "Semua"; filter terhapus.
6. Ubah sorting ke nama A–Z, harga termurah/termahal, dan unit terbanyak; urutan berubah sesuai pilihan.
7. Ubah lama sewa; total pada seluruh kartu berubah menjadi tarif × hari. Nilai di bawah 1 atau kosong dibaca sebagai 1, nilai di atas 30 dibaca sebagai 30.
8. Klik tombol WhatsApp; browser membuka tautan WhatsApp dengan pesan awal yang menyebut motor terpilih dan lama sewa. Nomor tujuan mengikuti konfigurasi. Motor dengan unit 0 menampilkan "Belum tersedia" tanpa tombol sewa aktif.
9. Dashboard menampilkan total model, total unit, jumlah model unit menipis (≤ 1), dan potensi sewa per hari (seed: 8, 27, 2, Rp3.475.000).
10. Tambahkan motor valid; motor baru muncul di katalog dan dashboard, serta ringkasan diperbarui.
11. Coba menyimpan nama kosong, tarif negatif, unit negatif, atau unit pecahan; form menolak input dan menampilkan validasi.
12. Edit motor; perubahan nama/tarif/unit/jenis terlihat pada katalog dan dashboard.
13. Hapus motor; motor hilang dari katalog dan dashboard setelah konfirmasi.
14. Muat ulang halaman; perubahan CRUD tetap ada karena tersimpan di `localStorage`.
15. Klik reset demo; data kembali ke 8 motor awal.
16. Uji tampilan desktop dan lebar ponsel; navigasi, kartu, form, dan kontrol tetap dapat digunakan tanpa scroll horizontal yang tidak perlu.
17. Animasi hero (motor melaju, judul muncul bertahap, angka berhitung) berjalan; dengan pengaturan reduced motion aktif, seluruh animasi berhenti dan konten tetap terlihat lengkap.
18. Syarat sewa (KTP dan SIM C) terlihat pada footer dan pada bagian Cara sewa.

## 9. Implementation plan per iterasi
### Iterasi 1 — Fondasi (±45 menit)
- Buat struktur Vite + JavaScript vanilla.
- Siapkan layout responsif, navigasi katalog/dashboard, sistem warna, dan komponen kartu.
- Buat seed data 8 motor dan placeholder lokal.

### Iterasi 2 — Katalog (±60 menit)
- Render katalog dan format harga Rupiah.
- Implementasikan pencarian, filter jenis, sorting, kalkulator lama sewa, dan tombol WhatsApp.
- Uji kondisi hasil pencarian kosong dan unit habis.

### Iterasi 3 — Dashboard & CRUD (±90 menit)
- Buat kartu ringkasan.
- Buat form tambah/edit, validasi, konfirmasi hapus, dan daftar pengelolaan.
- Sinkronkan perubahan ke tampilan katalog.

### Iterasi 4 — Persistensi, animasi & pengujian (±60 menit)
- Implementasikan load/save `localStorage`, fallback data, dan reset demo.
- Tambahkan animasi hero, kartu, dan modal beserta dukungan reduced motion.
- Jalankan seluruh acceptance criteria secara manual.
- Periksa responsivitas, aksesibilitas dasar, serta konsol browser.

### Iterasi 5 — Finalisasi (±20 menit)
- Rapikan teks, empty state, dan dokumentasi konfigurasi nomor WhatsApp.
- Pastikan tidak ada API key, aset eksternal berhak cipta, atau fitur backend terselubung.