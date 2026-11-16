# UI-SPEC.md — LintasRoda

> Spesifikasi antarmuka untuk MVP katalog rental motor dan dashboard armada demo. Dokumen ini menjadi acuan desain sebelum implementasi; prototype acuan: `lintasroda-rental-motor.html`.

## 1. Arah visual dan prinsip desain

**Konsep:** *gesit, jelas, dan terpercaya*. LintasRoda perlu terasa seperti rental lokal yang rapi dan cepat dipesan—bukan marketplace besar dan bukan aplikasi kasir korporat.

Prinsip:
- Latar abu kebiruan terang; aspal gelap hanya untuk hero, bagian Cara sewa, dan footer; kuning marka jalan untuk aksi utama dan penanda; biru untuk angka total dan fokus.
- Satu momen animasi utama: motor melaju di jalan pada hero. Animasi lain bersifat responsif terhadap aksi pengguna.
- Informasi motor, tarif per hari, dan total sewa harus mudah dipindai.
- Mobile-first: fungsi inti nyaman pada layar sempit dan dapat digunakan dengan satu tangan.
- Komponen dan pola interaksi konsisten antara katalog dan dashboard.
- Jangan menaruh teks yang harus dibaca di atas elemen bergerak tanpa kontras cukup.
- Ikon motor hanyalah placeholder; jangan menyiratkan foto, warna, atau kondisi unit tertentu.

## 2. Design tokens

### 2.1 Palet warna (mode terang)

| Token | Hex | Pemakaian |
|---|---|---|
| `color-bg` | `#EEF1F4` | Latar halaman |
| `color-surface` | `#FFFFFF` | Kartu, panel, modal |
| `color-surface-soft` | `#E4E8ED` | Latar sekunder, area ikon kartu |
| `color-text` | `#14161A` | Teks utama |
| `color-text-muted` | `#5F6670` | Teks sekunder, deskripsi, metadata |
| `color-asphalt` | `#17181C` | Hero, Cara sewa, footer |
| `color-primary` | `#FFC400` | Tombol utama, penanda pilihan (teks `#14161A`) |
| `color-accent` | `#2457FF` | Total sewa, fokus, tautan penting |
| `color-nav-active` | `#14161A` | Latar navigasi aktif (teks putih) |
| `color-border` | `#DBE0E6` | Border input, kartu, divider |
| `color-ok` / `color-ok-soft` | `#1D6B47` / `#DCF1E5` | Status tersedia |
| `color-danger` / `color-danger-soft` | `#C2410C` / `#FFE6DC` | Hapus, unit menipis, error |

### 2.2 Palet mode gelap
Mode gelap mengikuti pengaturan sistem (`prefers-color-scheme`) dan memakai token yang sama dengan nilai berikut. Hero, Cara sewa, dan footer tetap memakai aspal gelap.

| Token | Hex |
|---|---|
| `color-bg` | `#101215` |
| `color-surface` | `#191C21` |
| `color-surface-soft` | `#222730` |
| `color-text` | `#EEF1F4` |
| `color-text-muted` | `#9AA2AD` |
| `color-nav-active` | `#EEF1F4` (teks `#14161A`) |
| `color-border` | `#2A2F37` |
| `color-ok` / `color-ok-soft` | `#7FD1A0` / `#16301F` |
| `color-danger` / `color-danger-soft` | `#FF9A6B` / `#3A2216` |

**Ketentuan kontras:**
- Teks utama di atas `color-bg` atau `color-surface`; teks sekunder memakai `color-text-muted`.
- Tombol kuning memakai teks gelap; tombol/navigasi aktif memakai pasangan `color-nav-active` dengan teks kebalikannya.
- Warna tidak boleh menjadi satu-satunya pembeda status; sertakan teks.
- Target minimum WCAG AA: 4.5:1 untuk teks normal, 3:1 untuk teks besar dan komponen grafis penting. Verifikasi pasangan final dengan contrast checker sebelum rilis (terutama `color-accent` pada `color-bg`, `color-text-muted` pada `color-surface-soft`, dan teks abu pada aspal).
- Status unit habis harus ditulis "Sedang disewa" / "Belum tersedia", bukan hanya dibedakan dengan warna.

### 2.3 Tipografi
- **Judul/display:** Familjen Grotesk (500–700), fallback `system-ui, sans-serif`.
- **Teks/UI:** Figtree (400–800), fallback `ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`.
- Font dimuat dari Google Fonts pada prototype; pada proyek Vite boleh di-self-host (misalnya `@fontsource`). Tampilan wajib tetap terbaca dengan font fallback.
- Label dan judul memakai sentence case, bukan huruf kapital semua.
- Harga memakai font display bold dan format Rupiah konsisten.

| Gaya | Desktop | Mobile | Penggunaan |
|---|---:|---:|---|
| Display | 56–88 px (`clamp`) | 44 px | Judul hero |
| H1 halaman | 42 px | 34 px | Judul dashboard |
| H2 bagian | 32–46 px | 32 px | Judul section |
| H3/kartu | 21 px | 17 px | Nama motor |
| Body | 15 px | 14–15 px | Paragraf/deskripsi |
| Label | 12–14 px | 12–13 px | Jenis, cc, unit, form |

### 2.4 Spasi, radius, dan elevasi
- Basis spacing 4 px; ritme 8, 12, 16, 24, 32, 48, dan 64 px.
- Radius kartu motor 20 px; panel 16 px; modal 22 px; input/tombol/chip berbentuk pill; fitur 18 px.
- Border tipis `1px solid color-border`.
- Bayangan hanya muncul pada hover kartu dan elemen melayang; bukan pembatas utama.
- Kontainer desktop maksimal 1200 px, gutter 32 px; mobile gutter 18 px.

## 3. Struktur navigasi dan layout global

### 3.1 Navbar sticky
- Tinggi desktop 72 px; mobile 64 px.
- Sticky di atas dengan latar `color-bg` sedikit transparan (blur) dan border bawah. Pada ponsel, safe area atas ikut ditangani.
- Kiri: logo mark (kotak aspal dengan 🏍️ dan garis putus kuning) dan wordmark "LintasRoda".
- Kanan: **Beranda**, **Keunggulan**, **Cara Sewa**, **Katalog**, **Dashboard**. Pada layar sempit daftar ini dapat di-scroll horizontal di dalam navbar (tanpa hamburger).
- Item aktif memakai `color-nav-active`.
- Navbar tidak boleh menutupi konten saat anchor digunakan (`scroll-padding-top`).
- Dashboard diberi keterangan bahwa ini area demo pada perangkat yang sama; jangan tampilkan seolah-olah login diperlukan.

### 3.2 Lebar layar dan breakpoint
- **Mobile:** ≤ 760 px. **Tablet:** 761–1000 px. **Desktop:** > 1000 px.
- Tidak boleh terjadi overflow horizontal halaman pada 320 px.
- Grid motor: 4 kolom desktop, 3 kolom tablet, 2 kolom mobile (1 kolom pada 320 px bila kartu tidak terbaca).
- Kartu ringkasan dashboard: 4 kolom desktop, 2 kolom tablet dan mobile.
- Kartu keunggulan: 4 kolom desktop, 2 kolom tablet, 1 kolom di bawah 480 px.

## 4. Spesifikasi halaman katalog

### 4.1 Hero
- Latar aspal gelap dengan cahaya kuning lembut; tepat setelah navbar.
- Desktop: kiri berisi badge "Unit siap jalan hari ini", headline "Sewa motor, langsung gas.", deskripsi, dua tombol (Lihat Motor, Chat Admin), dan tiga statistik (model motor, unit tersedia, sewa mulai dari). Kanan berisi lingkaran berbingkai kuning dengan 🛵 melayang dan dua kartu melayang untuk motor pilihan.
- Mobile: satu kolom; ilustrasi kanan dan kartu melayang disembunyikan.
- Di dasar hero terdapat jalan beraspal dengan marka kuning putus-putus yang bergerak dan 🏍️ yang melaju melintasi layar dari kanan ke kiri.
- Statistik dihitung dari data (jumlah model, total unit, tarif terendah per hari).
- Catatan syarat dan layanan tidak boleh hanya berada di ilustrasi.

### 4.2 Toolbar katalog
- Judul "Katalog motor" dengan deskripsi singkat dan jumlah hasil.
- Toolbar berisi:
  1. Pencarian teks, placeholder "Cari Vario, Ninja, trail...".
  2. **Lama sewa** (angka 1–30 hari) dengan label terlihat.
  3. Sorting: Pilihan kami, Nama A–Z, Harga terendah, Harga tertinggi, Unit terbanyak.
- Filter jenis berupa chip di bawah toolbar: Semua, lalu jenis sesuai data. Chip aktif memakai `aria-pressed`.
- Semua kontrol memiliki label aksesibel, bukan placeholder saja.
- Perubahan kontrol langsung memperbarui grid tanpa tombol "Terapkan".
- Mobile: pencarian satu baris penuh; lama sewa dan sorting di baris berikutnya.

### 4.3 Kartu motor
Urutan konten:
1. Area ikon placeholder dengan garis jalan putus-putus di bawahnya.
2. Badge "Pilihan" (kuning) di kiri atas bila `unggulan = true`; badge unit di kanan atas ("N unit", "Sisa 1 unit", "Sedang disewa").
3. Jenis (kiri) dan kapasitas mesin (kanan).
4. Nama motor.
5. Deskripsi maksimal 2 baris.
6. Tarif: "Rp120.000 /hari".
7. Total: "N hari: Rp…" (angka total berwarna `color-accent`).
8. Tombol "Sewa via WhatsApp".

Ketentuan:
- Tinggi dan komposisi kartu konsisten dalam satu baris grid.
- Unit 0 tetap ditampilkan: badge "Sedang disewa" dan tombol nonaktif "Belum tersedia". Jangan menyamarkan unit nol.
- Tombol berlabel teks; tautan membuka WhatsApp di tab baru (`rel="noopener noreferrer"`) dengan pesan awal berisi nama motor dan lama sewa. Nomor tujuan berasal dari konfigurasi.

### 4.4 Bagian informasi
- **Keunggulan** (4 kartu): Servis rutin, Pesan lewat WhatsApp, Helm sudah termasuk, Antar jemput unit. Teks ini adalah contoh dan wajib disesuaikan pemilik.
- **Cara sewa** (3 langkah, bagian aspal): Pilih motor, Chat WhatsApp, Ambil dan berangkat (langkah ini menyebut KTP dan SIM C).

### 4.5 Empty state
- **Tidak ada hasil:** ikon ⌕, judul "Motor tidak ditemukan", teks "Coba kata kunci atau jenis lain", dan aksi "Hapus filter" bila filter aktif.
- **Katalog kosong:** judul "Belum ada motor", penjelasan bahwa pengelola dapat menambah motor melalui dashboard, dengan pintasan ke Dashboard.
- Empty state berada di dalam area grid dengan border putus-putus.

## 5. Spesifikasi dashboard demo

### 5.1 Header dashboard
- Judul "Dashboard armada" dengan deskripsi "Kelola daftar motor dan pantau unit yang tersedia."
- Tombol utama "＋ Tambah motor" di kanan desktop; pada mobile di bawah judul.
- Keterangan bahwa dashboard adalah demo lokal tanpa akun/backend.

### 5.2 Kartu ringkasan
1. **Model motor** — jumlah seluruh motor.
2. **Unit tersedia** — penjumlahan seluruh unit.
3. **Unit menipis (≤ 1)** — jumlah model dengan unit 1 atau 0.
4. **Potensi sewa per hari** — jumlah tarif × unit, format Rupiah.

Setiap kartu memiliki label, angka besar, dan ikon dekoratif.

### 5.3 Daftar motor
- Panel "Daftar motor" dengan tombol sekunder "Reset data demo" yang meminta konfirmasi.
- Desktop: tabel kolom Motor, Jenis, Mesin, Tarif/hari, Unit, Status, Aksi.
- Mobile: scroll internal pada area tabel atau daftar kartu ringkas; Edit/Hapus tetap mudah dijangkau; halaman tidak overflow.
- Status berupa teks/badge: "Tersedia", "Menipis" (unit = 1), "Disewa penuh" (unit = 0); penanda pilihan memakai ★.
- Edit bergaya sekunder; Hapus bergaya destruktif dengan teks jelas.

### 5.4 Form tambah/edit
Modal dialog:
- Judul "Tambah motor" atau "Edit motor".
- Field: Nama motor, Jenis, Mesin (cc), Tarif per hari (Rp), Unit tersedia, Ikon (🛵/🏍️), Deskripsi, dan checkbox "Tandai sebagai pilihan kami".
- Field wajib diberi tanda jelas. Tarif menerima angka >= 0; unit menerima integer >= 0.
- Pesan validasi tampil dekat field terkait dan dapat dibaca screen reader.
- Tombol aksi: "Batal" dan "Simpan motor". Saat edit, form terisi data terpilih.
- Modal dapat ditutup dengan tombol tutup, Batal, Escape, dan klik pada latar gelap.

### 5.5 Konfirmasi dan feedback
- Hapus: konfirmasi menyebut nama motor.
- Reset: konfirmasi menjelaskan seluruh perubahan lokal diganti 8 motor demo awal.
- Berhasil simpan/hapus/reset: toast singkat yang tidak menghalangi interaksi.
- Error penyimpanan: pesan bahwa browser tidak dapat menyimpan data secara lokal.
- Tidak boleh menampilkan notifikasi sukses sebelum operasi benar-benar berhasil.

## 6. Animasi dan gerak

| Elemen | Perilaku | Jenis |
|---|---|---|
| Judul hero | Kata muncul bertahap dari bawah (±0,1 detik antarkata), lalu deskripsi, tombol, dan statistik menyusul | Sekali saat dimuat |
| Jalan dan motor hero | Marka bergerak terus-menerus, 🏍️ melaju melintasi layar (±9 detik per lintasan) dengan getaran kecil | Berulang |
| Ilustrasi dan kartu melayang hero | Naik-turun pelan | Berulang |
| Angka statistik hero | Berhitung naik/turun (±0,7 detik) saat nilai berubah | Respons data |
| Kartu motor | Muncul bergantian (stagger ±55 ms) setiap grid dirender ulang | Respons aksi |
| Hover kartu | Kartu naik sedikit, ikon motor bergeser ke kanan dan membesar | Hover |
| Ikon keunggulan | Berputar sedikit saat hover | Hover |
| Modal | Overlay memudar, dialog muncul dengan efek pop | Respons aksi |

Ketentuan:
- Animasi hanya memakai `transform` dan `opacity` bila memungkinkan.
- `prefers-reduced-motion: reduce` menonaktifkan seluruh animasi dan transisi; teks hero tampil langsung, motor diam di posisi tengah.
- Tidak ada informasi penting yang hanya tersampaikan lewat gerak.

## 7. Komponen dan state UI

| Komponen | State/varian |
|---|---|
| Navbar link | Default, aktif, hover, focus |
| Search input / Lama sewa | Kosong, terisi, focus |
| Chip jenis | Default, aktif, hover, focus |
| Select sorting | Default, dipilih, focus |
| Kartu motor | Reguler, pilihan, unit menipis, disewa penuh |
| CTA WhatsApp | Aktif, nonaktif bila unit 0 |
| Empty state | Hasil kosong, katalog kosong |
| Kartu ringkasan | Nilai normal, nilai nol |
| Baris motor | Reguler, pilihan, menipis, disewa penuh |
| Form field | Default, focus, invalid, disabled |
| Modal | Tambah, edit, konfirmasi hapus/reset |
| Toast | Sukses, peringatan, error |

## 8. Aksesibilitas dan usability
- Landmark semantik: `header`, `nav`, `main`, `section`, `footer`. Satu H1 utama per tampilan, dilanjutkan H2/H3.
- Semua input memiliki label terhubung; placeholder bukan pengganti label.
- Semua aksi dapat dijalankan dengan keyboard; fokus terlihat jelas (outline biru). Jangan menghilangkan outline tanpa pengganti.
- Target sentuh ideal minimal 44 × 44 px.
- Kontras WCAG AA pada mode terang maupun gelap; warna bukan satu-satunya pembeda status.
- Modal mengelola fokus: masuk ke modal, tidak bocor ke konten belakang, dan kembali ke pemicu saat ditutup.
- Notifikasi dinamis memakai area `aria-live`.
- Elemen dekoratif bergerak (jalan, motor hero) diberi `aria-hidden="true"`.
- Hormati `prefers-reduced-motion` (lihat bagian 6).

## 9. Wireframe teks

### 9.1 Desktop — katalog (> 1000 px)

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ [🏍 LintasRoda]     [Beranda][Keunggulan][Cara Sewa][Katalog][Dashboard]     │  Sticky
├──────────────────────────────────────────────────────────────────────────────┤
│ ████████████████████████ HERO ASPAL ██████████████████████████████████████████│
│  ● Unit siap jalan hari ini                                 ┌───────────┐    │
│  Sewa motor,                                                │   (🛵)    │    │
│  langsung gas.                                              └───────────┘    │
│  Matic, bebek, sport, sampai trail...                                        │
│  [Lihat Motor] [Chat Admin]                                                  │
│  27 unit tersedia · 8 model · mulai Rp75rb/hari                              │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 🏍️ ←←←←←  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  Jalan bergerak
├──────────────────────────────────────────────────────────────────────────────┤
│  Katalog motor                                                               │
│  [⌕ Cari Vario, Ninja, trail....] Lama sewa [ 3 ] hari  [Pilihan kami ▾]     │
│  (Semua) (Bebek) (Matic) (Sport) (Trail)                       8 motor       │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐        │
│  │ Pilihan 6 unit│ │ Pilihan 3 unit│ │ Pilihan 2 unit│ │      8 unit  │        │
│  │      🛵      │ │      🛵      │ │      🏍️      │ │      🛵      │        │
│  │ Matic 160 cc │ │ Matic 155 cc │ │ Trail 150 cc │ │ Matic 110 cc │        │
│  │ Honda Vario  │ │ Yamaha NMAX  │ │ Kawasaki KLX │ │ Honda Scoopy │        │
│  │ Rp120.000/hr │ │ Rp180.000/hr │ │ Rp200.000/hr │ │ Rp90.000/hr  │        │
│  │ 3 hari: 360rb│ │ 3 hari: 540rb│ │ 3 hari: 600rb│ │ 3 hari: 270rb│        │
│  │ [Sewa via WA]│ │ [Sewa via WA]│ │ [Sewa via WA]│ │ [Sewa via WA]│        │
│  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘        │
├──────────────────────────────────────────────────────────────────────────────┤
│ LintasRoda — Bawa KTP dan SIM C yang masih berlaku.     © 2026 · WhatsApp    │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 9.2 Mobile — katalog (≤ 760 px)

```text
┌────────────────────────────────┐
│ [🏍 LintasRoda] [Beranda][Ke…→ │  Navbar scroll horizontal
├────────────────────────────────┤
│ ● Unit siap jalan hari ini     │
│ Sewa motor,                    │
│ langsung gas.                  │
│ [Lihat Motor] [Chat Admin]     │
│ 27 unit · 8 model · Rp75rb     │
│▓▓▓▓▓▓ 🏍️ ←←← ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
│ Katalog motor                  │
│ [⌕ Cari Vario, Ninja....]      │
│ Lama sewa [3] hari             │
│ [Pilihan kami ▾]               │
│ (Semua)(Bebek)(Matic)(Sport)…  │
│ ┌──────────────┐ ┌────────────┐│
│ │ Pilihan 6 un │ │ Pilihan 3  ││
│ │     🛵       │ │    🛵      ││
│ │ Honda Vario  │ │ Yamaha NMAX││
│ │ Rp120.000/hr │ │ Rp180.000  ││
│ │ 3 hari: 360rb│ │ 3 hari:540k││
│ │ [Sewa via WA]│ │ [Sewa WA]  ││
│ └──────────────┘ └────────────┘│
└────────────────────────────────┘
```

### 9.3 Desktop — dashboard demo

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ [🏍 LintasRoda]     [Beranda][Keunggulan][Cara Sewa][Katalog][Dashboard]     │
├──────────────────────────────────────────────────────────────────────────────┤
│ Dashboard armada                                       [＋ Tambah motor]      │
│ Kelola daftar motor dan pantau unit yang tersedia.                           │
│ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────────────┐ │
│ │ Model motor  │ │ Unit tersedia│ │ Unit menipis │ │ Potensi sewa per hari│ │
│ │      8       │ │      27      │ │ (≤ 1)    2   │ │ Rp3.475.000          │ │
│ └──────────────┘ └──────────────┘ └──────────────┘ └──────────────────────┘ │
│ ┌──────────────────────────────────────────────────────────────────────────┐ │
│ │ Daftar motor                                        [Reset data demo]    │ │
│ │ Motor        Jenis   Mesin  Tarif/hari  Unit Status      Aksi            │ │
│ │ 🛵 Vario 160 Matic   160cc  Rp120.000   6    Tersedia ★  [Edit] [Hapus]  │ │
│ │ 🏍️ CRF 150L  Trail   150cc  Rp220.000   1    Menipis     [Edit] [Hapus]  │ │
│ │ 🏍️ Ninja 250 Sport   250cc  Rp400.000   0    Disewa penuh[Edit] [Hapus]  │ │
│ └──────────────────────────────────────────────────────────────────────────┘ │
│ Mode demo: data tersimpan di browser ini lewat localStorage.                 │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 9.4 Mobile — modal form motor

```text
┌────────────────────────────────┐
│ Tambah motor               [×] │
│ Nama motor *                   │
│ [____________________________] │
│ Jenis *            Mesin (cc)  │
│ [Matic        ▾]   [_________] │
│ Tarif per hari (Rp) *  Unit *  │
│ [___________]      [_________] │
│ Ikon                           │
│ [🛵                        ▾]  │
│ Deskripsi                      │
│ [____________________________] │
│ [ ] Tandai sebagai pilihan kami│
│             [Batal] [Simpan]   │
└────────────────────────────────┘
```

## 10. Perilaku responsif dan interaksi
- Kartu motor mempertahankan urutan informasi yang sama pada semua breakpoint.
- Kontrol pencarian/lama sewa/sorting/chip tidak boleh saling menutupi.
- Navbar tidak berubah menjadi hamburger; pada layar sempit daftar link dapat di-scroll horizontal di dalam navbar.
- Tabel dashboard desktop berubah menjadi scroll internal atau daftar ringkas pada mobile.
- Modal pada mobile berlebar hampir penuh, tinggi maksimal viewport, dengan scroll internal.
- Hover hanya peningkatan untuk perangkat pointer; state penting juga tersedia lewat focus/active.

## 11. Kriteria penerimaan UI (manual)
1. Pada desktop, navbar tetap di atas saat discroll dan memuat logo serta lima tautan navigasi.
2. Pada mobile 360 px, navbar tidak membuat halaman overflow; seluruh tautan dapat dijangkau.
3. Hero menampilkan headline, deskripsi, tombol, statistik, jalan, dan motor yang melaju; pada mobile susunannya satu kolom.
4. Grid menampilkan 4 kolom desktop dan minimal 2 kolom pada mobile umum tanpa teks/harga terpotong.
5. Setiap kartu menampilkan jenis, cc, nama, deskripsi, tarif per hari, total sewa, jumlah unit, dan CTA WhatsApp.
6. Mengubah lama sewa langsung memperbarui total pada seluruh kartu.
7. Motor pilihan memiliki badge yang terbaca dan tidak menutupi konten.
8. Search, lama sewa, sorting, dan chip jenis memiliki label jelas dan dapat digunakan pada desktop maupun mobile.
9. Hasil kosong menampilkan empty state beserta arahan memulihkan katalog.
10. Dashboard menampilkan empat ringkasan, daftar motor dengan Edit/Hapus, serta tombol tambah dan reset demo.
11. Form tambah/edit memiliki seluruh field model motor dan validasi yang terbaca.
12. Status unit habis tidak hanya dibedakan dengan warna.
13. Semua kontrol utama dapat diakses dengan keyboard dan memiliki fokus terlihat.
14. Kontras memenuhi WCAG AA pada mode terang dan gelap.
15. Modal, daftar, dan toolbar tetap dapat digunakan pada 320 px tanpa scroll horizontal halaman.
16. Animasi hero, kartu, dan modal berjalan; dengan reduced motion aktif, semuanya berhenti dan konten tetap lengkap.
17. Mode gelap mengikuti pengaturan sistem dan seluruh teks tetap terbaca.

## 12. Catatan handoff ke implementasi
- Dokumen ini adalah pedoman visual dan perilaku; tidak menetapkan framework atau struktur kode.
- Pertahankan kesesuaian dengan `SPEC.md`: delapan data seed, model motor yang sama (termasuk `cc`), CRUD demo, `localStorage`, tautan WhatsApp, dan tanpa backend/login.
- Prototype acuan menyimpan ikon pada field `icon` (`🛵`/`🏍️`); `SPEC.md` memakai `imageUrl` (`local:🛵`). Pilih satu saat memecah ke Vite dan samakan di seluruh kode serta test.
- `imageUrl` MVP dipresentasikan sebagai placeholder lokal/emoji; jangan menambahkan upload gambar atau mengambil aset berhak cipta.
- Nomor WhatsApp harus menjadi konfigurasi yang mudah ditemukan dan diganti.
- Jangan menambahkan klaim tahun, kondisi, asuransi, atau harga khusus pada deskripsi motor.
- Sebelum dianggap selesai, uji kontras aktual, keyboard navigation, empty state, validasi form, mode gelap, reduced motion, dan seluruh breakpoint.