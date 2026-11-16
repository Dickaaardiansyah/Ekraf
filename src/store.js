/**
 * State aplikasi dan persistensi localStorage.
 * Tidak menyentuh DOM, sehingga aturan data bisa diuji terpisah dari tampilan.
 * Tidak ada akun, kata sandi, atau sesi: dashboard adalah demo lokal.
 */

import {
  BACKUP_STORAGE_KEY,
  LEGACY_STORAGE_KEY,
  LOW_STOCK,
  SEED_MOTORS,
  STORAGE_KEY,
} from "./products.js";
import { parseProductsJson } from "./validation.js";

const clone = (value) => structuredClone(value);

/** @returns {boolean} `false` bila penyimpanan penuh atau tidak tersedia. */
export function writeStore(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Memuat motor dari localStorage dengan validasi struktur dan tipe tiap field.
 * - Belum ada data: data contoh (tanpa pemberitahuan).
 * - Hanya ada key versi lama: dimigrasikan bila valid; key lama dibiarkan.
 * - Data rusak: salinannya diamankan, data contoh dipulihkan, dan
 *   `notice` berisi pemberitahuan untuk ditampilkan ke pengguna.
 */
function loadProducts() {
  const seed = () => clone(SEED_MOTORS);
  let source;
  let fromLegacy = false;

  try {
    source = localStorage.getItem(STORAGE_KEY);
    if (source === null) {
      source = localStorage.getItem(LEGACY_STORAGE_KEY);
      fromLegacy = source !== null;
    }
  } catch {
    return { products: seed(), notice: null }; // localStorage tidak tersedia
  }
  if (source === null) return { products: seed(), notice: null };

  const result = parseProductsJson(source, { allowEmpty: true });
  if (result.ok) {
    if (fromLegacy) writeStore(STORAGE_KEY, result.products);
    return { products: result.products, notice: null };
  }

  try {
    localStorage.setItem(BACKUP_STORAGE_KEY, source);
  } catch {
    // Penyimpanan penuh; salinan cadangan dilewati.
  }
  const products = seed();
  writeStore(STORAGE_KEY, products);
  return {
    products,
    notice: {
      title: "Data motor di browser ini rusak, jadi data contoh dipulihkan.",
      details: result.errors,
    },
  };
}

const loaded = loadProducts();
let startupNotice = loaded.notice;

let state = {
  products: loaded.products,
  activeCat: "",
  pendingPhoto: "",
};

/** Pemberitahuan saat muat (data rusak); hanya dikembalikan sekali. */
export function takeStartupNotice() {
  const notice = startupNotice;
  startupNotice = null;
  return notice;
}

const listeners = new Set();

export function getState() {
  return state;
}

export function setState(patch) {
  state = { ...state, ...patch };
  listeners.forEach((listener) => listener(state));
}

/** @returns {() => void} berhenti berlangganan. */
export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Kategori yang punya minimal satu motor, terurut abjad. */
export const categories = (current = state) =>
  [
    ...new Set(current.products.map((motor) => motor.kategori).filter(Boolean)),
  ].sort();

/** Ringkasan untuk kartu dashboard. */
export function summary(current = state) {
  const { products } = current;
  return {
    totalProduk: products.length,
    totalStok: products.reduce(
      (sum, motor) => sum + Number(motor.stok || 0),
      0,
    ),
    kategoriAktif: categories(current).length,
    stokMenipis: products.filter(
      (motor) => Number(motor.stok || 0) <= LOW_STOCK,
    ).length,
  };
}

export function saveProducts() {
  return writeStore(STORAGE_KEY, state.products);
}
