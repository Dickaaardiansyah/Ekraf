/**
 * State aplikasi dan persistensi localStorage.
 * Tidak menyentuh DOM, sehingga aturan data bisa diuji terpisah dari tampilan.
 */

import {
  SEED_MOTORS,
  SEED_USERS,
  STORAGE_KEY,
  USERS_KEY,
  ORDERS_KEY,
  SESSION_KEY,
} from './products.js';

const clone = (value) => structuredClone(value);

/** Membaca array dari localStorage; fallback ke data seed bila kosong/rusak. */
export function readStore(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return clone(fallback);
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : clone(fallback);
  } catch {
    return clone(fallback);
  }
}

/** @returns {boolean} `false` bila penyimpanan penuh atau tidak tersedia. */
export function writeStore(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function createState() {
  const products = readStore(STORAGE_KEY, SEED_MOTORS);
  // Data lama tanpa pemilik dianggap milik akun penjual demo.
  products.forEach((motor) => {
    if (!motor.ownerId) motor.ownerId = 'usr-seller';
  });

  const users = readStore(USERS_KEY, SEED_USERS);
  const orders = readStore(ORDERS_KEY, []);

  let me = null;
  try {
    me = users.find((user) => user.id === localStorage.getItem(SESSION_KEY)) || null;
  } catch {
    me = null;
  }

  return {
    products,
    users,
    orders,
    me,
    activeCat: '',
    pendingPhoto: '',
    authMode: 'login',
  };
}

let state = createState();
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

export const isStaff = (current = state) =>
  !!current.me && (current.me.role === 'admin' || current.me.role === 'seller');

export const canEdit = (motor, current = state) =>
  !!current.me &&
  (current.me.role === 'admin' ||
    (current.me.role === 'seller' && motor.ownerId === current.me.id));

export const nameOf = (id, current = state) =>
  current.users.find((user) => user.id === id)?.nama || '-';

export const uid = () => Math.random().toString(36).slice(2, 9);

export function myOrders(current = state) {
  if (!current.me) return [];
  if (current.me.role === 'admin') return current.orders;
  if (current.me.role === 'seller') {
    return current.orders.filter((order) => order.sellerId === current.me.id);
  }
  return current.orders.filter((order) => order.buyerId === current.me.id);
}

export const categories = (current = state) => [
  ...new Set(current.products.map((motor) => motor.kategori).filter(Boolean)),
].sort();

export function saveProducts() {
  return writeStore(STORAGE_KEY, state.products);
}

export function saveUsers() {
  return writeStore(USERS_KEY, state.users);
}

export function saveOrders() {
  return writeStore(ORDERS_KEY, state.orders);
}

/** Menyimpan sesi login aktif (hanya id pengguna) pada localStorage. */
export function setSession(user) {
  try {
    if (user) localStorage.setItem(SESSION_KEY, user.id);
    else localStorage.removeItem(SESSION_KEY);
  } catch {
    // localStorage tidak tersedia; sesi tetap berlaku selama halaman terbuka.
  }
  state = { ...state, me: user };
}
