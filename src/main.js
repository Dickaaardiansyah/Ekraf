/**
 * Entry point aplikasi.
 * Tugasnya hanya menyambungkan state ke lapisan tampilan.
 */

import './style.css';
import { getState, subscribe } from './store.js';
import { renderApp } from './ui.js';

const root = document.querySelector('#app');

if (!root) {
  throw new Error('Elemen #app tidak ditemukan pada index.html');
}

function render() {
  renderApp(root, getState());
}

render();
subscribe(render);
