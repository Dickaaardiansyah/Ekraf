/**
 * Validasi form motor. Fungsi murni tanpa DOM supaya mudah diuji.
 * Nilai mentah dari input (string) dicek dulu sebelum diubah menjadi angka,
 * karena Number('') bernilai 0 dan akan lolos sebagai "angka valid".
 */

import { CATEGORIES } from "./products.js";

const isBlank = (raw) => String(raw ?? "").trim() === "";

/**
 * @param {{nama:string, kategori:string, cc:string, harga:string, stok:string}} raw
 * @returns {{ok:boolean, errors:Record<string,string>, value:object|null}}
 *   `errors` berisi satu pesan per kolom yang salah, berurutan sesuai form.
 */
export function validateMotor(raw) {
  const errors = {};

  const nama = String(raw.nama ?? "").trim();
  if (!nama) errors.nama = "Nama motor wajib diisi.";

  const kategori = String(raw.kategori ?? "");
  if (!CATEGORIES.includes(kategori)) {
    errors.kategori = "Pilih jenis motor: " + CATEGORIES.join(", ") + ".";
  }

  let harga = 0;
  if (isBlank(raw.harga)) {
    errors.harga = "Tarif wajib diisi.";
  } else {
    harga = Number(raw.harga);
    if (!Number.isFinite(harga) || harga < 0)
      errors.harga = "Tarif harus berupa angka ≥ 0.";
  }

  let stok = 0;
  if (isBlank(raw.stok)) {
    errors.stok = "Unit wajib diisi.";
  } else {
    stok = Number(raw.stok);
    if (!Number.isInteger(stok) || stok < 0)
      errors.stok = "Unit harus bilangan bulat ≥ 0.";
  }

  // Kapasitas mesin boleh kosong (dianggap 0), tetapi bila diisi harus bilangan bulat ≥ 0.
  let cc = 0;
  if (!isBlank(raw.cc)) {
    cc = Number(raw.cc);
    if (!Number.isInteger(cc) || cc < 0)
      errors.cc = "Mesin (cc) harus bilangan bulat ≥ 0.";
  }

  const ok = Object.keys(errors).length === 0;
  return { ok, errors, value: ok ? { nama, kategori, cc, harga, stok } : null };
}

/* ---------- Validasi daftar produk (muat dari localStorage dan impor JSON) ---------- */

export const MAX_ITEMS = 500;
const MAX_NAME = 70;
const MAX_DESC = 180;
const IMG_PREFIX = /^data:image\/(jpeg|png|webp);base64,/;

const isPlainObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

/**
 * Memeriksa satu motor dengan tipe yang ketat (angka harus bertipe number,
 * bukan string) dan membuang field yang tidak dikenal.
 * @returns {{errors:string[], value:object|null}}
 */
export function validateProduct(item) {
  if (!isPlainObject(item))
    return { errors: ["bukan objek motor"], value: null };

  const errors = [];

  const id = typeof item.id === "string" ? item.id.trim() : "";
  if (!id) errors.push("id wajib berupa teks");

  const nama = typeof item.nama === "string" ? item.nama.trim() : "";
  if (!nama) errors.push("nama wajib berupa teks tidak kosong");
  else if (nama.length > MAX_NAME)
    errors.push(`nama maksimal ${MAX_NAME} karakter`);

  if (!CATEGORIES.includes(item.kategori)) {
    errors.push("kategori harus salah satu dari " + CATEGORIES.join(", "));
  }

  if (
    typeof item.harga !== "number" ||
    !Number.isFinite(item.harga) ||
    item.harga < 0
  ) {
    errors.push("harga harus angka ≥ 0");
  }

  if (
    typeof item.stok !== "number" ||
    !Number.isInteger(item.stok) ||
    item.stok < 0
  ) {
    errors.push("stok harus bilangan bulat ≥ 0");
  }

  const cc = item.cc ?? 0;
  if (typeof cc !== "number" || !Number.isInteger(cc) || cc < 0) {
    errors.push("cc harus bilangan bulat ≥ 0");
  }

  const deskripsi = item.deskripsi ?? "";
  if (typeof deskripsi !== "string") errors.push("deskripsi harus berupa teks");
  else if (deskripsi.length > MAX_DESC)
    errors.push(`deskripsi maksimal ${MAX_DESC} karakter`);

  const foto = item.foto ?? "";
  if (typeof foto !== "string" || (foto !== "" && !IMG_PREFIX.test(foto))) {
    errors.push("foto harus kosong atau data gambar JPG/PNG/WebP");
  }

  if (item.unggulan !== undefined && typeof item.unggulan !== "boolean") {
    errors.push("unggulan harus true atau false");
  }

  if (errors.length) return { errors, value: null };

  return {
    errors,
    value: {
      id,
      nama,
      kategori: item.kategori,
      cc,
      harga: item.harga,
      stok: item.stok,
      deskripsi: deskripsi.trim(),
      icon: item.icon === "🏍️" ? "🏍️" : "🛵",
      foto,
      unggulan: item.unggulan === true,
    },
  };
}

/**
 * Memeriksa seluruh daftar. Semua-atau-tidak-sama-sekali: satu item salah
 * membuat seluruh daftar ditolak, sehingga hasilnya mudah diprediksi.
 * Menerima array motor, atau objek `{ products: [...] }`.
 * @returns {{ok:boolean, products:object[], errors:string[]}}
 */
export function validateProductList(data, { allowEmpty = false } = {}) {
  const list = Array.isArray(data)
    ? data
    : isPlainObject(data) && Array.isArray(data.products)
      ? data.products
      : null;

  if (!list)
    return {
      ok: false,
      products: [],
      errors: ["Isi harus berupa array motor."],
    };
  if (list.length > MAX_ITEMS) {
    return {
      ok: false,
      products: [],
      errors: [`Maksimal ${MAX_ITEMS} motor per file.`],
    };
  }
  if (!list.length && !allowEmpty) {
    return { ok: false, products: [], errors: ["File tidak berisi motor."] };
  }

  const errors = [];
  const products = [];
  const seen = new Set();

  list.forEach((item, index) => {
    const result = validateProduct(item);
    const label =
      `Motor ke-${index + 1}` +
      (typeof item?.nama === "string" && item.nama.trim()
        ? ` (“${item.nama.trim().slice(0, 30)}”)`
        : "");

    if (result.errors.length) {
      errors.push(`${label}: ${result.errors.join("; ")}.`);
      return;
    }
    if (seen.has(result.value.id)) {
      errors.push(`${label}: id “${result.value.id}” dipakai dua kali.`);
      return;
    }
    seen.add(result.value.id);
    products.push(result.value);
  });

  return errors.length
    ? { ok: false, products: [], errors }
    : { ok: true, products, errors: [] };
}

/** Mengurai teks JSON lalu memvalidasinya; kesalahan parse dilaporkan sebagai error biasa. */
export function parseProductsJson(text, options) {
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    return { ok: false, products: [], errors: ["Teks bukan JSON yang valid."] };
  }
  return validateProductList(data, options);
}
