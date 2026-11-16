/**
 * Lapisan tampilan: membangun kerangka landmark semantik dan merender katalog
 * dari state. Semua teks dimasukkan lewat DOM API / textContent agar input
 * pengguna tidak pernah menjadi HTML (lihat syarat keamanan SPEC.md).
 *
 * Fokus milestone ini: kerangka halaman + kartu motor dasar.
 * Pencarian, filter, sorting, WhatsApp, dashboard, dan modal belum di sini.
 */

const rupiah = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

export function formatRupiah(value) {
  return rupiah.format(value);
}

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value == null || value === false) continue;
    if (key === 'class') node.className = value;
    else if (key === 'text') node.textContent = value;
    else node.setAttribute(key, value);
  }
  for (const child of children) {
    node.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return node;
}

function iconLabel(imageUrl) {
  return imageUrl.startsWith('local:') ? imageUrl.slice('local:'.length) : '🛵';
}

function statItem(label, value) {
  return el('div', { class: 'stat' }, [
    el('span', { class: 'stat__value', text: value }),
    el('span', { class: 'stat__label', text: label }),
  ]);
}

function renderNavbar() {
  return el('header', { class: 'site-header' }, [
    el('nav', { class: 'nav', 'aria-label': 'Navigasi utama' }, [
      el('a', { class: 'brand', href: '#beranda' }, [
        el('span', { class: 'brand__mark', 'aria-hidden': 'true', text: '🏍️' }),
        el('span', { class: 'brand__name', text: 'LintasRoda' }),
      ]),
      el('ul', { class: 'nav__list' }, [
        ['Beranda', '#beranda'],
        ['Keunggulan', '#keunggulan'],
        ['Cara Sewa', '#cara-sewa'],
        ['Katalog', '#katalog'],
        ['Dashboard', '#dashboard'],
      ].map(([label, href]) =>
        el('li', {}, [el('a', { class: 'nav__link', href, text: label })]),
      )),
    ]),
  ]);
}

function renderHero(motors) {
  const totalUnit = motors.reduce((sum, motor) => sum + motor.stok, 0);
  const tarifTerendah = motors.length
    ? Math.min(...motors.map((motor) => motor.harga))
    : 0;

  return el('section', { class: 'hero', id: 'beranda' }, [
    el('p', { class: 'hero__badge', text: 'Unit siap jalan hari ini' }),
    el('h1', { class: 'hero__title', text: 'Sewa motor, langsung gas.' }),
    el('p', {
      class: 'hero__lead',
      text: 'Matic, bebek, sport, sampai trail. Pilih unit, atur lama sewa, lalu chat admin.',
    }),
    el('div', { class: 'hero__actions' }, [
      el('a', { class: 'btn btn--primary', href: '#katalog', text: 'Lihat Motor' }),
      el('a', { class: 'btn btn--ghost', href: '#cara-sewa', text: 'Chat Admin' }),
    ]),
    el('div', { class: 'hero__stats' }, [
      statItem('model motor', String(motors.length)),
      statItem('unit tersedia', String(totalUnit)),
      statItem('sewa mulai dari', `${formatRupiah(tarifTerendah)}/hari`),
    ]),
  ]);
}

function renderMotorCard(motor) {
  const habis = motor.stok === 0;

  return el('article', { class: 'card' }, [
    el('div', { class: 'card__icon', 'aria-hidden': 'true', text: iconLabel(motor.imageUrl) }),
    el('div', { class: 'card__badges' }, [
      motor.unggulan ? el('span', { class: 'badge badge--pick', text: 'Pilihan' }) : null,
      el('span', {
        class: `badge ${habis ? 'badge--empty' : 'badge--stock'}`,
        text: habis ? 'Sedang disewa' : `${motor.stok} unit`,
      }),
    ]),
    el('p', { class: 'card__meta' }, [
      el('span', { text: motor.kategori }),
      motor.cc > 0 ? el('span', { text: `${motor.cc} cc` }) : null,
    ]),
    el('h3', { class: 'card__title', text: motor.nama }),
    el('p', { class: 'card__desc', text: motor.deskripsi }),
    el('p', { class: 'card__price' }, [
      el('strong', { text: formatRupiah(motor.harga) }),
      ' /hari',
    ]),
    habis
      ? el('span', {
          class: 'btn btn--block btn--disabled',
          text: 'Belum tersedia',
          'aria-disabled': 'true',
        })
      : el('span', {
          class: 'btn btn--block',
          text: 'Sewa via WhatsApp',
          title: 'Tautan WhatsApp dihubungkan pada milestone berikutnya.',
        }),
  ]);
}

function renderCatalog(motors) {
  return el('section', { class: 'section', id: 'katalog' }, [
    el('div', { class: 'section__head' }, [
      el('h2', { class: 'section__title', text: 'Katalog motor' }),
      el('p', { class: 'section__hint', text: `${motors.length} motor` }),
    ]),
    el(
      'div',
      { class: 'grid', id: 'katalog-grid' },
      motors.map(renderMotorCard),
    ),
  ]);
}

function renderInfo() {
  return el('section', { class: 'section section--muted', id: 'cara-sewa' }, [
    el('h2', { class: 'section__title', text: 'Cara sewa' }),
    el('ol', { class: 'steps' }, [
      el('li', { text: 'Pilih motor yang sesuai kebutuhan.' }),
      el('li', { text: 'Chat admin lewat WhatsApp untuk memastikan ketersediaan.' }),
      el('li', { text: 'Bawa KTP dan SIM C yang masih berlaku, lalu ambil unit.' }),
    ]),
    el('p', { class: 'section__hint', text: 'Nomor WhatsApp rental masih berupa konfigurasi contoh.' }),
  ]);
}

function renderFooter() {
  return el('footer', { class: 'site-footer' }, [
    el('p', { text: 'LintasRoda — Bawa KTP dan SIM C yang masih berlaku.' }),
    el('p', { class: 'site-footer__note', text: '© 2026 · Data demo tersimpan di browser ini.' }),
  ]);
}

/** Merender seluruh halaman ke elemen root. */
export function renderApp(root, state) {
  root.replaceChildren(
    el('a', { class: 'skip-link', href: '#katalog', text: 'Lewati ke katalog' }),
    renderNavbar(),
    el('main', {}, [
      renderHero(state.motors),
      renderCatalog(state.motors),
      renderInfo(),
      el('section', { class: 'section', id: 'dashboard' }, [
        el('h2', { class: 'section__title', text: 'Dashboard armada' }),
        el('p', {
          class: 'section__hint',
          text: 'Area demo lokal. Ringkasan dan pengelolaan motor menyusul.',
        }),
      ]),
    ]),
    renderFooter(),
  );
}
