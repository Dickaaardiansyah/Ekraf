/**
 * Sumber data katalog motor.
 *
 * Sesuai SPEC.md: 8 motor seed, field `id`, `nama`, `kategori`, `cc`,
 * `harga`, `stok`, `deskripsi`, `imageUrl`, dan `unggulan`.
 * `imageUrl` memakai placeholder lokal (`local:<emoji>`), bukan foto unit.
 */

export const STORAGE_KEY = 'lintasroda_motor_v1';

/** @typedef {'Matic' | 'Bebek' | 'Sport' | 'Trail'} Kategori */

/**
 * @typedef {object} Motor
 * @property {string} id
 * @property {string} nama
 * @property {Kategori} kategori
 * @property {number} cc
 * @property {number} harga
 * @property {number} stok
 * @property {string} deskripsi
 * @property {string} imageUrl
 * @property {boolean} unggulan
 */

/** @type {Motor[]} */
export const SEED_MOTORS = [
  {
    id: 'mt-001',
    nama: 'Honda Vario 160',
    kategori: 'Matic',
    cc: 160,
    harga: 120000,
    stok: 6,
    deskripsi: 'Matic irit dan nyaman untuk keliling kota, bagasi luas.',
    imageUrl: 'local:🛵',
    unggulan: true,
  },
  {
    id: 'mt-002',
    nama: 'Yamaha NMAX 155',
    kategori: 'Matic',
    cc: 155,
    harga: 180000,
    stok: 3,
    deskripsi: 'Matic bongsor dengan posisi duduk tegak, enak untuk perjalanan jauh.',
    imageUrl: 'local:🛵',
    unggulan: true,
  },
  {
    id: 'mt-003',
    nama: 'Honda Scoopy',
    kategori: 'Matic',
    cc: 110,
    harga: 90000,
    stok: 8,
    deskripsi: 'Ringan dan lincah, cocok untuk jalan pendek di dalam kota.',
    imageUrl: 'local:🛵',
    unggulan: false,
  },
  {
    id: 'mt-004',
    nama: 'Honda Supra X 125',
    kategori: 'Bebek',
    cc: 125,
    harga: 75000,
    stok: 5,
    deskripsi: 'Bebek bandel dan hemat bahan bakar untuk pemakaian harian.',
    imageUrl: 'local:🛵',
    unggulan: false,
  },
  {
    id: 'mt-005',
    nama: 'Kawasaki KLX 150',
    kategori: 'Trail',
    cc: 150,
    harga: 200000,
    stok: 2,
    deskripsi: 'Trail ringan untuk medan berbatu dan jalur pegunungan.',
    imageUrl: 'local:🏍️',
    unggulan: true,
  },
  {
    id: 'mt-006',
    nama: 'Honda CRF 150L',
    kategori: 'Trail',
    cc: 150,
    harga: 220000,
    stok: 1,
    deskripsi: 'Trail tangguh dengan suspensi tinggi untuk jalur tanah.',
    imageUrl: 'local:🏍️',
    unggulan: false,
  },
  {
    id: 'mt-007',
    nama: 'Yamaha R15',
    kategori: 'Sport',
    cc: 155,
    harga: 250000,
    stok: 2,
    deskripsi: 'Sport fairing ringkas dengan posisi berkendara agresif.',
    imageUrl: 'local:🏍️',
    unggulan: false,
  },
  {
    id: 'mt-008',
    nama: 'Kawasaki Ninja 250',
    kategori: 'Sport',
    cc: 250,
    harga: 400000,
    stok: 0,
    deskripsi: 'Sport dua silinder untuk pengendara berpengalaman.',
    imageUrl: 'local:🏍️',
    unggulan: false,
  },
];

/** Daftar jenis unik, dipakai untuk chip filter pada milestone berikutnya. */
export const KATEGORI = [...new Set(SEED_MOTORS.map((motor) => motor.kategori))];
