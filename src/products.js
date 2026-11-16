/**
 * Data dan konfigurasi LintasRoda.
 * Prototipe menyimpan ikon pada `icon` (🛵/🏍️) dan foto unggahan pada `foto`;
 * konvensi itu dipertahankan agar data lama di localStorage tetap terbaca.
 */

export const STORAGE_KEY = "lintasroda:products:v1";

/** Key versi lama; dibaca sekali untuk migrasi, tidak pernah ditimpa atau dihapus. */
export const LEGACY_STORAGE_KEY = "lintasroda_motor_v1";

/** Salinan data rusak disimpan di sini sebelum data contoh dipulihkan. */
export const BACKUP_STORAGE_KEY = "lintasroda:products:v1:rusak";

// Ganti dengan nomor WhatsApp rental: kode negara + nomor, tanpa +, spasi, atau tanda baca.
export const WHATSAPP_NUMBER = "6289676678530";

/** Daftar kategori yang sah; validasi form memeriksa terhadap daftar ini. */
export const CATEGORIES = ["Matic", "Bebek", "Sport", "Trail"];

/** Stok sama dengan atau di bawah angka ini dianggap menipis. */
export const LOW_STOCK = 1;

export const SEED_MOTORS = [
  {
    id: "mt-001",
    nama: "Honda Vario 160",
    kategori: "Matic",
    cc: 160,
    harga: 120000,
    stok: 6,
    deskripsi: "Matic irit dan nyaman untuk keliling kota, bagasi luas.",
    icon: "🛵",
    unggulan: true,
  },
  {
    id: "mt-002",
    nama: "Yamaha NMAX 155",
    kategori: "Matic",
    cc: 155,
    harga: 180000,
    stok: 3,
    deskripsi: "Matic bongsor dengan jok empuk, cocok untuk perjalanan jauh.",
    icon: "🛵",
    unggulan: true,
  },
  {
    id: "mt-003",
    nama: "Honda Scoopy",
    kategori: "Matic",
    cc: 110,
    harga: 90000,
    stok: 8,
    deskripsi: "Ringan dan lincah, pas untuk pemula dan boncengan singkat.",
    icon: "🛵",
    unggulan: false,
  },
  {
    id: "mt-004",
    nama: "Honda Supra X 125",
    kategori: "Bebek",
    cc: 125,
    harga: 75000,
    stok: 5,
    deskripsi: "Bebek tangguh dan hemat bensin untuk pemakaian harian.",
    icon: "🏍️",
    unggulan: false,
  },
  {
    id: "mt-005",
    nama: "Kawasaki KLX 150",
    kategori: "Trail",
    cc: 150,
    harga: 200000,
    stok: 2,
    deskripsi: "Trail ringan untuk jalan berbatu dan tanjakan.",
    icon: "🏍️",
    unggulan: true,
  },
  {
    id: "mt-006",
    nama: "Honda CRF 150L",
    kategori: "Trail",
    cc: 150,
    harga: 220000,
    stok: 1,
    deskripsi: "Suspensi panjang, siap menjelajah jalur pegunungan.",
    icon: "🏍️",
    unggulan: false,
  },
  {
    id: "mt-007",
    nama: "Yamaha R15",
    kategori: "Sport",
    cc: 155,
    harga: 250000,
    stok: 2,
    deskripsi: "Sport fairing bertenaga dengan posisi berkendara agresif.",
    icon: "🏍️",
    unggulan: false,
  },
  {
    id: "mt-008",
    nama: "Kawasaki Ninja 250",
    kategori: "Sport",
    cc: 250,
    harga: 400000,
    stok: 0,
    deskripsi:
      "Sport dua silinder untuk touring jarak jauh. Sedang disewa penuh.",
    icon: "🏍️",
    unggulan: false,
  },
];
