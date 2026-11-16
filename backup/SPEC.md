# SPEC.md — PusakaJawa

## 1. Tujuan
PusakaJawa adalah aplikasi web katalog produk UMKM busana dan senjata tradisional Jawa (keris, tombak, beskap, batik, blangkon, dan perlengkapan adat) dengan dashboard pengelolaan sederhana. Aplikasi dibuat sebagai latihan pengembangan selama satu hari, berjalan sepenuhnya di browser tanpa backend dan tanpa autentikasi.

Tujuan MVP:
- Menampilkan produk UMKM dengan informasi yang mudah dipahami calon client.
- Membantu pengelola melihat ringkasan inventaris dan mengelola data produk.
- Menyediakan jalur pemesanan melalui WhatsApp.
- Mempertahankan perubahan data pada perangkat/browser melalui `localStorage`.

## 2. Pengguna
1. **Calon client** — melihat katalog, mencari produk, memfilter kategori, mengurutkan produk, dan menghubungi toko melalui WhatsApp.
2. **Pengelola toko** — melihat ringkasan produk dan stok, menambah produk, mengubah produk, serta menghapus produk.

Kedua peran menggunakan perangkat dan halaman yang sama. Navigasi katalog/dashboard bukan sistem hak akses; dashboard merupakan area demo yang dapat dibuka siapa pun pada perangkat tersebut.

## 3. Daftar fitur MVP
### Katalog
- Menampilkan 8 produk contoh saat aplikasi pertama kali dibuka.
- Kartu produk berisi placeholder gambar lokal, nama, kategori, asal daerah, harga Rupiah, stok, deskripsi singkat, dan penanda koleksi pilihan.
- Pencarian berdasarkan nama, deskripsi, dan asal daerah.
- Filter kategori.
- Sorting: pilihan kami (default), nama A–Z, harga terendah, harga tertinggi, dan stok terbanyak.
- Tombol pesan WhatsApp dengan pesan awal berisi nama produk. Nomor WhatsApp toko disimpan sebagai konstanta konfigurasi pada JavaScript dan harus diganti sebelum penggunaan nyata.
- Produk senjata ditampilkan sebagai replika dan koleksi budaya; catatan ini tampil di hero dan footer.

### Dashboard pengelola
- Ringkasan total produk, total stok, jumlah produk dengan stok menipis (stok ≤ 3), dan nilai persediaan (jumlah harga × stok seluruh produk).
- Daftar produk untuk dikelola.
- CRUD demo: tambah, edit, dan hapus produk.
- Validasi nama wajib diisi; harga harus angka >= 0; stok harus integer >= 0.
- Perubahan disimpan ke `localStorage` dan dimuat kembali saat halaman dibuka ulang.

### Penyimpanan
- Key `pusakajawa_products_v1` pada `localStorage`.
- Seed 8 produk hanya digunakan ketika key belum memiliki data valid.
- Tombol reset data demo mengembalikan seed awal.

## 4. Data model
Satu objek produk memiliki struktur:

| Field | Tipe | Aturan |
|---|---|---|
| `id` | string | Unik dan stabil |
| `nama` | string | Wajib, tidak boleh kosong |
| `kategori` | string | Wajib: Senjata, Pakaian, atau Aksesori |
| `asal` | string | Opsional, asal daerah perajin atau gaya (misalnya Surakarta, Yogyakarta, Madura) |
| `harga` | number | Angka >= 0, disimpan sebagai angka |
| `stok` | integer | Bilangan bulat >= 0 |
| `deskripsi` | string | Teks singkat |
| `imageUrl` | string | URL data lokal atau path aset lokal; MVP menggunakan placeholder emoji lokal (`local:🗡️`) |
| `unggulan` | boolean | Penanda koleksi pilihan |

Contoh:
```json
{
  "id": "pj-001",
  "nama": "Keris Luk 7 Surakarta",
  "kategori": "Senjata",
  "asal": "Surakarta",
  "harga": 850000,
  "stok": 5,
  "deskripsi": "Keris replika dengan bilah luk tujuh dan pamor beras wutah.",
  "imageUrl": "local:🗡️",
  "unggulan": true
}
```

### Seed 8 produk
| ID | Nama | Kategori | Asal | Harga | Stok | Pilihan |
|---|---|---|---|---:|---:|:---:|
| pj-001 | Keris Luk 7 Surakarta | Senjata | Surakarta | 850.000 | 5 | Ya |
| pj-002 | Keris Sengkelat Luk 13 | Senjata | Yogyakarta | 1.250.000 | 3 | Ya |
| pj-003 | Tombak Hias Trisula | Senjata | Madura | 650.000 | 4 | Tidak |
| pj-004 | Warangka Ladrang Jati | Aksesori | Surakarta | 300.000 | 9 | Tidak |
| pj-005 | Beskap Jawa Hitam Lengkap | Pakaian | Yogyakarta | 475.000 | 10 | Ya |
| pj-006 | Kain Batik Tulis Parang Rusak | Pakaian | Solo | 320.000 | 14 | Tidak |
| pj-007 | Blangkon Surakarta Mondolan | Aksesori | Surakarta | 95.000 | 22 | Tidak |
| pj-008 | Kebaya Kutubaru Lurik | Pakaian | Klaten | 380.000 | 0 | Tidak |

Ringkasan seed: total stok 67, 3 kategori, 2 produk stok menipis (Keris Sengkelat dan Kebaya Kutubaru), nilai persediaan Rp24.620.000.

## 5. Nonfunctional requirements
- **Kompatibilitas:** berjalan pada browser modern berbasis Chromium, Firefox, dan Safari.
- **Responsif:** nyaman digunakan pada desktop dan layar ponsel.
- **Performa:** tidak memerlukan build server saat prototype single-file dibuka; interaksi utama berjalan lokal.
- **Aksesibilitas dasar:** label input jelas, tombol memiliki teks yang bermakna, fokus keyboard terlihat, dan kontras teks memadai.
- **Keamanan:** tidak ada backend, API key, kredensial, atau autentikasi palsu. Teks input ditampilkan dengan aman (hindari injeksi HTML).
- **Privasi:** data contoh nonpribadi; data produk tersimpan hanya pada browser/perangkat yang digunakan.
- **Ketahanan data:** penanganan kondisi `localStorage` tidak tersedia/berisi JSON rusak dengan fallback seed yang aman.
- **Aset:** gunakan placeholder CSS/emoji atau aset buatan sendiri; jangan mengambil gambar berhak cipta.

## 6. Risiko dan mitigasi
| Risiko | Dampak | Mitigasi |
|---|---|---|
| Data `localStorage` dihapus browser | Perubahan produk hilang | Jelaskan penyimpanan bersifat lokal; sediakan reset demo |
| Dibuka di perangkat/browser berbeda | Data tidak tersinkron | Tegaskan tidak ada backend/sinkronisasi |
| Nomor WhatsApp belum diganti | Tombol pesan salah tujuan | Tandai konstanta nomor toko dan instruksi konfigurasi |
| Input harga/stok tidak valid | Data tidak konsisten | Validasi di form dan sebelum penyimpanan |
| Placeholder dianggap foto produk | Ekspektasi visual keliru | Gunakan ilustrasi/placeholder berlabel, bukan foto palsu |
| Produk senjata dianggap pusaka asli atau barang bersejarah | Salah paham klaim keaslian dan nilai | Tampilkan label "replika dan koleksi budaya"; jangan mengklaim usia, tuah, atau keaslian pusaka |
| Penjualan senjata tradisional nyata terkena aturan setempat (penjualan, pengiriman) | Masalah hukum bagi toko | Catat sebagai hal yang perlu dicek pemilik toko sebelum penggunaan nyata; aplikasi ini tidak memberi saran hukum |
| Dibuka melalui `file://` pada browser tertentu | Perilaku penyimpanan dapat berbeda | Uji pada browser target; untuk Vite jalankan development server |

## 7. Out of scope
- Backend, database server, sinkronisasi antarperangkat.
- Login, registrasi, role-based access control, dan keamanan akun.
- Pembayaran online, checkout, ongkir, keranjang, dan pelacakan pesanan.
- Integrasi WhatsApp Business API; tombol hanya membuka tautan `wa.me`.
- Upload dan hosting gambar produk.
- Sertifikasi keaslian, penilaian usia, atau penetapan nilai pusaka.
- Laporan penjualan, transaksi, pembelian, dan akuntansi.
- Manajemen pemasok, pelanggan, diskon kompleks, dan multi-cabang.
- Deployment produksi dan domain publik.

## 8. Acceptance criteria (pemeriksaan manual)
1. Saat pertama dibuka, katalog menampilkan tepat 8 produk contoh.
2. Setiap kartu menampilkan nama, kategori, asal, harga dengan format Rupiah, stok, dan deskripsi.
3. Produk pilihan memiliki penanda visual yang terlihat.
4. Ketik kata yang cocok (misalnya "keris" atau "Surakarta") pada pencarian; daftar hanya menampilkan produk yang cocok pada nama/deskripsi/asal. Hapus kata kunci; seluruh produk kembali.
5. Pilih kategori; hanya produk dalam kategori tersebut yang tampil. Pilih “Semua kategori”; filter terhapus.
6. Ubah sorting ke nama A–Z, harga termurah/termahal, dan stok terbanyak; urutan produk berubah sesuai pilihan.
7. Klik tombol WhatsApp; browser membuka tautan WhatsApp dengan pesan awal yang menyebut produk terpilih. Nomor tujuan mengikuti konfigurasi. Produk stok 0 menampilkan "Stok habis" tanpa tombol pesan aktif.
8. Dashboard menampilkan total produk, total stok, jumlah produk stok menipis (≤ 3), dan nilai persediaan.
9. Tambahkan produk valid; produk baru muncul di katalog dan dashboard, serta total ringkasan diperbarui.
10. Coba menyimpan nama kosong, harga negatif, stok negatif, atau stok pecahan; form menolak input dan menampilkan validasi.
11. Edit produk; perubahan nama/harga/stok/asal terlihat pada katalog dan dashboard.
12. Hapus produk; produk hilang dari katalog dan dashboard setelah konfirmasi.
13. Muat ulang halaman; perubahan CRUD tetap ada karena tersimpan di `localStorage`.
14. Klik reset demo; data kembali ke 8 produk awal.
15. Uji tampilan desktop dan lebar ponsel; navigasi, kartu, form, dan kontrol tetap dapat digunakan tanpa scroll horizontal yang tidak perlu.
16. Label "replika dan koleksi budaya" terlihat pada hero dan footer.

## 9. Implementation plan per iterasi
### Iterasi 1 — Fondasi (±45 menit)
- Buat struktur Vite + JavaScript vanilla.
- Siapkan layout responsif, navigasi katalog/dashboard, sistem warna, dan komponen kartu.
- Buat seed data 8 produk dan placeholder lokal.

### Iterasi 2 — Katalog (±60 menit)
- Render katalog dan format harga Rupiah.
- Implementasikan pencarian, filter kategori, sorting, dan tombol WhatsApp.
- Uji kondisi hasil pencarian kosong dan stok habis.

### Iterasi 3 — Dashboard & CRUD (±90 menit)
- Buat kartu ringkasan.
- Buat form tambah/edit, validasi, konfirmasi hapus, dan daftar pengelolaan.
- Sinkronkan perubahan ke tampilan katalog.

### Iterasi 4 — Persistensi & pengujian (±45 menit)
- Implementasikan load/save `localStorage`, fallback data, dan reset demo.
- Jalankan seluruh acceptance criteria secara manual.
- Periksa responsivitas, aksesibilitas dasar, serta konsol browser.

### Iterasi 5 — Finalisasi (±20 menit)
- Rapikan teks, empty state, dan dokumentasi konfigurasi nomor WhatsApp.
- Pastikan tidak ada API key, aset eksternal berhak cipta, atau fitur backend terselubung.