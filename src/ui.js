/**
 * Lapisan tampilan LintasRoda: format angka, render setiap bagian, modal,
 * toast, serta inisialisasi animasi hero dan video latar.
 *
 * Teks dinamis selalu dilewatkan `safe()` sebelum masuk ke innerHTML supaya
 * input pengguna tidak dapat menjadi HTML (syarat keamanan SPEC.md).
 */

import { ROLE, STATUS, WHATSAPP_NUMBER } from './products.js';
import {
  canEdit,
  categories,
  getState,
  isStaff,
  myOrders,
  nameOf,
  setState,
} from './store.js';

const $ = (id) => document.getElementById(id);

export const rupiah = (value) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);

export const short = (value) =>
  'Rp' +
  (value >= 1e6
    ? (value / 1e6).toLocaleString('id-ID', { maximumFractionDigits: 1 }) + 'jt'
    : Math.round(value / 1e3) + 'rb');

export const safe = (value) =>
  String(value ?? '').replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char],
  );

/** Lama sewa dibaca dari input: kosong/non-angka = 1, dibatasi 1–30, dibulatkan ke bawah. */
export const days = () => Math.min(30, Math.max(1, Math.floor(Number($('daysInput').value)) || 1));

export const iconOf = (motor) => (motor.icon === '🏍️' ? '🏍️' : '🛵');

export const photoOf = (motor) =>
  typeof motor.foto === 'string' && /^data:image\/(jpeg|png|webp);base64,/.test(motor.foto)
    ? motor.foto
    : '';

export function toast(message) {
  const node = $('toast');
  node.textContent = message;
  node.classList.add('show');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => node.classList.remove('show'), 2400);
}

export function countUp(element, target, format) {
  const from = Number(element.dataset.v || 0);
  element.dataset.v = target;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || from === target) {
    element.textContent = format(target);
    return;
  }
  const start = performance.now();
  const duration = 700;
  (function step(now) {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = format(Math.round(from + (target - from) * eased));
    if (progress < 1) requestAnimationFrame(step);
  })(start);
}

/* ---------- Hero ---------- */

export function initHero() {
  const title = $('heroTitle');
  title.innerHTML = title.textContent
    .split(' ')
    .map((word, index) => `<span class="w" style="--i:${index}">${safe(word)}</span>`)
    .join(' ');
}

export function initVideo() {
  const frame = $('heroVideo');
  const button = $('soundBtn');
  let soundOn = false;

  frame.addEventListener('load', () => frame.classList.add('ready'));
  setTimeout(() => frame.classList.add('ready'), 2500);

  const command = (fn, args = '') => {
    try {
      frame.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: fn, args: args === '' ? [] : args }),
        '*',
      );
    } catch {
      // Video diblokir; tombol suara tidak melakukan apa pun.
    }
  };

  button.addEventListener('click', () => {
    soundOn = !soundOn;
    command(soundOn ? 'unMute' : 'mute');
    if (soundOn) {
      command('setVolume', [70]);
      command('playVideo');
    }
    button.setAttribute('aria-pressed', String(soundOn));
    button.setAttribute('aria-label', soundOn ? 'Matikan suara video' : 'Nyalakan suara video');
    $('soundLabel').textContent = soundOn ? 'Matikan suara' : 'Nyalakan suara';
  });
}

/* ---------- Header dan katalog ---------- */

function renderAuth() {
  const state = getState();
  const me = state.me;

  $('acct').innerHTML = me
    ? `<span class="who"><b>${safe(me.nama)}</b><em class="role ${me.role}">${ROLE[me.role]}</em></span><button class="secondary" id="logoutBtn" type="button">Keluar</button>`
    : '<button class="primary" id="loginBtn" type="button">Masuk</button>';
  $('navDash').hidden = !me;
  $('navDash').textContent = me && me.role === 'buyer' ? 'Pesanan saya' : 'Dashboard';
  $('manageToggle').hidden = !isStaff(state);
  if (!isStaff(state)) {
    document.body.classList.remove('manage');
    $('manageToggle').setAttribute('aria-pressed', 'false');
  }
}

function renderChips() {
  const state = getState();
  const list = categories(state);
  const activeCat = list.includes(state.activeCat) ? state.activeCat : '';

  $('chips').innerHTML = ['', ...list]
    .map(
      (category) =>
        `<button type="button" class="chip${category === activeCat ? ' on' : ''}" data-cat="${safe(category)}" aria-pressed="${category === activeCat}">${category ? safe(category) : 'Semua'}</button>`,
    )
    .join('');
}

function waLink(motor) {
  return (
    'https://wa.me/' +
    WHATSAPP_NUMBER +
    '?text=' +
    encodeURIComponent(
      `Halo LintasRoda, saya ingin menyewa ${motor.nama} selama ${days()} hari. Apakah masih tersedia?`,
    )
  );
}

export function renderHero() {
  const state = getState();
  const products = state.products;
  const locale = (value) => value.toLocaleString('id-ID');

  countUp($('hsProd'), products.length, locale);
  countUp(
    $('hsUnit'),
    products.reduce((sum, motor) => sum + Number(motor.stok || 0), 0),
    locale,
  );

  const prices = products.map((motor) => Number(motor.harga)).filter(Number.isFinite);
  $('hsMin').textContent = prices.length ? short(Math.min(...prices)) + '/hari' : '-';

  const featured = products
    .filter((motor) => motor.unggulan)
    .concat(products.filter((motor) => !motor.unggulan))
    .slice(0, 2);

  $('floats').innerHTML = featured
    .map(
      (motor) =>
        `<div class="fcard"><i>${iconOf(motor)}</i><div><small>${motor.unggulan ? 'Pilihan kami' : 'Tersedia'}</small><b>${safe(motor.nama)}</b><em>${rupiah(motor.harga)}/hari</em></div></div>`,
    )
    .join('');
}

export function renderCatalog() {
  const state = getState();
  renderChips();

  const query = $('searchInput').value.trim().toLocaleLowerCase('id');
  const category = categories(state).includes(state.activeCat) ? state.activeCat : '';
  const sort = $('sortSelect').value;
  const duration = days();

  let list = state.products.filter(
    (motor) =>
      (!category || motor.kategori === category) &&
      (!query ||
        `${motor.nama} ${motor.deskripsi} ${motor.kategori}`
          .toLocaleLowerCase('id')
          .includes(query)),
  );

  if (sort === 'name') list.sort((a, b) => a.nama.localeCompare(b.nama, 'id'));
  if (sort === 'low') list.sort((a, b) => a.harga - b.harga);
  if (sort === 'high') list.sort((a, b) => b.harga - a.harga);
  if (sort === 'stock') list.sort((a, b) => b.stok - a.stok);
  if (sort === 'default') list.sort((a, b) => Number(b.unggulan) - Number(a.unggulan));

  $('resultCount').textContent = `${list.length} motor`;

  $('productGrid').innerHTML = list.length
    ? list
        .map((motor, index) => {
          const stockBadge =
            motor.stok > 1
              ? `${motor.stok} unit`
              : motor.stok === 1
                ? 'Sisa 1 unit'
                : 'Sedang disewa';
          const badgeClass = motor.stok > 0 && motor.stok <= 1 ? ' low' : motor.stok <= 0 ? ' off' : '';
          const photo = photoOf(motor);
          const rentButton =
            motor.stok > 0
              ? `<a class="wa" data-rent="${safe(motor.id)}" href="${waLink(motor)}" target="_blank" rel="noopener noreferrer">Sewa via WhatsApp</a>`
              : '<span class="wa off">Belum tersedia</span>';
          const tools = canEdit(motor, state)
            ? `<div class="cardtools"><button type="button" class="edit" data-edit="${safe(motor.id)}">Edit</button><button type="button" class="del" data-delete="${safe(motor.id)}">Hapus</button></div>`
            : '';

          return `<article class="product" style="--i:${index}"><div class="product-art${photo ? ' has-photo' : ''}">${
            motor.unggulan ? '<span class="tag">Pilihan</span>' : ''
          }<span class="sbadge${badgeClass}">${stockBadge}</span>${
            photo
              ? `<img class="photo" src="${safe(photo)}" alt="Foto ${safe(motor.nama)}" loading="lazy">`
              : `<span class="emoji">${iconOf(motor)}</span>`
          }</div><div class="product-body"><div class="meta"><span class="cat">${safe(motor.kategori)}</span><span>${motor.cc ? safe(motor.cc) + ' cc' : ''}</span></div><h3>${safe(motor.nama)}</h3><p class="desc">${safe(motor.deskripsi || 'Motor terawat siap disewa.')}</p><div class="price">${rupiah(motor.harga)} <small>/hari</small></div><p class="total">${duration} hari: <b>${rupiah(motor.harga * duration)}</b></p>${rentButton}${tools}</div></article>`;
        })
        .join('')
    : '<div class="empty"><div style="font-size:30px">⌕</div><strong>Motor tidak ditemukan</strong><br><span>Coba kata kunci atau jenis lain.</span></div>';
}

/* ---------- Dashboard ---------- */

const fmtDate = (value) =>
  new Date(value).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

const table = (title, headers, rows, action = '') =>
  `<div class="panel"><div class="panel-head"><h3>${title}</h3>${action}</div><div class="table-wrap"><table><thead><tr>${headers
    .map((header) => `<th>${header}</th>`)
    .join('')}</tr></thead><tbody>${
    rows ||
    `<tr><td colspan="${headers.length}" style="text-align:center;color:var(--muted)">Belum ada data.</td></tr>`
  }</tbody></table></div></div>`;

export function renderDashboard() {
  const state = getState();
  const me = state.me;
  if (!me) return;

  const role = me.role;
  const orders = myOrders(state);
  const fleet =
    role === 'admin' ? state.products : state.products.filter((motor) => motor.ownerId === me.id);
  const live = orders.filter((order) => order.status !== 'Dibatalkan');
  const sum = (list) => list.reduce((total, order) => total + order.total, 0);
  const units = fleet.reduce((total, motor) => total + Number(motor.stok || 0), 0);

  $('dashTitle').textContent =
    role === 'buyer' ? 'Pesanan saya' : role === 'seller' ? 'Dashboard penjual' : 'Dashboard admin';
  $('dashSub').textContent =
    role === 'buyer'
      ? 'Pantau pesanan sewa yang sudah kamu buat.'
      : role === 'seller'
        ? 'Kelola motor milikmu dan proses pesanan yang masuk.'
        : 'Kelola semua motor, pesanan, dan akun pengguna.';
  $('addProduct').hidden = role === 'buyer';

  const stats =
    role === 'buyer'
      ? [
          ['🧾', 'Total pesanan', orders.length],
          ['⏳', 'Menunggu', orders.filter((order) => order.status === 'Menunggu').length],
          ['💰', 'Total biaya sewa', rupiah(sum(live))],
        ]
      : role === 'seller'
        ? [
            ['🏍️', 'Model motor', fleet.length],
            ['🔑', 'Unit tersedia', units],
            ['🧾', 'Pesanan masuk', orders.length],
            ['💰', 'Pendapatan selesai', rupiah(sum(orders.filter((order) => order.status === 'Selesai')))],
          ]
        : [
            ['🏍️', 'Model motor', fleet.length],
            ['👥', 'Pengguna', state.users.length],
            ['🧾', 'Total pesanan', orders.length],
            ['💰', 'Nilai pesanan selesai', rupiah(sum(orders.filter((order) => order.status === 'Selesai')))],
          ];

  $('dashStats').innerHTML = stats
    .map(
      ([icon, label, value]) =>
        `<div class="stat"><span class="stat-icon">${icon}</span><div class="stat-label">${label}</div><div class="stat-value">${value}</div></div>`,
    )
    .join('');

  const pill = (status) =>
    `<span class="pill${status === 'Menunggu' ? ' low' : status === 'Dibatalkan' ? ' out' : ''}">${status}</span>`;

  const orderRows = orders
    .map((order) => {
      const counterpart = role === 'buyer' ? nameOf(order.sellerId, state) : nameOf(order.buyerId, state);
      const statusCell =
        role === 'buyer'
          ? pill(order.status) +
            (order.status === 'Menunggu'
              ? ` <button class="del" data-cancel="${safe(order.id)}" style="border:0;border-radius:999px;padding:4px 10px;font-weight:700;font-size:12px">Batalkan</button>`
              : '')
          : `<select data-status="${safe(order.id)}" aria-label="Status pesanan">${STATUS.map(
              (status) => `<option${status === order.status ? ' selected' : ''}>${status}</option>`,
            ).join('')}</select>`;

      return `<tr><td><strong>${safe(order.motor)}</strong></td><td>${safe(counterpart)}</td><td>${fmtDate(order.tgl)}</td><td>${order.hari} hari</td><td>${rupiah(order.total)}</td><td>${statusCell}</td></tr>`;
    })
    .join('');

  let html = '';

  if (role !== 'buyer') {
    const rows = fleet
      .map((motor) => {
        const thumb = photoOf(motor)
          ? `<img src="${safe(photoOf(motor))}" alt="">`
          : iconOf(motor);
        return `<tr><td><div class="mini"><span class="mini-emoji">${thumb}</span><strong>${safe(motor.nama)}</strong></div></td>${
          role === 'admin' ? `<td>${safe(nameOf(motor.ownerId, state))}</td>` : ''
        }<td>${safe(motor.kategori)}</td><td>${rupiah(motor.harga)}</td><td>${motor.stok}</td><td><span class="pill${motor.stok <= 0 ? ' out' : motor.stok <= 1 ? ' low' : ''}">${
          motor.stok <= 0 ? 'Disewa penuh' : motor.stok <= 1 ? 'Menipis' : 'Tersedia'
        }</span></td><td><div class="actions"><button class="edit" data-edit="${safe(motor.id)}">Edit</button><button class="del" data-delete="${safe(motor.id)}">Hapus</button></div></td></tr>`;
      })
      .join('');

    html += table(
      role === 'admin' ? 'Semua motor' : 'Motor saya',
      ['Motor', ...(role === 'admin' ? ['Penjual'] : []), 'Jenis', 'Tarif/hari', 'Unit', 'Status', 'Aksi'],
      rows,
      role === 'admin' ? '<button class="secondary" data-reset type="button">Reset data demo</button>' : '',
    );
  }

  html += table(
    role === 'buyer' ? 'Riwayat pesanan' : 'Pesanan masuk',
    ['Motor', role === 'buyer' ? 'Penjual' : 'Pembeli', 'Tanggal', 'Lama', 'Total', 'Status'],
    orderRows,
  );

  if (role === 'admin') {
    html += table(
      'Pengguna',
      ['Nama', 'Email', 'Peran', 'Aksi'],
      state.users
        .map(
          (user) =>
            `<tr><td><strong>${safe(user.nama)}</strong></td><td>${safe(user.email)}</td><td><select data-role="${safe(user.id)}" aria-label="Peran ${safe(user.nama)}"${user.id === me.id ? ' disabled' : ''}>${Object.entries(ROLE)
              .map(
                ([key, label]) =>
                  `<option value="${key}"${key === user.role ? ' selected' : ''}>${label}</option>`,
              )
              .join('')}</select></td><td>${
              user.id === me.id
                ? '<span class="role admin">Kamu</span>'
                : `<div class="actions"><button class="del" data-deluser="${safe(user.id)}">Hapus</button></div>`
            }</td></tr>`,
        )
        .join(''),
    );
  }

  $('dashPanels').innerHTML = html;
}

export function renderAll() {
  renderAuth();
  renderHero();
  renderCatalog();
  renderDashboard();
}

/* ---------- Modal form motor ---------- */

export function setPreview() {
  const { pendingPhoto } = getState();
  const preview = $('imgPrev');

  if (pendingPhoto) preview.innerHTML = `<img src="${safe(pendingPhoto)}" alt="">`;
  else preview.textContent = $('emoji').value;

  $('clearPhoto').hidden = !pendingPhoto;
  $('pickPhoto').textContent = pendingPhoto ? 'Ganti gambar' : 'Unggah gambar';
}

export function openProductModal(motor) {
  const form = $('productForm');
  form.reset();
  $('productId').value = motor?.id || '';
  $('modalTitle').textContent = motor ? 'Edit motor' : 'Tambah motor';
  $('name').value = motor?.nama || '';
  $('category').value = motor?.kategori || 'Matic';
  $('cc').value = motor?.cc ?? '';
  $('price').value = motor?.harga ?? '';
  $('stock').value = motor?.stok ?? '';
  $('emoji').value = iconOf(motor || {});
  $('description').value = motor?.deskripsi || '';
  $('featured').checked = !!motor?.unggulan;

  setState({ pendingPhoto: photoOf(motor || {}) });
  setPreview();
  $('productModal').classList.add('show');
  $('name').focus();
}

export function closeProductModal() {
  $('productModal').classList.remove('show');
}

/** Kompres gambar unggahan ke JPEG maksimal 900 px agar muat di localStorage. */
export function compressPhoto(file) {
  return new Promise((resolve, reject) => {
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) {
      reject(new Error('Format harus JPG, PNG, atau WebP.'));
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      reject(new Error('Ukuran file maksimal 10 MB.'));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error('File tidak bisa dibaca.'));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error('File gambar tidak valid.'));
      image.onload = () => {
        const scale = Math.min(1, 900 / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext('2d');
        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

/* ---------- Modal autentikasi ---------- */

export function setAuthMode(mode) {
  const register = mode === 'register';
  setState({ authMode: mode });
  $('authTitle').textContent = register ? 'Daftar akun' : 'Masuk';
  $('authSubmit').textContent = register ? 'Buat akun' : 'Masuk';
  $('fName').hidden = $('fRole').hidden = !register;
  $('aName').required = register;
  document.querySelectorAll('[data-tab]').forEach((tab) => {
    tab.classList.toggle('on', tab.dataset.tab === mode);
  });
  $('aPass').autocomplete = register ? 'new-password' : 'current-password';
}

export function openAuthModal(mode) {
  $('authForm').reset();
  setAuthMode(mode || 'login');
  $('authModal').classList.add('show');
  $('aEmail').focus();
}

export function closeAuthModal() {
  $('authModal').classList.remove('show');
}
