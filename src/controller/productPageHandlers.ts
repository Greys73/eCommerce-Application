import { fillProductPage } from './fillProductPage';

async function pageLoaded(e: Event) {
  const location = window.location.pathname;
  const options = (e as CustomEvent).detail;
  if (location === '/product') {
    fillProductPage(options.sku);
  }
}

window.addEventListener('PageContentLoaded', pageLoaded);
