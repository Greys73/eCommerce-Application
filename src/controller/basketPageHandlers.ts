import { fillBasket } from './fillBasket';

function basketPageLoaded() {
  const location = window.location.pathname;
  if (location === '/basket') {
    fillBasket();
  }
}

window.addEventListener('PageContentLoaded', basketPageLoaded);
