# TASKS.md — PusakaJawa

> Roadmap implementasi berbasis `SPEC.md` dan `UI-SPEC.md`. Milestone dikerjakan berurutan; setiap milestone harus lulus acceptance criteria sebelum lanjut.
>
> **Batasan produk:** aplikasi tetap berupa frontend statis, tanpa backend, database server, autentikasi, pembayaran, atau WhatsApp Business API. Dashboard adalah area demo yang dapat dibuka siapa pun pada perangkat/browser yang sama.
>
> **Catatan scope:** Vite, Vitest, import/export JSON, security review, dan deployment adalah rincian/penambahan yang diminta untuk roadmap ini. Import/export, pengujian otomatis, dan deployment tidak termasuk MVP asli pada `SPEC.md` (deployment bahkan disebut out of scope), sehingga diperlakukan sebagai perluasan implementasi tanpa mengubah batasan arsitektur.
>
> **Referensi:** prototype single-file `pusakajawa.html` dapat dipakai sebagai acuan perilaku dan tampilan saat memecah kode ke struktur Vite di bawah.

## Konvensi proyek

Struktur target yang digunakan sebagai asumsi perencanaan:

```text
pusakajawa/
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
│  │  └─ validation.js
│  ├─ views/
│  │  ├─ catalog-view.js
│  │  └─ dashboard-view.js
│  └─ components/
│     ├─ product-card.js
│     └─ product-form.js
└─ tests/
   ├─ setup.js
   ├─ unit/
   └─ integration/
```

Jika implementasi memilih struktur setara, sesuaikan daftar file tanpa mengubah acceptance criteria. Gunakan JavaScript vanilla + Vite; jangan menambahkan framework UI atau backend.

---

## Milestone 1 — Scaffold Vite

**Tujuan:** menyiapkan fondasi aplikasi yang dapat dijalankan dan dibuild.

### Pekerjaan
- [ ] Inisialisasi proyek Vite dengan template Vanilla JavaScript.
- [ ] Siapkan `index.html`, entry point `src/main.js`, stylesheet utama, dan struktur direktori.
- [ ] Tambahkan script `dev`, `build`, dan `preview`.
- [ ] Tambahkan `.gitignore` untuk dependency, hasil build, dan file lokal yang tidak perlu dikomit.
- [ ] Pastikan aplikasi berjalan dari development server; jangan mengandalkan pembukaan `file://`.
- [ ] Buat kerangka landmark semantik: `header`, `nav`, `main`, `section`, dan `footer`.

### Acceptance criteria
- [ ] `npm install` selesai tanpa error.
- [ ] `npm run dev` menjalankan aplikasi Vite dan halaman dapat dibuka di browser.
- [ ] `npm run build` menghasilkan direktori `dist/` tanpa error.
- [ ] `npm run preview` dapat menyajikan hasil build.
- [ ] Tidak ada backend, API key, kredensial, atau autentikasi palsu.
- [ ] Struktur dasar tidak menyebabkan overflow horizontal pada viewport 320 px.

### File yang disentuh
- `package.json`
- `package-lock.json` (atau lockfile package manager yang dipilih)
- `index.html`
- `vite.config.js` (bila diperlukan)
- `.gitignore`
- `src/main.js`
- `src/styles/main.css`
- `README.md`

### Perintah uji
```bash
npm install
npm run dev
npm run build
npm run preview
```

---

## Milestone 2 — Landing page dan 8 produk

**Tujuan:** membangun tampilan katalog PusakaJawa sesuai arah visual dan data awal spesifikasi.

### Pekerjaan
- [ ] Implementasikan navbar sticky dengan brand PusakaJawa dan navigasi Katalog/Dashboard.
- [ ] Implementasikan hero dua kolom pada desktop dan satu kolom pada mobile, dengan pola batik CSS dan label “Replika dan koleksi budaya”.
- [ ] Terapkan design tokens UI: latar krem sogan, surface krem terang, biru nila, aksen emas tua, border, dan danger, termasuk varian mode gelap lewat `prefers-color-scheme`.
- [ ] Gunakan tipografi Georgia untuk judul dan font sistem untuk UI; tanpa font eksternal.
- [ ] Buat seed data tepat 8 produk dengan model `id`, `nama`, `kategori`, `asal`, `harga`, `stok`, `deskripsi`, `imageUrl`, dan `unggulan`.
- [ ] Pertahankan data contoh dari spesifikasi: Keris Luk 7 Surakarta, Keris Sengkelat Luk 13, Tombak Hias Trisula, Warangka Ladrang Jati, Beskap Jawa Hitam Lengkap, Kain Batik Tulis Parang Rusak, Blangkon Surakarta Mondolan, dan Kebaya Kutubaru Lurik.
- [ ] Buat kartu produk dengan placeholder lokal/emoji/CSS; jangan memakai foto stok atau aset berhak cipta.
- [ ] Tampilkan kategori, asal, nama, deskripsi ringkas, harga Rupiah, stok, dan badge pilihan.
- [ ] Tampilkan status stok habis secara eksplisit; jangan mengandalkan warna saja.
- [ ] Sediakan empty state katalog kosong dan empty state tanpa hasil (termasuk aksi hapus filter ketika relevan).
- [ ] Tampilkan catatan “replika dan koleksi budaya” pada footer; deskripsi produk tidak boleh mengklaim keaslian, usia, atau tuah.

### Acceptance criteria
- [ ] Pada data awal, katalog menampilkan tepat 8 produk.
- [ ] Setiap kartu menampilkan seluruh informasi yang disyaratkan dan harga berformat Rupiah.
- [ ] Produk pilihan memiliki badge yang terbaca.
- [ ] Produk stok nol (Kebaya Kutubaru Lurik) tetap terlihat dengan teks status “Stok habis”.
- [ ] Placeholder jelas merupakan ilustrasi/placeholder, bukan foto produk.
- [ ] Grid menampilkan 4 kolom pada desktop dan minimal 2 kolom pada mobile umum; pada layar 320 px konten tetap terbaca tanpa overflow halaman.
- [ ] Navbar tetap menampilkan Katalog dan Dashboard pada lebar mobile 360 px.
- [ ] Hero berubah menjadi satu kolom pada mobile.
- [ ] Label replika/koleksi budaya terlihat pada hero dan footer.
- [ ] Heading, landmark, label, dan fokus keyboard memiliki struktur yang masuk akal.

### File yang disentuh
- `src/data/seed.js`
- `src/views/catalog-view.js`
- `src/components/product-card.js`
- `src/styles/main.css`
- `src/main.js`
- `index.html`

### Perintah uji
```bash
npm run dev
npm run build
```
Pemeriksaan manual: buka pada viewport desktop, 360 px, dan 320 px; verifikasi delapan produk, detail kartu, badge, stok habis, empty state, navbar, dan mode terang/gelap.

---

## Milestone 3 — Pencarian, filter, dan sorting

**Tujuan:** membuat katalog dapat ditelusuri dan diurutkan secara langsung.

### Pekerjaan
- [ ] Tambahkan pencarian berdasarkan gabungan nama, deskripsi, dan asal daerah, tanpa membedakan kapitalisasi.
- [ ] Tambahkan filter kategori dinamis berdasarkan kategori produk yang tersedia, termasuk opsi “Semua kategori”.
- [ ] Tambahkan sorting: pilihan kami/default, nama A–Z, harga terendah, harga tertinggi, dan stok terbanyak.
- [ ] Pastikan perubahan input/filter/sort langsung memperbarui grid tanpa tombol Terapkan.
- [ ] Tampilkan jumlah hasil.
- [ ] Sediakan aksi “Hapus filter” pada empty state saat filter atau kata kunci aktif.
- [ ] Pastikan pengurutan tidak mengubah urutan data sumber secara tidak sengaja (gunakan salinan array).

### Acceptance criteria
- [ ] Kata kunci yang cocok pada nama, deskripsi, atau asal (misalnya "keris", "lurik", "Surakarta") hanya menampilkan produk yang cocok.
- [ ] Mengosongkan kata kunci mengembalikan seluruh produk yang lolos filter kategori.
- [ ] Memilih kategori hanya menampilkan produk kategori tersebut; “Semua kategori” menghapus filter.
- [ ] Kelima mode sorting menghasilkan urutan yang benar.
- [ ] Jumlah hasil sesuai dengan jumlah kartu yang tampil.
- [ ] Kombinasi pencarian dan kategori bekerja bersamaan.
- [ ] Hasil kosong menampilkan pesan dan cara memulihkan katalog.
- [ ] Semua kontrol memiliki label aksesibel dan dapat digunakan dengan keyboard serta layar sempit.

### File yang disentuh
- `src/views/catalog-view.js`
- `src/utils/format.js` (bila fungsi pembanding/normalisasi diletakkan di sini)
- `src/styles/main.css`
- `src/main.js`

### Perintah uji
```bash
npm run dev
npm run build
```
Pemeriksaan manual: uji pencarian nama, deskripsi, dan asal, kata kunci tidak cocok, setiap kategori (Senjata, Pakaian, Aksesori), seluruh mode sorting, dan kombinasi filter.

---

## Milestone 4 — Integrasi WhatsApp

**Tujuan:** menyediakan jalur pemesanan melalui tautan `wa.me`, bukan WhatsApp Business API.

### Pekerjaan
- [ ] Simpan nomor toko sebagai konfigurasi terpusat yang mudah ditemukan dan diganti (kode negara + nomor, hanya digit).
- [ ] Buat helper pembentuk URL WhatsApp dengan pesan awal yang menyebut nama produk.
- [ ] Encode pesan menggunakan `encodeURIComponent`.
- [ ] Buka tautan di tab baru dengan atribut keamanan `rel="noopener noreferrer"`.
- [ ] Nonaktifkan CTA atau ganti dengan status yang jelas untuk produk dengan stok nol, mengikuti UI-SPEC.
- [ ] Dokumentasikan bahwa nomor contoh wajib diganti sebelum penggunaan nyata.

### Acceptance criteria
- [ ] CTA produk tersedia mengarah ke `https://wa.me/<nomor>` dengan pesan awal yang menyebut produk terpilih.
- [ ] Spasi dan karakter khusus pada nama produk ter-encode dengan benar.
- [ ] Nomor tujuan hanya berasal dari konfigurasi, bukan dari data produk.
- [ ] Produk stok nol tidak menawarkan pemesanan aktif.
- [ ] Tidak ada klaim integrasi WhatsApp Business API atau pengiriman pesan otomatis.
- [ ] README menjelaskan cara mengganti nomor WhatsApp toko.

### File yang disentuh
- `src/config/app.js`
- `src/services/whatsapp.js`
- `src/components/product-card.js`
- `src/styles/main.css`
- `README.md`

### Perintah uji
```bash
npm run dev
npm run build
```
Pemeriksaan manual: klik CTA produk tersedia, periksa nomor dan teks pada URL/tab WhatsApp; pastikan CTA stok habis tidak aktif.

---

## Milestone 5 — Dashboard CRUD

**Tujuan:** menyediakan dashboard demo untuk ringkasan inventaris dan pengelolaan produk.

### Pekerjaan
- [ ] Implementasikan perpindahan tampilan Katalog/Dashboard tanpa menyiratkan adanya login atau role-based access.
- [ ] Tampilkan keterangan bahwa dashboard merupakan demo lokal tanpa akun/backend.
- [ ] Buat empat kartu ringkasan: total produk, total stok, jumlah produk stok menipis (≤ 3), dan nilai persediaan (harga × stok).
- [ ] Buat daftar pengelolaan dengan kolom Produk, Kategori, Asal, Harga, Stok, Status, dan Aksi; gunakan tampilan kartu/baris ringkas pada mobile atau scroll internal yang tidak membuat halaman overflow.
- [ ] Tandai stok ≤ 3 pada daftar dengan teks tebal dan warna danger.
- [ ] Buat modal/panel tambah dan edit dengan field seluruh model produk, termasuk asal daerah, placeholder lokal, dan checkbox koleksi pilihan.
- [ ] Validasi nama wajib, harga angka >= 0, dan stok integer >= 0 di form serta sebelum data disimpan.
- [ ] Tampilkan pesan validasi dekat field dan dapat dibaca screen reader.
- [ ] Implementasikan edit dengan form terisi data terpilih.
- [ ] Implementasikan hapus dengan konfirmasi yang menyebut nama produk.
- [ ] Implementasikan reset seed dengan konfirmasi yang menjelaskan perubahan lokal akan diganti 8 produk demo awal.
- [ ] Berikan feedback sukses hanya setelah operasi berhasil; tampilkan error jika penyimpanan gagal.
- [ ] Kelola fokus modal: fokus masuk ke dialog, tidak bocor ke konten belakang, dan kembali ke pemicu ketika ditutup; modal juga dapat ditutup dengan Escape.

### Acceptance criteria
- [ ] Dashboard menghitung total produk, total stok, stok menipis, dan nilai persediaan dengan benar (pada seed: 8, 67, 2, Rp24.620.000).
- [ ] Produk valid dapat ditambahkan dan langsung tampil di dashboard serta katalog.
- [ ] Nama kosong, harga negatif/nonangka, stok negatif, dan stok pecahan ditolak.
- [ ] Produk dapat diedit; perubahan terlihat di katalog, daftar, dan ringkasan.
- [ ] Produk hanya dihapus setelah konfirmasi; konfirmasi menyebut nama produk.
- [ ] Reset meminta konfirmasi dan mengembalikan seed tepat 8 produk.
- [ ] Modal dapat ditutup dengan tombol tutup, Batal, dan Escape; fokus keyboard dikelola.
- [ ] Dashboard tidak tampak sebagai area yang dilindungi autentikasi.
- [ ] Pada viewport 320 px tidak terjadi overflow horizontal halaman; aksi Edit/Hapus tetap terjangkau.
- [ ] Toast/status dinamis menggunakan area live yang sesuai.

### File yang disentuh
- `src/views/dashboard-view.js`
- `src/components/product-form.js`
- `src/utils/validation.js`
- `src/main.js`
- `src/styles/main.css`
- `src/data/seed.js`

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
- [ ] Gunakan key `pusakajawa_products_v1`.
- [ ] Seed 8 produk hanya digunakan ketika key belum memiliki data yang valid.
- [ ] Buat fungsi load/save terisolasi dari tampilan.
- [ ] Tangani localStorage yang tidak tersedia, akses ditolak, data JSON rusak, atau bentuk data tidak sesuai; gunakan fallback aman dan tampilkan peringatan bila relevan.
- [ ] Validasi struktur dan setiap record produk sebelum menerima data dari penyimpanan atau file impor.
- [ ] Tambahkan ekspor seluruh produk menjadi file JSON dengan struktur model produk yang konsisten.
- [ ] Tambahkan impor file JSON; validasi seluruh isi sebelum mengganti state. Jika ada satu record tidak valid, tolak impor secara utuh dan jangan merusak data yang sedang aktif.
- [ ] Minta konfirmasi sebelum impor mengganti data saat ini.
- [ ] Simpan hasil impor ke localStorage dan render ulang katalog/dashboard hanya setelah validasi dan penyimpanan berhasil.
- [ ] Pertahankan reset demo sebagai pengembalian ke seed.
- [ ] Jelaskan bahwa localStorage tidak tersinkron antarperangkat/browser dan dapat terhapus oleh pengguna/browser.

### Acceptance criteria
- [ ] Perubahan CRUD tetap ada setelah halaman dimuat ulang pada browser/perangkat yang sama.
- [ ] Key penyimpanan tepat `pusakajawa_products_v1`.
- [ ] Key yang belum ada memuat seed 8 produk.
- [ ] JSON rusak atau data tidak valid tidak menyebabkan aplikasi crash; fallback aman dijalankan.
- [ ] Kegagalan localStorage menghasilkan pesan yang jelas dan tidak menampilkan notifikasi sukses palsu.
- [ ] Ekspor menghasilkan JSON valid yang dapat dibaca kembali.
- [ ] Impor file valid mengganti data setelah konfirmasi dan memperbarui semua tampilan.
- [ ] Impor JSON malformed atau record invalid ditolak tanpa mengubah data yang sedang tersimpan.
- [ ] Nilai `harga` tetap number, `stok` tetap integer, dan `unggulan` tetap boolean setelah round-trip ekspor/impor.
- [ ] README menyebut data hanya lokal dan tidak ada sinkronisasi.

### File yang disentuh
- `src/services/product-storage.js`
- `src/utils/validation.js`
- `src/views/dashboard-view.js`
- `src/main.js`
- `src/styles/main.css`
- `README.md`

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
- [ ] Tambahkan Vitest dan konfigurasi environment DOM yang sesuai (misalnya `jsdom` bila diperlukan).
- [ ] Tambahkan script `test`, `test:watch`, dan bila berguna `test:coverage`.
- [ ] Uji helper format Rupiah, pencarian (termasuk field `asal`), filter, sorting, dan pembentukan URL WhatsApp.
- [ ] Uji perhitungan ringkasan dashboard: total stok, stok menipis, dan nilai persediaan.
- [ ] Uji validasi model produk: field wajib, harga, stok integer, tipe data, kategori, dan ID.
- [ ] Uji load/save localStorage: key belum ada, data valid, JSON rusak, schema invalid, serta storage melempar error.
- [ ] Uji import/export JSON termasuk round-trip dan penolakan impor atomik.
- [ ] Uji perilaku integrasi penting: CRUD memperbarui state/ringkasan dan status stok habis.
- [ ] Gunakan data fixture; jangan bergantung pada layanan eksternal atau nomor WhatsApp nyata.

### Acceptance criteria
- [ ] `npm test` berjalan dan exit code 0.
- [ ] Semua fungsi validasi, storage, filter/sort, ringkasan, dan WhatsApp helper memiliki test yang relevan.
- [ ] Test mencakup kondisi normal, batas, dan error.
- [ ] Test tidak mengakses backend atau jaringan.
- [ ] Kegagalan test menyebabkan command gagal (bukan disembunyikan).
- [ ] Build produksi tetap berhasil setelah konfigurasi test ditambahkan.

### File yang disentuh
- `package.json`
- `package-lock.json`
- `vitest.config.js`
- `tests/setup.js`
- `tests/unit/*`
- `tests/integration/*`
- `src/utils/format.js`
- `src/utils/validation.js`
- `src/services/product-storage.js`
- `src/services/whatsapp.js`
- File sumber lain hanya bila diperlukan untuk testability.

### Perintah uji
```bash
npm test
npm run test:watch
npm run build
```

---

## Milestone 8 — Security review dan hardening

**Tujuan:** memeriksa risiko frontend-only, validasi data, rendering input, dan perilaku tautan eksternal.

### Pekerjaan
- [ ] Audit semua jalur render data pengguna/import; hindari menyisipkan teks input mentah sebagai HTML (termasuk field `asal`).
- [ ] Gunakan `textContent`, DOM API, atau escaping yang teruji untuk teks dinamis.
- [ ] Pastikan atribut URL dan style tidak menerima nilai tak tepercaya tanpa validasi/allowlist.
- [ ] Validasi ulang data produk pada batas masuk: form, localStorage, dan impor JSON.
- [ ] Pastikan URL WhatsApp dibentuk dari nomor konfigurasi tervalidasi dan pesan ter-encode.
- [ ] Pastikan tautan tab baru memakai `rel="noopener noreferrer"`.
- [ ] Audit dependency dengan `npm audit`; evaluasi temuan sebelum memperbarui dependency.
- [ ] Pastikan tidak ada secret, token, API key, kredensial, endpoint backend, atau data pribadi di repository/build.
- [ ] Periksa aksesibilitas yang berdampak pada keamanan interaksi: label, fokus terlihat, dialog modal, konfirmasi aksi destruktif, dan pesan error.
- [ ] Verifikasi pasangan warna final pada mode terang dan gelap: teks normal minimal 4.5:1 dan teks besar/komponen penting minimal 3:1 (terutama emas tua pada krem dan teks sekunder).
- [ ] Tinjau deskripsi produk senjata agar tidak memuat klaim keaslian, usia, atau tuah.
- [ ] Dokumentasikan keterbatasan: dashboard tidak memiliki autentikasi/otorisasi; localStorage dapat diedit oleh pengguna; data tidak cocok untuk informasi sensitif atau operasional produksi.

### Acceptance criteria
- [ ] Tidak ada jalur XSS yang diketahui melalui nama, kategori, asal, deskripsi, atau data hasil impor.
- [ ] Impor JSON tidak dapat menyisipkan markup/script atau nilai model di luar aturan.
- [ ] Tidak ada tautan eksternal yang membuka tab baru tanpa proteksi opener.
- [ ] Tidak ada secret atau kredensial dalam source maupun artefak build.
- [ ] `npm audit` ditinjau; temuan yang dapat ditindaklanjuti diperbaiki atau dicatat dengan alasan dan mitigasi.
- [ ] Kontras warna final memenuhi target UI-SPEC atau pengecualian didokumentasikan dan diperbaiki sebelum rilis.
- [ ] Aplikasi tetap jelas sebagai demo lokal tanpa perlindungan akun; tidak mengklaim data localStorage aman dari pengguna perangkat.
- [ ] Seluruh test otomatis dan build lulus setelah hardening.

### File yang disentuh
- `src/**/*.js`
- `index.html`
- `src/styles/main.css`
- `package.json`
- `package-lock.json`
- `README.md`
- `SECURITY.md` (opsional, untuk mencatat hasil review dan batasan)

### Perintah uji
```bash
npm test
npm audit
npm run build
```
Pemeriksaan manual: masukkan teks seperti `<img src=x onerror=alert(1)>` pada field teks dan file impor; pastikan tampil sebagai teks biasa. Uji juga tautan WhatsApp, keyboard, modal, dan kontras.

---

## Milestone 9 — Deployment

**Tujuan:** menerbitkan hasil build frontend statis pada hosting yang mendukung static site.

> Deployment produksi/domain publik berada di luar scope `SPEC.md`; milestone ini adalah perluasan yang diminta. Pilih satu static host (misalnya GitHub Pages, Netlify, atau Vercel) sebelum konfigurasi final. Tidak ada server aplikasi atau backend yang perlu dideploy.

### Pekerjaan
- [ ] Pilih target hosting dan catat URL publik serta pemilik/proyek deployment.
- [ ] Konfigurasikan base path Vite bila hosting menggunakan subpath.
- [ ] Pastikan seluruh aset bersifat lokal atau memang diperlukan; jangan mengandalkan aset eksternal yang tidak disetujui.
- [ ] Pastikan nomor WhatsApp toko sudah diganti dan diverifikasi oleh pemilik sebelum publikasi; jangan menerbitkan nomor contoh.
- [ ] Minta pemilik toko memeriksa aturan setempat terkait penjualan dan pengiriman senjata tradisional sebelum katalog dipublikasikan untuk penggunaan nyata.
- [ ] Tambahkan dokumentasi build dan deployment pada README.
- [ ] Jalankan test dan build bersih sebelum deploy.
- [ ] Deploy direktori `dist/` sebagai static site.
- [ ] Lakukan smoke test pada URL publik, desktop, dan mobile.
- [ ] Pastikan tidak ada data demo sensitif; ingat setiap pengunjung memiliki localStorage masing-masing dan data tidak dibagikan ke pengelola/perangkat lain.

### Acceptance criteria
- [ ] Build produksi selesai tanpa error.
- [ ] URL publik dapat diakses melalui HTTPS.
- [ ] Navigasi Katalog/Dashboard dan refresh halaman bekerja pada hosting target.
- [ ] Delapan produk seed tampil pada browser baru.
- [ ] Search/filter/sort, CRUD demo, localStorage, import/export, dan reset berfungsi di URL publik.
- [ ] Tautan WhatsApp menuju nomor toko yang telah dikonfirmasi, dengan pesan awal yang benar.
- [ ] Tidak ada asset path rusak atau error runtime yang menghalangi fungsi utama.
- [ ] Layout lolos smoke test desktop dan viewport 360 px/320 px tanpa overflow halaman.
- [ ] README mencatat URL deployment, langkah deploy ulang, dan batasan penyimpanan lokal.
- [ ] Tidak ada klaim sinkronisasi, autentikasi, backup server, atau keamanan data yang tidak disediakan aplikasi.

### File yang disentuh
- `vite.config.js`
- `package.json` (bila ada script deploy)
- `README.md`
- Konfigurasi hosting yang dipilih (misalnya `netlify.toml`, `vercel.json`, atau workflow GitHub Actions)
- `src/config/app.js` (hanya untuk konfigurasi nomor toko yang telah dikonfirmasi)

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
- [ ] Nomor WhatsApp contoh tidak tertinggal pada rilis publik.
- [ ] Dokumentasi menjelaskan cara menjalankan proyek, mengganti nomor WhatsApp, backup/restore JSON, deployment, dan batasan localStorage.
- [ ] Produk senjata tetap diposisikan sebagai replika dan koleksi budaya tanpa klaim keaslian, usia, atau tuah.
- [ ] Tidak ada backend, autentikasi, pembayaran, upload gambar, atau fitur di luar scope yang ditambahkan diam-diam.