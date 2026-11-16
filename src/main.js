/**
 * Titik masuk aplikasi: memasang seluruh event dan merender tampilan awal.
 * Logika data ada di store.js, markup di index.html, dan render di ui.js.
 */

import './style.css';
import { SEED_MOTORS, SEED_USERS, STATUS, WHATSAPP_NUMBER } from './products.js';
import {
  canEdit,
  getState,
  isStaff,
  nameOf,
  saveOrders,
  saveProducts,
  saveUsers,
  setSession,
  setState,
  uid,
} from './store.js';
import {
  closeAuthModal,
  closeProductModal,
  compressPhoto,
  days,
  initHero,
  initVideo,
  openAuthModal,
  openProductModal,
  renderAll,
  renderCatalog,
  renderDashboard,
  setAuthMode,
  setPreview,
  toast,
} from './ui.js';

const $ = (id) => document.getElementById(id);

/* ---------- Navigasi tampilan ---------- */

function showView(view, keepScroll) {
  const dashboard = view === 'dashboard';
  $('catalogView').classList.toggle('active', !dashboard);
  $('dashboardView').classList.toggle('active', dashboard);
  if (!keepScroll) window.scrollTo({ top: 0 });
  if (dashboard) renderDashboard();
}

function go(target) {
  document
    .querySelectorAll('.navlinks [data-go]')
    .forEach((button) => button.classList.toggle('active', button.dataset.go === target));

  if (target === 'dashboard') {
    if (!getState().me) {
      openAuthModal('login');
      return;
    }
    showView('dashboard');
    return;
  }

  showView('catalog', true);
  requestAnimationFrame(() =>
    $(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
  );
}

document.querySelectorAll('[data-go]').forEach((button) => {
  button.addEventListener('click', () => go(button.dataset.go));
});

/* ---------- Hero: video, judul, tautan WhatsApp ---------- */

$('heroWa').href = $('footWa').href = 'https://wa.me/' + WHATSAPP_NUMBER;
initHero();
initVideo();

/* ---------- Kontrol katalog ---------- */

$('searchInput').addEventListener('input', renderCatalog);
$('sortSelect').addEventListener('change', renderCatalog);
$('daysInput').addEventListener('input', renderCatalog);

$('chips').addEventListener('click', (event) => {
  const chip = event.target.closest('[data-cat]');
  if (!chip) return;
  setState({ activeCat: chip.dataset.cat });
  renderCatalog();
});

$('manageToggle').addEventListener('click', (event) => {
  const on = document.body.classList.toggle('manage');
  event.currentTarget.setAttribute('aria-pressed', String(on));
});

$('addCatalog').addEventListener('click', () => openProductModal());

/* ---------- Form motor ---------- */

$('pickPhoto').addEventListener('click', () => $('photoFile').click());

$('photoFile').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  event.target.value = '';
  if (!file) return;
  try {
    const photo = await compressPhoto(file);
    setState({ pendingPhoto: photo });
    setPreview();
    toast('Gambar siap disimpan.');
  } catch (error) {
    toast(error.message);
  }
});

$('clearPhoto').addEventListener('click', () => {
  setState({ pendingPhoto: '' });
  setPreview();
});

$('emoji').addEventListener('change', () => {
  if (!getState().pendingPhoto) setPreview();
});

$('closeModal').addEventListener('click', closeProductModal);
$('cancelModal').addEventListener('click', closeProductModal);
$('productModal').addEventListener('click', (event) => {
  if (event.target === $('productModal')) closeProductModal();
});

$('productForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const state = getState();

  if (!isStaff(state)) {
    toast('Hanya penjual atau admin yang bisa mengelola motor.');
    return;
  }

  const id = $('productId').value;
  const existing = state.products.find((motor) => motor.id === id);
  if (existing && !canEdit(existing, state)) {
    toast('Kamu tidak punya akses ke motor ini.');
    return;
  }

  const nama = $('name').value.trim();
  const harga = Number($('price').value);
  const stok = Number($('stock').value);
  const cc = Number($('cc').value) || 0;

  if (!nama) {
    toast('Nama motor wajib diisi.');
    $('name').focus();
    return;
  }
  if (!Number.isFinite(harga) || harga < 0) {
    toast('Tarif harus berupa angka ≥ 0.');
    $('price').focus();
    return;
  }
  if (!Number.isInteger(stok) || stok < 0) {
    toast('Unit harus bilangan bulat ≥ 0.');
    $('stock').focus();
    return;
  }

  const item = {
    id: id || `mt-${Date.now()}`,
    nama,
    kategori: $('category').value,
    cc,
    harga,
    stok,
    deskripsi: $('description').value.trim(),
    icon: $('emoji').value,
    foto: state.pendingPhoto,
    unggulan: $('featured').checked,
    ownerId: (existing || {}).ownerId || state.me.id,
  };

  const previous = state.products;
  const products = id
    ? state.products.map((motor) => (motor.id === id ? item : motor))
    : [item, ...state.products];

  setState({ products });
  if (!saveProducts()) {
    setState({ products: previous });
    return;
  }

  closeProductModal();
  renderAll();
  toast(id ? 'Motor berhasil diperbarui.' : 'Motor berhasil ditambahkan.');
});

/* ---------- Autentikasi dan peran ---------- */

$('acct').addEventListener('click', (event) => {
  if (event.target.closest('#loginBtn')) openAuthModal('login');

  if (event.target.closest('#logoutBtn')) {
    setSession(null);
    if ($('dashboardView').classList.contains('active')) go('beranda');
    renderAll();
    toast('Kamu sudah keluar.');
  }
});

document.querySelectorAll('[data-tab]').forEach((tab) => {
  tab.addEventListener('click', () => setAuthMode(tab.dataset.tab));
});

document.querySelectorAll('[data-demo]').forEach((button) => {
  button.addEventListener('click', () => {
    const user = SEED_USERS.find((candidate) => candidate.role === button.dataset.demo);
    setAuthMode('login');
    $('aEmail').value = user.email;
    $('aPass').value = user.sandi;
  });
});

$('closeAuth').addEventListener('click', closeAuthModal);
$('authModal').addEventListener('click', (event) => {
  if (event.target === $('authModal')) closeAuthModal();
});

$('authForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const state = getState();
  const email = $('aEmail').value.trim().toLowerCase();
  const password = $('aPass').value;

  if (state.authMode === 'login') {
    const user = state.users.find(
      (candidate) => candidate.email === email && candidate.sandi === password,
    );
    if (!user) {
      toast('Email atau kata sandi salah.');
      return;
    }
    setSession(user);
    closeAuthModal();
    renderAll();
    toast('Selamat datang, ' + user.nama + '.');
    return;
  }

  const nama = $('aName').value.trim();
  const role = $('aRole').value === 'seller' ? 'seller' : 'buyer';

  if (!nama) {
    toast('Nama wajib diisi.');
    return;
  }
  if (password.length < 6) {
    toast('Kata sandi minimal 6 karakter.');
    return;
  }
  if (state.users.some((candidate) => candidate.email === email)) {
    toast('Email sudah terdaftar. Silakan masuk.');
    return;
  }

  const user = { id: 'usr-' + uid(), nama, email, sandi: password, role };
  const users = [...state.users, user];
  setState({ users });
  if (!saveUsers()) {
    setState({ users: state.users });
    return;
  }
  setSession(user);
  closeAuthModal();
  renderAll();
  toast('Akun ' + (role === 'seller' ? 'penjual' : 'pembeli') + ' berhasil dibuat.');
});

/* ---------- Sewa dari kartu katalog ---------- */

$('productGrid').addEventListener('click', (event) => {
  const editButton = event.target.closest('[data-edit]');
  if (editButton) {
    const state = getState();
    const motor = state.products.find((item) => item.id === editButton.dataset.edit);
    if (motor && canEdit(motor, state)) openProductModal(motor);
    return;
  }

  const deleteButton = event.target.closest('[data-delete]');
  if (deleteButton) {
    const state = getState();
    const motor = state.products.find((item) => item.id === deleteButton.dataset.delete);
    if (motor && canEdit(motor, state) && confirm(`Hapus motor “${motor.nama}”?`)) {
      setState({ products: state.products.filter((item) => item.id !== motor.id) });
      if (saveProducts()) {
        renderAll();
        toast('Motor berhasil dihapus.');
      } else {
        location.reload();
      }
    }
  }
});

$('productGrid').addEventListener('click', (event) => {
  const link = event.target.closest('[data-rent]');
  if (!link) return;

  const state = getState();
  if (!state.me) {
    event.preventDefault();
    openAuthModal('login');
    toast('Masuk sebagai pembeli untuk menyewa.');
    return;
  }
  if (state.me.role !== 'buyer') {
    event.preventDefault();
    toast('Hanya akun pembeli yang bisa menyewa.');
    return;
  }

  const motor = state.products.find((item) => item.id === link.dataset.rent);
  if (!motor) return;

  const duration = days();
  const order = {
    id: 'od-' + uid(),
    motorId: motor.id,
    motor: motor.nama,
    buyerId: state.me.id,
    sellerId: motor.ownerId,
    hari: duration,
    total: motor.harga * duration,
    tgl: new Date().toISOString(),
    status: 'Menunggu',
  };

  setState({ orders: [order, ...state.orders] });
  saveOrders();
  renderDashboard();
  toast('Pesanan dicatat. Lanjut ke WhatsApp.');
});

$('addProduct').addEventListener('click', () => {
  if (isStaff(getState())) openProductModal();
});

/* ---------- Aksi dashboard ---------- */

$('dashboardView').addEventListener('click', (event) => {
  const state = getState();
  const target = (attribute) => event.target.closest(`[${attribute}]`);

  const editButton = target('data-edit');
  if (editButton) {
    const motor = state.products.find((item) => item.id === editButton.dataset.edit);
    if (motor && canEdit(motor, state)) openProductModal(motor);
    return;
  }

  const deleteButton = target('data-delete');
  if (deleteButton) {
    const motor = state.products.find((item) => item.id === deleteButton.dataset.delete);
    if (motor && canEdit(motor, state) && confirm(`Hapus motor “${motor.nama}”?`)) {
      setState({ products: state.products.filter((item) => item.id !== motor.id) });
      saveProducts();
      renderAll();
      toast('Motor berhasil dihapus.');
    }
    return;
  }

  const cancelButton = target('data-cancel');
  if (cancelButton) {
    const order = state.orders.find((item) => item.id === cancelButton.dataset.cancel);
    if (order && state.me && order.buyerId === state.me.id && order.status === 'Menunggu') {
      setState({
        orders: state.orders.map((item) =>
          item.id === order.id ? { ...item, status: 'Dibatalkan' } : item,
        ),
      });
      saveOrders();
      renderDashboard();
      toast('Pesanan dibatalkan.');
    }
    return;
  }

  const deleteUserButton = target('data-deluser');
  if (deleteUserButton) {
    const user = state.users.find((item) => item.id === deleteUserButton.dataset.deluser);
    if (
      state.me &&
      state.me.role === 'admin' &&
      user &&
      user.id !== state.me.id &&
      confirm(`Hapus akun “${user.nama}”? Motornya dipindahkan ke admin.`)
    ) {
      setState({
        products: state.products.map((motor) =>
          motor.ownerId === user.id ? { ...motor, ownerId: state.me.id } : motor,
        ),
        users: state.users.filter((item) => item.id !== user.id),
      });
      saveUsers();
      saveProducts();
      renderAll();
      toast('Akun dihapus.');
    }
    return;
  }

  if (target('data-reset')) {
    if (
      state.me &&
      state.me.role === 'admin' &&
      confirm('Kembalikan motor, akun, dan pesanan ke data demo awal?')
    ) {
      const products = structuredClone(SEED_MOTORS).map((motor) => ({
        ...motor,
        ownerId: 'usr-seller',
      }));
      const users = structuredClone(SEED_USERS);

      setState({ products, users, orders: [] });
      saveProducts();
      saveUsers();
      saveOrders();
      setSession(users.find((user) => user.id === state.me.id) || null);
      if (!getState().me) go('beranda');
      renderAll();
      toast('Data demo berhasil direset.');
    }
  }
});

$('dashboardView').addEventListener('change', (event) => {
  const state = getState();
  const statusSelect = event.target.closest('[data-status]');
  const roleSelect = event.target.closest('[data-role]');

  if (statusSelect && isStaff(state)) {
    const order = state.orders.find((item) => item.id === statusSelect.dataset.status);
    if (
      order &&
      STATUS.includes(statusSelect.value) &&
      (state.me.role === 'admin' || order.sellerId === state.me.id)
    ) {
      setState({
        orders: state.orders.map((item) =>
          item.id === order.id ? { ...item, status: statusSelect.value } : item,
        ),
      });
      saveOrders();
      renderDashboard();
      toast('Status pesanan diperbarui.');
    }
  }

  if (roleSelect && state.me && state.me.role === 'admin') {
    const user = state.users.find((item) => item.id === roleSelect.dataset.role);
    if (user && user.id !== state.me.id && ['admin', 'seller', 'buyer'].includes(roleSelect.value)) {
      const updated = { ...user, role: roleSelect.value };
      setState({
        users: state.users.map((item) => (item.id === user.id ? updated : item)),
        me: state.me.id === user.id ? updated : state.me,
      });
      saveUsers();
      renderAll();
      toast(`Peran ${user.nama} diubah menjadi ${nameOfRole(updated.role)}.`);
    }
  }
});

function nameOfRole(role) {
  return { admin: 'Admin', seller: 'Penjual', buyer: 'Pembeli' }[role];
}

/* ---------- Escape untuk menutup modal ---------- */

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  closeProductModal();
  closeAuthModal();
});

/* ---------- Render awal ---------- */

renderAll();
