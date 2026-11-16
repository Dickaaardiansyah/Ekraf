/**
 * Titik masuk aplikasi: memasang seluruh event dan merender tampilan awal.
 * Logika data ada di store.js, aturan validasi di validation.js, markup di
 * index.html, dan render di ui.js. Tidak ada login: katalog dan dashboard
 * terbuka untuk siapa saja pada browser yang sama (demo lokal).
 */

import "./style.css";
import { CATEGORIES, SEED_MOTORS, WHATSAPP_NUMBER } from "./products.js";
import {
  getState,
  saveProducts,
  setState,
  takeStartupNotice,
} from "./store.js";
import { parseProductsJson, validateMotor } from "./validation.js";
import {
  closeProductModal,
  compressPhoto,
  hideNotice,
  initHero,
  initVideo,
  openProductModal,
  renderAll,
  renderCatalog,
  renderDashboard,
  setPreview,
  showNotice,
  toast,
} from "./ui.js";

const $ = (id) => document.getElementById(id);

/* ---------- Navigasi tampilan ---------- */

function showView(view, keepScroll) {
  const dashboard = view === "dashboard";
  $("catalogView").classList.toggle("active", !dashboard);
  $("dashboardView").classList.toggle("active", dashboard);
  if (!keepScroll) window.scrollTo({ top: 0 });
  if (dashboard) renderDashboard();
}

function go(target) {
  document
    .querySelectorAll(".navlinks [data-go]")
    .forEach((button) =>
      button.classList.toggle("active", button.dataset.go === target),
    );

  if (target === "dashboard") {
    showView("dashboard");
    return;
  }

  showView("catalog", true);
  requestAnimationFrame(() =>
    $(target)?.scrollIntoView({ behavior: "smooth", block: "start" }),
  );
}

document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => go(button.dataset.go));
});

/* ---------- Hero: video, judul, tautan WhatsApp ---------- */

$("heroWa").href = $("footWa").href = "https://wa.me/" + WHATSAPP_NUMBER;
initHero();
initVideo();

/* ---------- Kontrol katalog ---------- */

$("searchInput").addEventListener("input", renderCatalog);
$("sortSelect").addEventListener("change", renderCatalog);
$("daysInput").addEventListener("input", renderCatalog);

$("chips").addEventListener("click", (event) => {
  const chip = event.target.closest("[data-cat]");
  if (!chip) return;
  setState({ activeCat: chip.dataset.cat });
  renderCatalog();
});

$("manageToggle").addEventListener("click", (event) => {
  const on = document.body.classList.toggle("manage");
  event.currentTarget.setAttribute("aria-pressed", String(on));
});

$("addCatalog").addEventListener("click", () => openProductModal());
$("addProduct").addEventListener("click", () => openProductModal());

/* ---------- Form motor ---------- */

// Kolom data -> id input di form, berurutan seperti tampilan form.
const FIELD_INPUT = {
  nama: "name",
  kategori: "category",
  harga: "price",
  stok: "stock",
  cc: "cc",
};

function showFormError(message, inputId) {
  const box = $("formError");
  box.textContent = message;
  box.hidden = !message;
  Object.values(FIELD_INPUT).forEach((id) =>
    $(id).removeAttribute("aria-invalid"),
  );
  if (inputId) {
    $(inputId).setAttribute("aria-invalid", "true");
    $(inputId).focus();
  }
}

$("pickPhoto").addEventListener("click", () => $("photoFile").click());

$("photoFile").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  event.target.value = "";
  if (!file) return;
  try {
    const photo = await compressPhoto(file);
    setState({ pendingPhoto: photo });
    setPreview();
    toast("Gambar siap disimpan.");
  } catch (error) {
    toast(error.message);
  }
});

$("clearPhoto").addEventListener("click", () => {
  setState({ pendingPhoto: "" });
  setPreview();
});

$("emoji").addEventListener("change", () => {
  if (!getState().pendingPhoto) setPreview();
});

function closeForm() {
  showFormError("");
  closeProductModal();
}

$("closeModal").addEventListener("click", closeForm);
$("cancelModal").addEventListener("click", closeForm);
$("productModal").addEventListener("click", (event) => {
  if (event.target === $("productModal")) closeForm();
});

$("productForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const state = getState();

  const result = validateMotor({
    nama: $("name").value,
    kategori: $("category").value,
    cc: $("cc").value,
    harga: $("price").value,
    stok: $("stock").value,
  });

  if (!result.ok) {
    const field = Object.keys(FIELD_INPUT).find((key) => result.errors[key]);
    showFormError(result.errors[field], FIELD_INPUT[field]);
    return;
  }

  const id = $("productId").value;
  const existing = state.products.find((motor) => motor.id === id);
  if (id && !existing) {
    showFormError(
      "Motor ini sudah tidak ada. Tutup form lalu muat ulang halaman.",
    );
    return;
  }

  const item = {
    id: id || `mt-${Date.now()}`,
    ...result.value,
    deskripsi: $("description").value.trim(),
    icon: $("emoji").value,
    foto: state.pendingPhoto,
    unggulan: $("featured").checked,
  };

  const previous = state.products;
  const products = id
    ? previous.map((motor) => (motor.id === id ? item : motor))
    : [item, ...previous];

  setState({ products });
  if (!saveProducts()) {
    setState({ products: previous });
    showFormError(
      "Gagal menyimpan: penyimpanan browser penuh. Coba gambar yang lebih kecil.",
    );
    return;
  }

  closeForm();
  renderAll();
  toast(id ? "Motor berhasil diperbarui." : "Motor berhasil ditambahkan.");
});

/* ---------- Edit dan hapus (katalog dan dashboard) ---------- */

function handleManage(event) {
  const editButton = event.target.closest("[data-edit]");
  if (editButton) {
    const motor = getState().products.find(
      (item) => item.id === editButton.dataset.edit,
    );
    if (motor) openProductModal(motor);
    return;
  }

  const deleteButton = event.target.closest("[data-delete]");
  if (deleteButton) {
    const { products } = getState();
    const motor = products.find(
      (item) => item.id === deleteButton.dataset.delete,
    );
    if (!motor) return;
    if (
      !confirm(
        `Hapus motor “${motor.nama}”? Tindakan ini tidak bisa dibatalkan.`,
      )
    )
      return;

    setState({ products: products.filter((item) => item.id !== motor.id) });
    if (!saveProducts()) {
      setState({ products });
      toast("Gagal menyimpan perubahan. Motor tidak dihapus.");
      return;
    }
    renderAll();
    toast("Motor berhasil dihapus.");
    return;
  }

  if (event.target.closest("[data-export]")) {
    exportProducts();
    return;
  }

  if (event.target.closest("[data-import]")) {
    $("importFile").click();
    return;
  }

  if (event.target.closest("[data-reset]")) {
    if (
      !confirm(
        "Kembalikan data motor ke data demo awal? Perubahanmu akan hilang.",
      )
    )
      return;
    const previous = getState().products;
    setState({ products: structuredClone(SEED_MOTORS), activeCat: "" });
    if (!saveProducts()) {
      setState({ products: previous });
      toast("Gagal menyimpan. Data tidak direset.");
      return;
    }
    renderAll();
    toast("Data demo berhasil direset.");
  }
}

/* ---------- Export dan import JSON ---------- */

const MAX_IMPORT_BYTES = 8 * 1024 * 1024;

function exportProducts() {
  const json = JSON.stringify(getState().products, null, 2);
  const url = URL.createObjectURL(
    new Blob([json], { type: "application/json" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = `lintasroda-produk-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast("Data diekspor.");
}

function importFailed(errors) {
  showNotice("Impor gagal. Data lama tidak diubah.", errors);
  toast("Impor gagal. Data lama tetap aman.");
}

$("importFile").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  event.target.value = "";
  if (!file) return;

  if (file.size > MAX_IMPORT_BYTES) {
    importFailed(["Ukuran file maksimal 8 MB."]);
    return;
  }

  let text;
  try {
    text = await file.text();
  } catch {
    importFailed(["File tidak bisa dibaca."]);
    return;
  }

  const result = parseProductsJson(text);
  if (!result.ok) {
    importFailed(result.errors);
    return;
  }

  const previous = getState().products;
  if (
    !confirm(
      `Ganti ${previous.length} motor saat ini dengan ${result.products.length} motor dari file? Data saat ini akan tertimpa.`,
    )
  ) {
    return;
  }

  setState({ products: result.products, activeCat: "" });
  if (!saveProducts()) {
    setState({ products: previous });
    importFailed(["Penyimpanan browser penuh atau tidak tersedia."]);
    return;
  }

  hideNotice();
  renderAll();
  toast(`${result.products.length} motor berhasil diimpor.`);
});

$("noticeClose").addEventListener("click", hideNotice);

$("productGrid").addEventListener("click", handleManage);
$("dashboardView").addEventListener("click", handleManage);

/* ---------- Escape untuk menutup modal ---------- */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeForm();
});

/* ---------- Render awal ---------- */

const startup = takeStartupNotice();
if (startup) showNotice(startup.title, startup.details);

renderAll();
