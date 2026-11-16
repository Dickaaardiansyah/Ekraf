/**
 * State aplikasi dan persistensi localStorage.
 *
 * Modul ini tidak menyentuh DOM supaya mudah diuji dan dipakai ulang.
 * Key penyimpanan: `lintasroda_motor_v1` (lihat SPEC.md bagian Penyimpanan).
 */

import { SEED_MOTORS, STORAGE_KEY } from './products.js';

const KATEGORI_VALID = ['Matic', 'Bebek', 'Sport', 'Trail'];

/** Menyalin seed agar state tidak pernah memutasi data sumber. */
export function cloneSeed() {
  return SEED_MOTORS.map((motor) => ({ ...motor }));
}

function isValidMotor(value) {
  if (!value || typeof value !== 'object') return false;
  return (
    typeof value.id === 'string' &&
    value.id.trim() !== '' &&
    typeof value.nama === 'string' &&
    value.nama.trim() !== '' &&
    KATEGORI_VALID.includes(value.kategori) &&
    Number.isInteger(value.cc) &&
    value.cc >= 0 &&
    Number.isFinite(value.harga) &&
    value.harga >= 0 &&
    Number.isInteger(value.stok) &&
    value.stok >= 0 &&
    typeof value.deskripsi === 'string' &&
    typeof value.imageUrl === 'string' &&
    typeof value.unggulan === 'boolean'
  );
}

function isValidList(value) {
  return Array.isArray(value) && value.length > 0 && value.every(isValidMotor);
}

/** @returns {{ motors: import('./products.js').Motor[], storageError: boolean }} */
export function loadMotors() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { motors: cloneSeed(), storageError: false };

    const parsed = JSON.parse(raw);
    if (!isValidList(parsed)) return { motors: cloneSeed(), storageError: false };

    return { motors: parsed, storageError: false };
  } catch {
    // localStorage tidak tersedia, akses ditolak, atau JSON rusak.
    return { motors: cloneSeed(), storageError: true };
  }
}

/** @returns {boolean} `false` bila penyimpanan gagal. */
export function saveMotors(motors) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(motors));
    return true;
  } catch {
    return false;
  }
}

/** State minimal: daftar motor, lama sewa, dan catatan error penyimpanan. */
function createInitialState() {
  const { motors, storageError } = loadMotors();
  return {
    motors,
    sewaHari: 1,
    storageError,
  };
}

let state = createInitialState();
const listeners = new Set();

export function getState() {
  return state;
}

/**
 * Menggabungkan perubahan state dan memberi tahu pelanggan.
 * @param {Partial<ReturnType<typeof getState>>} patch
 */
export function setState(patch) {
  state = { ...state, ...patch };
  listeners.forEach((listener) => listener(state));
}

/** @returns {() => void} fungsi untuk berhenti berlangganan. */
export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Kembalikan katalog ke 8 motor demo awal (reset data demo). */
export function resetMotors() {
  const motors = cloneSeed();
  saveMotors(motors);
  setState({ motors });
  return motors;
}
