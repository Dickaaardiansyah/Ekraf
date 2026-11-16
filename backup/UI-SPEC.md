# UI-SPEC.md — PusakaJawa
 
> Spesifikasi antarmuka untuk MVP katalog UMKM busana dan pusaka tradisional Jawa serta dashboard demo. Dokumen ini menjadi acuan desain sebelum implementasi; belum mencakup kode.
 
## 1. Arah visual dan prinsip desain
 
**Konsep:** *berwibawa, hangat, rapi, dan terpercaya*. PusakaJawa perlu terasa seperti etalase perajin UMKM budaya Jawa—bukan marketplace besar, bukan toko suvenir ramai, dan bukan aplikasi kasir korporat.
 
Prinsip:
- Krem sogan menjadi latar utama; biru nila untuk navigasi, aksi utama, dan identitas; emas tua hanya untuk penanda pilihan dan detail kecil.
- Gunakan aksen warna secara hemat agar placeholder produk tetap menjadi fokus.
- Informasi produk, asal daerah, dan harga harus mudah dipindai.
- Antarmuka mobile-first: fungsi inti tetap nyaman pada layar sempit dan dapat digunakan dengan satu tangan.
- Komponen dan pola interaksi konsisten antara katalog dan dashboard.
- Motif batik hanya sebagai latar dekoratif hero; jangan dipakai di belakang teks yang harus dibaca.
- Produk senjata selalu diposisikan sebagai replika dan koleksi budaya, tanpa klaim tuah atau keaslian pusaka.
## 2. Design tokens
 
### 2.1 Palet warna (mode terang)
 
| Token | Hex | Pemakaian |
|---|---|---|
| `color-bg` | `#F3EDE1` | Latar halaman krem sogan |
| `color-surface` | `#FBF7EE` | Kartu, panel, modal, navbar |
| `color-surface-soft` | `#EDE3CF` | Latar sekunder, placeholder lembut |
| `color-text` | `#261C14` | Teks utama |
| `color-text-muted` | `#615646` | Teks sekunder, deskripsi, metadata |
| `color-primary` | `#2F3D63` | Biru nila, tombol utama, tautan penting |
| `color-primary-hover` | `#232E4D` | Hover/fokus tombol nila |
| `color-primary-soft` | `#E2E7F2` | Navigasi aktif, tombol sekunder |
| `color-accent` | `#7F5A14` | Emas tua, label pilihan, eyebrow |
| `color-accent-soft` | `#F1E4C6` | Latar badge pilihan |
| `color-border` | `#E4DAC6` | Border input, kartu, divider |
| `color-danger` | `#A8382F` | Hapus, error, validasi, stok menipis |
| `color-danger-soft` | `#F6E1DE` | Latar aksi destruktif |
| `color-disabled` | `#6E6455` | Teks/ikon nonaktif |
 
### 2.2 Palet mode gelap
Mode gelap mengikuti pengaturan sistem (`prefers-color-scheme`) dan memakai token yang sama dengan nilai berikut.
 
| Token | Hex |
|---|---|
| `color-bg` | `#16130F` |
| `color-surface` | `#211C15` |
| `color-text` | `#EFE6D6` |
| `color-text-muted` | `#A69A88` |
| `color-primary` | `#D4A64F` (teks tombol `#1A140C`) |
| `color-primary-soft` | `#2E2819` |
| `color-accent` | `#D4A64F` |
| `color-border` | `#352E24` |
| `color-danger` | `#E8877D` |
| `color-danger-soft` | `#3A2321` |
 
**Ketentuan kontras:**
- Teks utama di atas `color-bg` atau `color-surface`.
- Teks sekunder memakai `color-text-muted`, bukan krem/abu muda.
- Tombol nila memakai teks putih; tombol emas pada mode gelap memakai teks gelap.
- Aksen emas dan merah tidak boleh menjadi satu-satunya pembeda status; sertakan teks atau ikon.
- Target minimum WCAG AA: 4.5:1 untuk teks normal, 3:1 untuk teks besar dan komponen grafis penting. Verifikasi pasangan warna final dengan contrast checker sebelum rilis (terutama `color-accent` pada `color-bg` dan `color-text-muted` pada `color-surface-soft`).
- Status stok habis harus ditulis “Stok habis”, bukan hanya dibedakan dengan warna.
### 2.3 Tipografi
Tanpa layanan font eksternal; seluruh tampilan terbaca dengan font sistem.
 
- **Judul/display:** Georgia, fallback `"Times New Roman", serif`. Memberi kesan klasik dan berwibawa.
- **Teks/UI:** `ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`.
- Judul memakai bobot 500–600; label navigasi 600–650.
- Harga memakai sans-serif bold dan format Rupiah konsisten.
- Label dan eyebrow memakai sentence case, bukan huruf kapital semua.
Skala tipografi:
 
| Gaya | Desktop | Mobile | Penggunaan |
|---|---:|---:|---|
| Display | 52–62 px | 38–42 px | Judul hero |
| H1 halaman | 38–42 px | 30–34 px | Judul dashboard |
| H2 bagian | 28–32 px | 24–28 px | Judul katalog/section |
| H3/kartu | 16–18 px | 14–17 px | Nama produk |
| Body | 15–16 px | 14–16 px | Paragraf/deskripsi |
| Label | 12–14 px | 12–13 px | Kategori, asal, stok, form |
| Caption | 11–12 px | 11–12 px | Metadata tambahan |
 
### 2.4 Spasi, radius, dan elevasi
- Basis spacing 4 px; gunakan ritme 8, 12, 16, 24, 32, 48, dan 64 px.
- Radius kartu produk 16 px; panel dan modal 14–18 px; input/tombol 10–12 px; badge berbentuk pill. Hero memakai radius 26 px sebagai satu-satunya elemen besar.
- Border tipis `1px solid color-border`.
- Bayangan hanya muncul saat hover kartu; jangan mengandalkan shadow sebagai pembatas utama.
- Kontainer desktop maksimal sekitar 1180 px, dengan gutter 28 px; mobile gutter 17 px.
## 3. Struktur navigasi dan layout global
 
### 3.1 Navbar sticky
- Tinggi desktop sekitar 76 px; mobile 67 px.
- Posisi sticky di bagian atas dengan latar `color-surface` sedikit transparan dan border bawah. Pada ponsel, area aman (safe area) di atas navbar ikut diberi latar yang sama.
- Kiri: logo mark (kotak nila dengan ikon 🗡️) dan wordmark “PusakaJawa”, dengan tagline pendek “Busana dan pusaka tradisi Jawa”.
- Kanan: navigasi **Katalog** dan **Dashboard**.
- Item aktif memakai teks nila dan latar `color-primary-soft`.
- Navbar tidak boleh menutupi konten ketika navigasi/anchor digunakan.
- Dashboard diberi keterangan bahwa ini area pengelolaan demo pada perangkat yang sama; jangan tampilkan seolah-olah login diperlukan.
### 3.2 Lebar layar dan breakpoint
Pendekatan mobile-first:
- **Mobile:** 320–649 px.
- **Tablet:** 650–899 px.
- **Desktop:** 900 px ke atas.
- Di bawah 360 px, kontrol boleh membungkus menjadi beberapa baris; tidak boleh terjadi overflow horizontal.
- Grid produk: 2 kolom pada mobile umum, 3 kolom tablet, 4 kolom desktop. Pada layar sangat sempit 320 px, 2 kolom hanya dipertahankan jika kartu tetap terbaca; jika tidak, gunakan 1 kolom.
- Kartu ringkasan dashboard: 4 kolom desktop, 2 kolom tablet dan mobile.
## 4. Spesifikasi halaman katalog
 
### 4.1 Hero
- Diletakkan tepat setelah navbar.
- Desktop: dua kolom. Kolom kiri memuat eyebrow, headline, deskripsi singkat. Kolom kanan memuat ilustrasi.
- Mobile: satu kolom; teks terlebih dahulu, ilustrasi di bawahnya dengan tinggi lebih ringkas.
- Eyebrow: “Karya perajin Jawa”. Headline ramah dan berwibawa, contoh: “Warisan leluhur, untuk hari ini.”
- Ilustrasi: emoji 🗡️ di dalam lingkaran berbingkai emas, di atas latar pola batik sederhana yang dibuat dengan CSS. Catatan “Replika dan koleksi budaya” tampil sebagai label kecil di sudut ilustrasi.
- Emoji dan pola hanya dekorasi; jangan menyampaikan informasi penting hanya lewat ilustrasi.
- Tidak menggunakan foto stok atau aset berhak cipta.
### 4.2 Judul katalog dan toolbar
- Judul bagian “Koleksi pilihan” dengan deskripsi singkat dan jumlah hasil.
- Toolbar berisi:
  1. Pencarian teks, placeholder “Cari keris, beskap, batik...”.
  2. Filter kategori: Semua kategori, Senjata, Pakaian, Aksesori (opsi mengikuti data).
  3. Sorting: Pilihan kami, Nama A–Z, Harga terendah, Harga tertinggi, Stok terbanyak.
- Desktop: pencarian fleksibel mengambil ruang terbesar; filter dan sorting sejajar di kanan.
- Mobile: pencarian satu baris penuh; filter dan sorting di baris berikutnya, masing-masing mengambil lebar yang cukup atau 50:50.
- Semua kontrol memiliki label aksesibel, bukan placeholder saja.
- Perubahan filter/sorting langsung memperbarui grid tanpa tombol “Terapkan”.
### 4.3 Kartu produk
Urutan konten:
1. Area visual placeholder lokal/emoji.
2. Badge “✦ Pilihan” bila `unggulan = true`.
3. Kategori (kiri) dan asal daerah (kanan).
4. Nama produk.
5. Deskripsi ringkas, maksimal sekitar 2 baris.
6. Harga Rupiah dan informasi stok pada satu baris.
7. Tombol “Pesan via WhatsApp”.
Ketentuan:
- Tinggi dan komposisi kartu konsisten dalam satu baris grid.
- Placeholder memiliki warna latar lembut yang bervariasi secara terkontrol.
- Harga paling menonjol setelah nama produk.
- Stok habis tetap ditampilkan sebagai teks “Habis” pada baris harga, dan tombol diganti status nonaktif “Stok habis”. Jangan menyamarkan stok nol.
- Tombol WhatsApp berwarna `color-primary` dengan label teks; ikon WhatsApp boleh digunakan jika tersedia secara sah, tetapi teks tetap wajib ada.
- Tautan membuka WhatsApp di tab baru dan membawa pesan awal yang menyebut nama produk. Nomor tujuan berasal dari konfigurasi, bukan ditampilkan sebagai data produk.
### 4.4 Empty state
Sediakan empty state untuk dua kondisi:
- **Tidak ada hasil pencarian/filter:** ilustrasi sederhana (misalnya ⌕), judul “Produk tidak ditemukan”, teks “Coba kata kunci atau kategori lain”, dan aksi “Hapus filter” bila filter aktif.
- **Katalog kosong:** judul “Belum ada produk”, penjelasan bahwa pengelola dapat menambahkan produk melalui dashboard. Tampilkan tautan navigasi ke Dashboard hanya sebagai pintasan, bukan sebagai checkout.
Empty state berada di dalam area grid dan menggunakan border putus-putus atau panel lembut.
 
## 5. Spesifikasi dashboard demo
 
### 5.1 Header dashboard
- Eyebrow “Ruang pengelola”.
- Judul “Dashboard produk”.
- Deskripsi: “Kelola koleksi dan pantau stok toko.”
- Tombol utama “＋ Tambah produk” di sisi kanan desktop; pada mobile menjadi tombol di bawah judul.
- Keterangan singkat bahwa dashboard merupakan demo lokal tanpa akun/backend.
### 5.2 Kartu ringkasan
Empat kartu: sejajar di desktop, 2 kolom di tablet dan mobile:
1. **Total produk** — jumlah seluruh produk.
2. **Total stok** — penjumlahan seluruh nilai stok.
3. **Stok menipis (≤ 3)** — jumlah produk dengan stok 3 atau kurang, termasuk stok habis.
4. **Nilai persediaan** — jumlah harga × stok seluruh produk, format Rupiah.
Setiap kartu memiliki label, angka besar, dan ikon dekoratif. Angka harus menjadi fokus. Ikon bukan satu-satunya penanda makna.
 
### 5.3 Daftar produk pengelolaan
- Panel dengan judul “Daftar produk”.
- Aksi “Reset data demo” ditampilkan sebagai tombol sekunder/aksi hati-hati dan meminta konfirmasi sebelum dijalankan.
- Desktop: tabel kolom Produk, Kategori, Asal, Harga, Stok, Status, Aksi.
- Mobile: tabel boleh menjadi daftar kartu/baris ringkas atau area tabel dengan scroll internal yang jelas. Prioritaskan agar tombol Edit/Hapus tetap mudah dijangkau; jangan membuat seluruh halaman overflow horizontal.
- Stok ≤ 3 ditampilkan dengan teks tebal berwarna `color-danger`; angka stok tetap terbaca tanpa bergantung pada warna.
- Status pilihan ditampilkan sebagai teks/badge (“✦ Pilihan” atau “Reguler”).
- Tombol Edit menggunakan gaya sekunder nila; Hapus menggunakan gaya destruktif dengan teks jelas.
### 5.4 Form tambah/edit
Gunakan modal atau panel dialog:
- Judul berubah sesuai mode: “Tambah produk” atau “Edit produk”.
- Field: Nama produk, Kategori, Asal daerah, Harga (Rp), Stok, Ikon placeholder, Deskripsi, dan checkbox “Tandai sebagai koleksi pilihan”.
- Field wajib diberi label dan tanda wajib yang jelas.
- Harga menerima angka >= 0; stok menerima integer >= 0.
- Pesan validasi tampil dekat field terkait dan dapat dibaca screen reader.
- Tombol aksi: “Batal” dan “Simpan produk”.
- Saat edit, form terisi data yang sedang dipilih.
- Modal dapat ditutup melalui tombol tutup, tombol Batal, dan tombol Escape; klik pada latar gelap juga menutup modal.
### 5.5 Konfirmasi dan feedback
- Hapus produk: dialog konfirmasi menyebut nama produk yang akan dihapus.
- Reset: konfirmasi menjelaskan seluruh perubahan lokal akan diganti dengan 8 produk demo awal.
- Berhasil simpan/hapus/reset: tampilkan notifikasi singkat yang tidak menghalangi interaksi.
- Error penyimpanan: tampilkan pesan bahwa browser tidak dapat menyimpan data secara lokal.
- Tidak boleh menampilkan notifikasi sukses sebelum operasi benar-benar berhasil.
## 6. Komponen dan state UI
 
| Komponen | State/varian |
|---|---|
| Navbar link | Default, aktif, hover, focus |
| Search input | Kosong, terisi, focus |
| Select filter/sort | Default, dipilih, focus |
| Product card | Reguler, pilihan, stok habis |
| WhatsApp CTA | Aktif, nonaktif bila stok habis |
| Empty state | Hasil kosong, katalog kosong |
| Summary card | Nilai normal, nilai nol |
| Product row/card | Reguler, pilihan, stok menipis |
| Form field | Default, focus, invalid, disabled |
| Modal | Tambah, edit, konfirmasi hapus/reset |
| Toast | Sukses, peringatan, error |
 
## 7. Aksesibilitas dan usability
 
- Gunakan landmark semantik: `header`, `nav`, `main`, `section`, `footer`.
- Urutan heading logis: satu H1 utama per tampilan, dilanjutkan H2/H3.
- Semua input memiliki label yang terhubung; placeholder bukan pengganti label.
- Semua aksi dapat dijalankan dengan keyboard; fokus terlihat jelas (outline emas/nila).
- Jangan menghilangkan outline tanpa pengganti.
- Target sentuh ideal minimal 44 × 44 px.
- Teks normal memenuhi kontras WCAG AA 4.5:1; teks besar/komponen penting minimal 3:1, pada mode terang maupun gelap.
- Jangan memakai warna sebagai satu-satunya pembeda status.
- Modal mengelola fokus: fokus masuk ke modal, tidak berpindah ke konten belakang, dan kembali ke pemicu saat ditutup.
- Notifikasi dinamis memakai area `aria-live` yang sesuai.
- Hormati `prefers-reduced-motion`; animasi hover/transisi bersifat singkat dan tidak wajib untuk memahami status.
## 8. Wireframe teks
 
### 8.1 Desktop — katalog (≥ 900 px)
 
```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ [🗡 PusakaJawa]                                    [Katalog] [Dashboard]     │  Sticky navbar
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Karya perajin Jawa                         ┌─────────────────────────────┐  │
│  Warisan leluhur,                           │  ░░ pola batik ░░░░░░░░░░░  │  │
│  untuk hari ini.                            │        (🗡️)                 │  │
│  Keris, tombak, beskap, batik...            │   [Replika dan koleksi      │  │
│                                             │    budaya]                  │  │
│                                             └─────────────────────────────┘  │
│                                                                              │
│  Koleksi pilihan                                          8 produk           │
│  Cari busana adat dan pusaka sesuai kebutuhan Anda.                          │
│                                                                              │
│  [⌕ Cari keris, beskap, batik...........] [Semua kategori ▾] [Pilihan kami ▾]│
│                                                                              │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐ ┌────────────────┐│
│  │      🗡️        │ │      🗡️        │ │      🔱        │ │      🪵        ││
│  │ ✦ Pilihan      │ │ ✦ Pilihan      │ │                │ │                ││
│  │ Senjata  Solo  │ │ Senjata  Yogya │ │ Senjata Madura │ │ Aksesori Solo  ││
│  │ Keris Luk 7    │ │ Keris Sengkelat│ │ Tombak Trisula │ │ Warangka Jati  ││
│  │ Deskripsi...   │ │ Deskripsi...   │ │ Deskripsi...   │ │ Deskripsi...   ││
│  │ Rp850.000 Stok5│ │ Rp1.250.000 S3 │ │ Rp650.000 Stok4│ │ Rp300.000 Stok9││
│  │ [Pesan via WA] │ │ [Pesan via WA] │ │ [Pesan via WA] │ │ [Pesan via WA] ││
│  └────────────────┘ └────────────────┘ └────────────────┘ └────────────────┘│
│                                                                              │
│  ... baris produk berikutnya                                                 │
├──────────────────────────────────────────────────────────────────────────────┤
│ © 2026 PusakaJawa              Produk senjata berupa replika dan koleksi     │
└──────────────────────────────────────────────────────────────────────────────┘
```
 
### 8.2 Mobile — katalog (320–649 px)
 
```text
┌────────────────────────────────┐
│ [🗡 PusakaJawa] [Katalog] [Dash]│  Navbar sticky, ringkas
├────────────────────────────────┤
│ Karya perajin Jawa             │
│ Warisan leluhur,               │
│ untuk hari ini.                │
│ Keris, tombak, beskap...       │
│                                │
│       ┌────────────────┐       │
│       │      🗡️        │       │  Ilustrasi ringkas
│       └────────────────┘       │
│                                │
│ Koleksi pilihan      8 produk  │
│                                │
│ [⌕ Cari keris, beskap....]     │
│ [Semua kategori ▾]             │
│ [Pilihan kami ▾]               │
│                                │
│ ┌──────────────┐ ┌────────────┐│
│ │      🗡️      │ │     🗡️     ││
│ │ ✦ Pilihan    │ │ ✦ Pilihan  ││
│ │ Senjata Solo │ │ Senjata Yog││
│ │ Keris Luk 7  │ │ Keris Seng.││
│ │ Rp850.000    │ │ Rp1.250.000││
│ │ Stok 5       │ │ Stok 3     ││
│ │ [Pesan WA]   │ │ [Pesan WA] ││
│ └──────────────┘ └────────────┘│
│ ...                            │
│ © PusakaJawa                   │
└────────────────────────────────┘
```
 
### 8.3 Desktop — dashboard demo
 
```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ [🗡 PusakaJawa]                                    [Katalog] [Dashboard]     │
├──────────────────────────────────────────────────────────────────────────────┤
│ Ruang pengelola                                      [＋ Tambah produk]       │
│ Dashboard produk                                                             │
│ Kelola koleksi dan pantau stok toko.                                         │
│                                                                              │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────────────┐ │
│ │ Total produk │ │ Total stok   │ │ Stok menipis │ │ Nilai persediaan     │ │
│ │      8       │ │      67      │ │ (≤ 3)    2   │ │ Rp24.620.000         │ │
│ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────────────┘ │
│                                                                              │
│ ┌──────────────────────────────────────────────────────────────────────────┐ │
│ │ Daftar produk                                       [Reset data demo]    │ │
│ ├──────────────────────────────────────────────────────────────────────────┤ │
│ │ Produk      Kategori Asal    Harga      Stok Status    Aksi              │ │
│ │ 🗡️ Keris L7 Senjata  Solo    Rp850.000  5    ✦ Pilihan [Edit] [Hapus]    │ │
│ │ 🗡️ Keris S. Senjata  Yogya   Rp1.250.000 3   ✦ Pilihan [Edit] [Hapus]    │ │
│ │ 👘 Beskap   Pakaian  Yogya   Rp475.000  10   ✦ Pilihan [Edit] [Hapus]    │ │
│ │ ...                                                                      │ │
│ └──────────────────────────────────────────────────────────────────────────┘ │
│ Mode demo: data tersimpan di browser ini lewat localStorage.                 │
└──────────────────────────────────────────────────────────────────────────────┘
```
 
### 8.4 Mobile — dashboard demo
 
```text
┌────────────────────────────────┐
│ [🗡 PusakaJawa] [Katalog] [Dash]│
├────────────────────────────────┤
│ Ruang pengelola                │
│ Dashboard produk               │
│ Kelola koleksi dan pantau stok.│
│                                │
│ [＋ Tambah produk]             │
│                                │
│ ┌────────────┐ ┌─────────────┐ │
│ │ Total      │ │ Total stok  │ │
│ │ produk  8  │ │ 67          │ │
│ └────────────┘ └─────────────┘ │
│ ┌────────────┐ ┌─────────────┐ │
│ │ Stok       │ │ Nilai       │ │
│ │ menipis 2  │ │ persediaan  │ │
│ └────────────┘ └─────────────┘ │
│                                │
│ Daftar produk  [Reset data demo]│
│ ┌────────────────────────────┐ │
│ │ 🗡️ Keris Luk 7 Surakarta   │ │
│ │ Senjata, Surakarta         │ │
│ │ Rp850.000   Stok 5         │ │
│ │ ✦ Pilihan                  │ │
│ │ [Edit]          [Hapus]    │ │
│ └────────────────────────────┘ │
│ ...                            │
│ Data hanya tersimpan di browser│
└────────────────────────────────┘
```
 
### 8.5 Mobile — modal form produk
 
```text
┌────────────────────────────────┐
│ Tambah produk              [×] │
│                                │
│ Nama produk *                  │
│ [____________________________] │
│ Kategori *                     │
│ [Senjata                   ▾]  │
│ Asal daerah                    │
│ [____________________________] │
│ Harga (Rp) *     Stok *        │
│ [___________]    [___________] │
│ Ikon placeholder               │
│ [🗡️                        ▾]  │
│ Deskripsi                      │
│ [____________________________] │
│ [____________________________] │
│                                │
│ [ ] Tandai sebagai koleksi     │
│     pilihan                    │
│                                │
│             [Batal] [Simpan]   │
└────────────────────────────────┘
```
 
## 9. Perilaku responsif dan interaksi
 
- Kartu produk mempertahankan urutan informasi yang sama pada semua breakpoint.
- Kontrol pencarian/filter/sorting tidak boleh saling menutupi.
- Navbar tidak berubah menjadi hamburger pada MVP; pada layar sempit, label dapat dipadatkan tetapi dua tujuan navigasi tetap terlihat.
- Dashboard mengutamakan kartu ringkasan dan daftar produk; tabel desktop berubah menjadi daftar ringkas atau scroll internal pada mobile.
- Modal pada mobile menggunakan lebar hampir penuh, tinggi maksimal viewport, dan konten dapat discroll di dalam modal.
- Tombol aksi utama selalu memiliki label yang eksplisit.
- Hover hanya peningkatan untuk perangkat pointer; semua state penting juga tersedia melalui focus/active.
## 10. Kriteria penerimaan UI (manual)
 
1. Pada desktop, navbar berada di atas saat halaman discroll dan memuat logo serta navigasi Katalog/Dashboard.
2. Pada mobile 360 px, navbar tetap menampilkan kedua navigasi tanpa overflow horizontal.
3. Hero menampilkan headline, deskripsi, ilustrasi, dan label “Replika dan koleksi budaya”; pada mobile susunannya menjadi satu kolom.
4. Grid menampilkan 4 kolom desktop dan minimal 2 kolom pada mobile umum tanpa teks/harga terpotong.
5. Setiap kartu menampilkan kategori, asal, nama, deskripsi, harga Rupiah, stok, dan CTA WhatsApp.
6. Produk pilihan memiliki badge yang terbaca dan tidak menutupi konten.
7. Search, filter, dan sorting memiliki label yang jelas dan dapat digunakan pada desktop maupun mobile.
8. Hasil pencarian/filter kosong menampilkan empty state beserta arahan untuk mengubah pencarian/filter.
9. Dashboard menampilkan empat ringkasan: total produk, total stok, stok menipis, dan nilai persediaan.
10. Dashboard menyediakan daftar produk dengan aksi Edit/Hapus serta tombol tambah dan reset demo.
11. Form tambah/edit memiliki seluruh field model produk (termasuk asal daerah) dan validasi yang terbaca.
12. Status stok habis tidak hanya dibedakan dengan warna.
13. Semua kontrol utama dapat diakses menggunakan keyboard dan memiliki fokus yang terlihat.
14. Teks normal memenuhi rasio kontras WCAG AA 4.5:1 dan teks besar/elemen penting minimal 3:1, pada mode terang dan gelap.
15. Modal, tabel/daftar, dan toolbar tetap dapat digunakan pada viewport 320 px tanpa scroll horizontal halaman.
16. Tampilan tidak bergantung pada font eksternal untuk tetap terbaca.
17. Mode gelap mengikuti pengaturan sistem dan seluruh teks tetap terbaca.
## 11. Catatan handoff ke implementasi
 
- Dokumen ini adalah pedoman visual dan perilaku; tidak menetapkan framework atau struktur kode.
- Pertahankan kesesuaian dengan `SPEC.md`: delapan data seed, model produk yang sama (termasuk `asal`), CRUD demo, `localStorage`, tautan WhatsApp, dan tanpa backend/login.
- `imageUrl` MVP dipresentasikan sebagai placeholder lokal/emoji/CSS; jangan menambahkan upload gambar atau mengambil aset berhak cipta.
- Nomor WhatsApp harus menjadi konfigurasi yang mudah ditemukan dan diganti.
- Jangan menambahkan klaim keaslian, usia, atau tuah pada deskripsi produk senjata.
- Sebelum dianggap selesai, uji kontras warna aktual, keyboard navigation, empty state, validasi form, mode gelap, dan seluruh breakpoint.
 