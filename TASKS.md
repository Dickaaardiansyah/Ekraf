# TASKS.md — LintasRoda

> Roadmap implementasi berbasis `SPEC.md` dan `UI-SPEC.md`. Milestone dikerjakan berurutan; setiap milestone harus lulus acceptance criteria sebelum lanjut.
>
> **Batasan produk:** aplikasi tetap berupa frontend statis, tanpa backend, database server, autentikasi, pembayaran, kalender booking, atau WhatsApp Business API. Dashboard adalah area demo yang dapat dibuka siapa pun pada perangkat/browser yang sama.
>
> **Catatan scope:** Vite, Vitest, import/export JSON, security review, dan deployment adalah rincian/penambahan yang diminta untuk roadmap ini. Import/export, pengujian otomatis, dan deployment tidak termasuk MVP asli pada `SPEC.md` (deployment bahkan disebut out of scope), sehingga diperlakukan sebagai perluasan implementasi tanpa mengubah batasan arsitektur.
>
> **Referensi:** prototype single-file `lintasroda-rental-motor.html` dapat dipakai sebagai acuan perilaku, tampilan, dan animasi saat memecah kode ke struktur Vite di bawah.

## Konvensi proyek

Struktur target yang digunakan sebagai asumsi perencanaan:

```text
lintasroda/
├─ index.html
├─ package.json
├─ vite.config.js
├─ vitest.config.js
├─ .gitignore
├─ README.md
├─ TASKS.md
├─ public/
├─ src/
│  ├─ main.js
│  ├─ styles/
│  │  └─ main.css
│  ├─ data/
│  │  └─ seed.js
│  ├─ config/
│  │  └─ app.js
│  ├─ services/
│  │  ├─ product-storage.js
│  │  └─ whatsapp.js
│  ├─ utils/
│  │  ├─ format.js
│  │  ├─ rental.js
│  │  └─ validation.js
│  ├─ views/
│  │  ├─ catalog-view.js
│  │  └─ dashboard-view.js
│  └─ components/
│     ├─ product-card.js
│     ├─ product-form.js
│     └─ hero.js
└─ tests/
   ├─ setup.js
   ├─ unit/
   └─ integration/
```

Jika implementasi memilih struktur setara, sesuaikan daftar file tanpa mengubah acceptance criteria. Gunakan JavaScript vanilla + Vite; jangan menambahkan framework UI, library animasi, atau backend.

---

## Milestone 1 — Scaffold Vite

**Tujuan:** menyiapkan fondasi aplikasi yang dapat dijalankan dan dibuild.

### Pekerjaan
- [ ] Inisialisasi proyek Vite dengan template Vanilla JavaScript.
- [ ] Siapkan `index.html`, entry point `src/main.js`, stylesheet utama, dan struktur direktori.
- [ ] Tambahkan script `dev`, `build`, dan `preview`.
- [ ] Tambahkan `.gitignore` untuk dependency, hasil build, dan file lokal yang tidak perlu dikomit.
- [ ] Pastikan aplikasi berjalan dari development server; jangan mengandalkan `file://`.
- [ ] Buat kerangka landmark semantik: `header`, `nav`, `main`, `section`, dan `footer`.

### Acceptance criteria
- [ ] `npm install` selesai tanpa error.
- [ ] `npm run dev` menjalankan aplikasi Vite dan halaman dapat dibuka di browser.
- [ ] `npm run build` menghasilkan direktori `dist/` tanpa error.
- [ ] `npm run preview` dapat menyajikan hasil build.
- [ ] Tidak ada backend, API key, kredensial, atau autentikasi palsu.
- [ ] Struktur dasar tidak menyebabkan overflow horizontal pada viewport 320 px.

### File yang disentuh
`package.json`, lockfile, `index.html`, `vite.config.js` (bila perlu), `.gitignore`, `src/main.js`, `src/styles/main.css`, `README.md`

### Perintah uji
```bash
npm install
npm run dev
npm run build
npm run preview
```

---

## Milestone 2 — Landing page, hero beranimasi, dan 8 motor

**Tujuan:** membangun tampilan katalog LintasRoda sesuai arah visual, animasi hero, dan data awal spesifikasi.

### Pekerjaan
- [ ] Implementasikan navbar sticky dengan brand LintasRoda dan navigasi Beranda/Keunggulan/Cara Sewa/Katalog/Dashboard (scroll horizontal internal pada layar sempit).
- [ ] Terapkan design tokens UI-SPEC: latar abu kebiruan, aspal, kuning marka, biru aksen, border, ok, dan danger, termasuk varian mode gelap lewat `prefers-color-scheme`.
- [ ] Pasang tipografi Familjen Grotesk + Figtree (Google Fonts atau self-host) dengan fallback font sistem yang tetap terbaca.
- [ ] Buat hero: badge, headline, deskripsi, tombol Lihat Motor/Chat Admin, tiga statistik, ilustrasi 🛵 melayang, dan dua kartu melayang motor pilihan. Pada mobile ilustrasi dan kartu melayang disembunyikan.
- [ ] Buat animasi hero: judul muncul kata demi kata, jalan dengan marka bergerak, 🏍️ melaju melintasi layar, serta statistik yang berhitung naik.
- [ ] Implementasikan `prefers-reduced-motion`: semua animasi dan transisi mati, konten hero tetap tampil lengkap.
- [ ] Buat seed data tepat 8 motor dengan model `id`, `nama`, `kategori`, `cc`, `harga`, `stok`, `deskripsi`, `imageUrl`, dan `unggulan`.
- [ ] Pertahankan data contoh dari spesifikasi: Honda Vario 160, Yamaha NMAX 155, Honda Scoopy, Honda Supra X 125, Kawasaki KLX 150, Honda CRF 150L, Yamaha R15, dan Kawasaki Ninja 250.
- [ ] Buat kartu motor dengan placeholder emoji/CSS; jangan memakai foto stok atau aset berhak cipta.
- [ ] Tampilkan jenis, cc, nama, deskripsi ringkas, tarif per hari, badge unit, dan badge pilihan.
- [ ] Tampilkan status unit habis secara eksplisit ("Sedang disewa" dan "Belum tersedia"); jangan mengandalkan warna saja.
- [ ] Buat bagian Keunggulan dan Cara sewa (langkah 3 menyebut KTP dan SIM C), serta footer dengan syarat sewa.
- [ ] Sediakan empty state katalog kosong dan empty state tanpa hasil (termasuk aksi hapus filter ketika relevan).
- [ ] Tandai teks layanan (helm, antar jemput, servis rutin) sebagai contoh yang harus disesuaikan pemilik.

### Acceptance criteria
- [ ] Pada data awal, katalog menampilkan tepat 8 motor.
- [ ] Setiap kartu menampilkan seluruh informasi yang disyaratkan dan tarif berformat Rupiah.
- [ ] Motor pilihan memiliki badge yang terbaca.
- [ ] Motor unit nol (Kawasaki Ninja 250) tetap terlihat dengan teks status "Sedang disewa" dan tombol "Belum tersedia".
- [ ] Placeholder jelas merupakan ikon, bukan foto unit.
- [ ] Grid menampilkan 4 kolom pada desktop dan minimal 2 kolom pada mobile umum; pada layar 320 px konten tetap terbaca tanpa overflow halaman.
- [ ] Navbar tetap dapat dijangkau seluruhnya pada lebar mobile 360 px tanpa membuat halaman overflow.
- [ ] Hero berubah menjadi satu kolom pada mobile.
- [ ] Animasi hero berjalan; dengan reduced motion aktif semuanya berhenti dan teks tetap terlihat.
- [ ] Syarat sewa terlihat pada footer dan langkah Cara sewa.
- [ ] Heading, landmark, label, dan fokus keyboard memiliki struktur yang masuk akal.

### File yang disentuh
`src/data/seed.js`, `src/views/catalog-view.js`, `src/components/product-card.js`, `src/components/hero.js`, `src/styles/main.css`, `src/main.js`, `index.html`

### Perintah uji
```bash
npm run dev
npm run build
```
Pemeriksaan manual: buka pada desktop, 360 px, dan 320 px; verifikasi delapan motor, detail kartu, badge, status unit habis, empty state, navbar, animasi hero, reduced motion, dan mode terang/gelap.

---

## Milestone 3 — Pencarian, filter, sorting, dan lama sewa

**Tujuan:** membuat katalog dapat ditelusuri, diurutkan, dan dihitung total sewanya secara langsung.

### Pekerjaan
- [ ] Tambahkan pencarian berdasarkan gabungan nama, deskripsi, dan jenis, tanpa membedakan kapitalisasi.
- [ ] Tambahkan filter jenis dinamis (chip) berdasarkan data yang tersedia, termasuk "Semua", dengan `aria-pressed`.
- [ ] Tambahkan sorting: pilihan kami/default, nama A–Z, harga terendah, harga tertinggi, dan unit terbanyak.
- [ ] Tambahkan input lama sewa 1–30 hari (default 1) dengan label terlihat; nilai kosong/non-angka dibaca 1, di atas 30 dibaca 30, desimal dibulatkan ke bawah.
- [ ] Buat helper `hitungTotalSewa(harga, hari)` pada `src/utils/rental.js` dan tampilkan total pada setiap kartu.
- [ ] Pastikan perubahan input/filter/sort/lama sewa langsung memperbarui grid tanpa tombol Terapkan.
- [ ] Tampilkan jumlah hasil.
- [ ] Sediakan aksi "Hapus filter" pada empty state saat filter atau kata kunci aktif.
- [ ] Animasikan kartu muncul bergantian setiap grid dirender ulang (hormati reduced motion).
- [ ] Pastikan pengurutan tidak mengubah urutan data sumber (gunakan salinan array).

### Acceptance criteria
- [ ] Kata kunci yang cocok pada nama, deskripsi, atau jenis (misalnya "vario", "trail", "sport") hanya menampilkan motor yang cocok.
- [ ] Mengosongkan kata kunci mengembalikan seluruh motor yang lolos filter jenis.
- [ ] Memilih jenis hanya menampilkan motor jenis tersebut; "Semua" menghapus filter.
- [ ] Kelima mode sorting menghasilkan urutan yang benar.
- [ ] Total sewa pada setiap kartu = tarif × lama sewa dan berubah langsung saat lama sewa diubah.
- [ ] Lama sewa di luar 1–30 dibatasi dengan benar.
- [ ] Jumlah hasil sesuai dengan jumlah kartu yang tampil.
- [ ] Kombinasi pencarian dan jenis bekerja bersamaan.
- [ ] Hasil kosong menampilkan pesan dan cara memulihkan katalog.
- [ ] Semua kontrol memiliki label aksesibel dan dapat digunakan dengan keyboard serta layar sempit.

### File yang disentuh
`src/views/catalog-view.js`, `src/utils/format.js`, `src/utils/rental.js`, `src/styles/main.css`, `src/main.js`

### Perintah uji
```bash
npm run dev
npm run build
```
Pemeriksaan manual: uji pencarian nama, deskripsi, dan jenis, kata kunci tidak cocok, setiap jenis (Matic, Bebek, Sport, Trail), seluruh mode sorting, kombinasi filter, dan nilai batas lama sewa (0, 1, 30, 31, kosong).

---

## Milestone 4 — Integrasi WhatsApp

**Tujuan:** menyediakan jalur pemesanan melalui tautan `wa.me`, bukan WhatsApp Business API.

### Pekerjaan
- [ ] Simpan nomor rental sebagai konfigurasi terpusat yang mudah ditemukan dan diganti (kode negara + nomor, hanya digit).
- [ ] Buat helper pembentuk URL WhatsApp dengan pesan awal yang menyebut nama motor dan lama sewa.
- [ ] Encode pesan menggunakan `encodeURIComponent`.
- [ ] Buka tautan di tab baru dengan `rel="noopener noreferrer"`.
- [ ] Hubungkan tombol hero (Chat Admin) dan footer ke nomor konfigurasi yang sama.
- [ ] Nonaktifkan CTA dengan status "Belum tersedia" untuk motor dengan unit nol.
- [ ] Dokumentasikan bahwa nomor contoh wajib diganti sebelum penggunaan nyata.

### Acceptance criteria
- [ ] CTA motor tersedia mengarah ke `https://wa.me/<nomor>` dengan pesan awal yang menyebut motor terpilih dan lama sewa.
- [ ] Spasi dan karakter khusus pada nama motor ter-encode dengan benar.
- [ ] Mengubah lama sewa mengubah pesan pada tautan.
- [ ] Nomor tujuan hanya berasal dari konfigurasi, bukan dari data motor.
- [ ] Motor unit nol tidak menawarkan pemesanan aktif.
- [ ] Tidak ada klaim integrasi WhatsApp Business API atau pengiriman pesan otomatis.
- [ ] README menjelaskan cara mengganti nomor WhatsApp rental.

### File yang disentuh
`src/config/app.js`, `src/services/whatsapp.js`, `src/components/product-card.js`, `src/components/hero.js`, `src/styles/main.css`, `README.md`

### Perintah uji
```bash
npm run dev
npm run build
```
Pemeriksaan manual: klik CTA motor tersedia dengan lama sewa berbeda, periksa nomor dan teks pada URL/tab WhatsApp; pastikan CTA unit habis tidak aktif.

---

## Milestone 5 — Dashboard CRUD

**Tujuan:** menyediakan dashboard demo untuk ringkasan armada dan pengelolaan motor.

### Pekerjaan
- [ ] Implementasikan perpindahan tampilan Katalog/Dashboard tanpa menyiratkan adanya login atau role-based access.
- [ ] Tampilkan keterangan bahwa dashboard merupakan demo lokal tanpa akun/backend.
- [ ] Buat empat kartu ringkasan: model motor, unit tersedia, unit menipis (≤ 1), dan potensi sewa per hari (tarif × unit).
- [ ] Buat daftar pengelolaan dengan kolom Motor, Jenis, Mesin, Tarif/hari, Unit, Status, dan Aksi; gunakan scroll internal atau baris ringkas pada mobile tanpa overflow halaman.
- [ ] Tandai status "Menipis" (unit = 1) dan "Disewa penuh" (unit = 0) dengan teks, bukan hanya warna.
- [ ] Buat modal tambah dan edit dengan field seluruh model motor, termasuk cc, ikon placeholder, dan checkbox pilihan kami.
- [ ] Validasi nama wajib, tarif angka >= 0, unit integer >= 0, dan cc kosong/integer >= 50 di form serta sebelum data disimpan.
- [ ] Tampilkan pesan validasi dekat field dan dapat dibaca screen reader.
- [ ] Implementasikan edit dengan form terisi data terpilih.
- [ ] Implementasikan hapus dengan konfirmasi yang menyebut nama motor.
- [ ] Implementasikan reset seed dengan konfirmasi yang menjelaskan perubahan lokal akan diganti 8 motor demo awal.
- [ ] Berikan feedback sukses hanya setelah operasi berhasil; tampilkan error jika penyimpanan gagal.
- [ ] Kelola fokus modal: masuk ke dialog, tidak bocor ke konten belakang, kembali ke pemicu saat ditutup; modal dapat ditutup dengan Escape dan klik latar.

### Acceptance criteria
- [ ] Dashboard menghitung ringkasan dengan benar (pada seed: 8, 27, 2, Rp3.475.000).
- [ ] Motor valid dapat ditambahkan dan langsung tampil di dashboard serta katalog.
- [ ] Nama kosong, tarif negatif/nonangka, unit negatif, dan unit pecahan ditolak.
- [ ] Motor dapat diedit; perubahan terlihat di katalog, daftar, dan ringkasan.
- [ ] Motor hanya dihapus setelah konfirmasi; konfirmasi menyebut nama motor.
- [ ] Reset meminta konfirmasi dan mengembalikan seed tepat 8 motor.
- [ ] Modal dapat ditutup dengan tombol tutup, Batal, Escape, dan klik latar; fokus keyboard dikelola.
- [ ] Dashboard tidak tampak sebagai area yang dilindungi autentikasi.
- [ ] Pada viewport 320 px tidak terjadi overflow horizontal halaman; aksi Edit/Hapus tetap terjangkau.
- [ ] Toast/status dinamis menggunakan area live yang sesuai.

### File yang disentuh
`src/views/dashboard-view.js`, `src/components/product-form.js`, `src/utils/validation.js`, `src/main.js`, `src/styles/main.css`, `src/data/seed.js`

### Perintah uji
```bash
npm run dev
npm run build
```
Pemeriksaan manual: tambah, edit, hapus (batal dan konfirmasi), reset (batal dan konfirmasi), validasi semua nilai batas, keyboard modal, dan sinkronisasi katalog-dashboard.

---

## Milestone 6 — localStorage dan import/export JSON

**Tujuan:** mempertahankan data pada browser yang sama serta memberi cara backup/restore manual melalui JSON.

### Pekerjaan
- [ ] Gunakan key `lintasroda_motor_v1`.
- [ ] Seed 8 motor hanya digunakan ketika key belum memiliki data yang valid.
- [ ] Buat fungsi load/save terisolasi dari tampilan.
- [ ] Tangani localStorage yang tidak tersedia, akses ditolak, JSON rusak, atau bentuk data tidak sesuai; gunakan fallback aman dan tampilkan peringatan bila relevan.
- [ ] Validasi struktur dan setiap record motor sebelum menerima data dari penyimpanan atau file impor.
- [ ] Tambahkan ekspor seluruh motor menjadi file JSON dengan struktur model yang konsisten.
- [ ] Tambahkan impor file JSON; validasi seluruh isi sebelum mengganti state. Jika ada satu record tidak valid, tolak impor secara utuh dan jangan merusak data aktif.
- [ ] Minta konfirmasi sebelum impor mengganti data saat ini.
- [ ] Simpan hasil impor ke localStorage dan render ulang katalog/dashboard hanya setelah validasi dan penyimpanan berhasil.
- [ ] Pertahankan reset demo sebagai pengembalian ke seed.
- [ ] Jelaskan bahwa localStorage tidak tersinkron antarperangkat/browser dan dapat terhapus oleh pengguna/browser.

### Acceptance criteria
- [ ] Perubahan CRUD tetap ada setelah halaman dimuat ulang pada browser/perangkat yang sama.
- [ ] Key penyimpanan tepat `lintasroda_motor_v1`.
- [ ] Key yang belum ada memuat seed 8 motor.
- [ ] JSON rusak atau data tidak valid tidak menyebabkan aplikasi crash; fallback aman dijalankan.
- [ ] Kegagalan localStorage menghasilkan pesan yang jelas dan tidak menampilkan notifikasi sukses palsu.
- [ ] Ekspor menghasilkan JSON valid yang dapat dibaca kembali.
- [ ] Impor file valid mengganti data setelah konfirmasi dan memperbarui semua tampilan.
- [ ] Impor JSON malformed atau record invalid ditolak tanpa mengubah data yang sedang tersimpan.
- [ ] `harga` tetap number, `stok` dan `cc` tetap integer, dan `unggulan` tetap boolean setelah round-trip ekspor/impor.
- [ ] README menyebut data hanya lokal dan tidak ada sinkronisasi.

### File yang disentuh
`src/services/product-storage.js`, `src/utils/validation.js`, `src/views/dashboard-view.js`, `src/main.js`, `src/styles/main.css`, `README.md`

### Perintah uji
```bash
npm run dev
npm run build
```
Pemeriksaan manual: reload setelah CRUD, hapus/ubah key di DevTools untuk simulasi data rusak, ekspor lalu impor kembali, impor JSON invalid, batalkan konfirmasi impor, dan simulasi localStorage tidak tersedia.

---

## Milestone 7 — Vitest

**Tujuan:** menambahkan pengujian otomatis untuk logika inti dan alur utama aplikasi.

### Pekerjaan
- [ ] Tambahkan Vitest dan konfigurasi environment DOM yang sesuai (misalnya `jsdom`).
- [ ] Tambahkan script `test`, `test:watch`, dan bila berguna `test:coverage`.
- [ ] Uji helper format Rupiah, pencarian (nama, deskripsi, jenis), filter, sorting, dan pembentukan URL WhatsApp (termasuk lama sewa).
- [ ] Uji `hitungTotalSewa` dan pembatasan lama sewa (kosong, 0, 1, 30, 31, desimal, non-angka).
- [ ] Uji perhitungan ringkasan dashboard: total unit, unit menipis (≤ 1), dan potensi sewa per hari.
- [ ] Uji validasi model motor: field wajib, tarif, unit integer, cc opsional, tipe data, jenis, dan ID.
- [ ] Uji load/save localStorage: key belum ada, data valid, JSON rusak, schema invalid, serta storage melempar error.
- [ ] Uji import/export JSON termasuk round-trip dan penolakan impor atomik.
- [ ] Uji perilaku integrasi penting: CRUD memperbarui state/ringkasan dan status unit habis.
- [ ] Gunakan data fixture; jangan bergantung pada layanan eksternal atau nomor WhatsApp nyata.

### Acceptance criteria
- [ ] `npm test` berjalan dan exit code 0.
- [ ] Fungsi validasi, storage, filter/sort, ringkasan, kalkulasi sewa, dan WhatsApp helper memiliki test yang relevan.
- [ ] Test mencakup kondisi normal, batas, dan error.
- [ ] Test tidak mengakses backend atau jaringan.
- [ ] Kegagalan test menyebabkan command gagal (bukan disembunyikan).
- [ ] Build produksi tetap berhasil setelah konfigurasi test ditambahkan.

### File yang disentuh
`package.json`, lockfile, `vitest.config.js`, `tests/setup.js`, `tests/unit/*`, `tests/integration/*`, `src/utils/format.js`, `src/utils/rental.js`, `src/utils/validation.js`, `src/services/product-storage.js`, `src/services/whatsapp.js`; file sumber lain hanya bila diperlukan untuk testability.

### Perintah uji
```bash
npm test
npm run test:watch
npm run build
```

---

## Milestone 8 — Security review dan hardening

**Tujuan:** memeriksa risiko frontend-only, validasi data, rendering input, tautan eksternal, dan keamanan animasi/aksesibilitas.

### Pekerjaan
- [ ] Audit semua jalur render data pengguna/import; hindari menyisipkan teks input mentah sebagai HTML (termasuk `nama`, `deskripsi`, dan `kategori`).
- [ ] Gunakan `textContent`, DOM API, atau escaping yang teruji untuk teks dinamis.
- [ ] Pastikan atribut URL dan style tidak menerima nilai tak tepercaya tanpa validasi/allowlist (termasuk nilai `imageUrl`: hanya `local:` dengan emoji dari allowlist).
- [ ] Validasi ulang data motor pada batas masuk: form, localStorage, dan impor JSON.
- [ ] Pastikan URL WhatsApp dibentuk dari nomor konfigurasi tervalidasi dan pesan ter-encode.
- [ ] Pastikan tautan tab baru memakai `rel="noopener noreferrer"`.
- [ ] Audit dependency dengan `npm audit`; evaluasi temuan sebelum memperbarui dependency.
- [ ] Pastikan tidak ada secret, token, API key, kredensial, endpoint backend, atau data pribadi (termasuk data KTP/SIM) di repository/build.
- [ ] Periksa aksesibilitas yang berdampak pada interaksi: label, fokus terlihat, dialog modal, konfirmasi aksi destruktif, pesan error, dan `aria-hidden` pada dekorasi bergerak.
- [ ] Verifikasi pasangan warna final pada mode terang dan gelap: teks normal minimal 4.5:1 dan teks besar/komponen penting minimal 3:1 (terutama biru aksen pada latar abu, teks abu pada aspal, dan teks muted pada surface-soft).
- [ ] Verifikasi `prefers-reduced-motion` mematikan seluruh animasi, termasuk animasi hitung angka dan motor hero.
- [ ] Tinjau teks layanan (helm, jas hujan, antar jemput, servis rutin) agar tidak menjanjikan hal yang belum dikonfirmasi pemilik; hindari klaim asuransi atau kondisi unit.
- [ ] Dokumentasikan keterbatasan: dashboard tidak memiliki autentikasi/otorisasi; localStorage dapat diedit oleh pengguna; jumlah unit tidak real-time; data tidak cocok untuk informasi sensitif atau operasional produksi.

### Acceptance criteria
- [ ] Tidak ada jalur XSS yang diketahui melalui nama, kategori, deskripsi, `imageUrl`, atau data hasil impor.
- [ ] Impor JSON tidak dapat menyisipkan markup/script atau nilai model di luar aturan.
- [ ] Tidak ada tautan eksternal yang membuka tab baru tanpa proteksi opener.
- [ ] Tidak ada secret atau kredensial dalam source maupun artefak build.
- [ ] `npm audit` ditinjau; temuan yang dapat ditindaklanjuti diperbaiki atau dicatat dengan alasan dan mitigasi.
- [ ] Kontras warna final memenuhi target UI-SPEC atau pengecualian didokumentasikan dan diperbaiki sebelum rilis.
- [ ] Reduced motion terverifikasi pada seluruh animasi.
- [ ] Aplikasi tetap jelas sebagai demo lokal tanpa perlindungan akun; tidak mengklaim data localStorage aman dari pengguna perangkat.
- [ ] Seluruh test otomatis dan build lulus setelah hardening.

### File yang disentuh
`src/**/*.js`, `index.html`, `src/styles/main.css`, `package.json`, lockfile, `README.md`, `SECURITY.md` (opsional)

### Perintah uji
```bash
npm test
npm audit
npm run build
```
Pemeriksaan manual: masukkan teks seperti `<img src=x onerror=alert(1)>` pada field teks dan file impor; pastikan tampil sebagai teks biasa. Uji juga tautan WhatsApp, keyboard, modal, kontras, dan reduced motion.

---

## Milestone 9 — Deployment

**Tujuan:** menerbitkan hasil build frontend statis pada hosting yang mendukung static site.

> Deployment produksi/domain publik berada di luar scope `SPEC.md`; milestone ini adalah perluasan yang diminta. Pilih satu static host (misalnya GitHub Pages, Netlify, atau Vercel) sebelum konfigurasi final. Tidak ada server aplikasi atau backend yang perlu dideploy.

### Pekerjaan
- [ ] Pilih target hosting dan catat URL publik serta pemilik/proyek deployment.
- [ ] Konfigurasikan base path Vite bila hosting menggunakan subpath.
- [ ] Pastikan seluruh aset bersifat lokal atau memang diperlukan (termasuk font bila tidak di-self-host); jangan mengandalkan aset eksternal yang tidak disetujui.
- [ ] Pastikan nomor WhatsApp rental sudah diganti dan diverifikasi oleh pemilik sebelum publikasi; jangan menerbitkan nomor contoh.
- [ ] Minta pemilik memastikan seluruh daftar motor, tarif, dan layanan (helm, jas hujan, antar jemput, servis) sesuai kenyataan, serta memeriksa kebutuhan izin usaha, perjanjian sewa, deposit, dan asuransi/tanggung jawab sebelum katalog dipublikasikan untuk penggunaan nyata.
- [ ] Tambahkan dokumentasi build dan deployment pada README.
- [ ] Jalankan test dan build bersih sebelum deploy.
- [ ] Deploy direktori `dist/` sebagai static site.
- [ ] Lakukan smoke test pada URL publik, desktop, dan mobile.
- [ ] Pastikan tidak ada data demo sensitif; ingat setiap pengunjung memiliki localStorage masing-masing dan data tidak dibagikan ke pengelola/perangkat lain.

### Acceptance criteria
- [ ] Build produksi selesai tanpa error.
- [ ] URL publik dapat diakses melalui HTTPS.
- [ ] Navigasi Katalog/Dashboard dan refresh halaman bekerja pada hosting target.
- [ ] Delapan motor seed tampil pada browser baru.
- [ ] Search/filter/sort, lama sewa, CRUD demo, localStorage, import/export, dan reset berfungsi di URL publik.
- [ ] Tautan WhatsApp menuju nomor rental yang telah dikonfirmasi, dengan pesan awal yang benar.
- [ ] Tidak ada asset path rusak atau error runtime yang menghalangi fungsi utama.
- [ ] Animasi hero berjalan mulus pada desktop dan ponsel; layout lolos smoke test desktop dan viewport 360 px/320 px tanpa overflow halaman.
- [ ] README mencatat URL deployment, langkah deploy ulang, dan batasan penyimpanan lokal.
- [ ] Tidak ada klaim sinkronisasi, autentikasi, backup server, ketersediaan real-time, atau keamanan data yang tidak disediakan aplikasi.

### File yang disentuh
`vite.config.js`, `package.json` (bila ada script deploy), `README.md`, konfigurasi hosting yang dipilih (misalnya `netlify.toml`, `vercel.json`, atau workflow GitHub Actions), `src/config/app.js` (hanya untuk nomor yang telah dikonfirmasi)

### Perintah uji
```bash
npm ci
npm test
npm run build
npm run preview
```
Setelah deploy: buka URL publik, refresh pada kedua tampilan, uji alur utama, dan periksa console/network browser.

---

## Definition of Done (seluruh milestone)

- [ ] Acceptance criteria seluruh milestone terpenuhi.
- [ ] `npm test` lulus.
- [ ] `npm run build` lulus.
- [ ] Tidak ada error runtime yang menghalangi fungsi utama.
- [ ] Desktop, tablet, dan mobile diuji; viewport 320 px tidak menyebabkan overflow horizontal halaman.
- [ ] Keyboard navigation, label input, fokus terlihat, dialog, dan live feedback diperiksa.
- [ ] Kontras warna diverifikasi terhadap WCAG AA pada mode terang dan gelap.
- [ ] Reduced motion mematikan seluruh animasi tanpa mengurangi konten.
- [ ] Nomor WhatsApp contoh tidak tertinggal pada rilis publik.
- [ ] Dokumentasi menjelaskan cara menjalankan proyek, mengganti nomor WhatsApp, backup/restore JSON, deployment, dan batasan localStorage.
- [ ] Teks layanan dan tarif telah dikonfirmasi pemilik; tidak ada klaim asuransi, kondisi unit, atau ketersediaan real-time yang tidak disediakan aplikasi.
- [ ] Tidak ada backend, autentikasi, pembayaran, kalender booking, upload gambar, atau fitur di luar scope yang ditambahkan diam-diam.