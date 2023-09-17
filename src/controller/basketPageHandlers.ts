import { getActiveCart } from '../model/api/cartApiRoot';
import { setPromoToCart } from '../model/api/promoApi';
import { promoBlock } from '../view/pages/basket/basket';
import { showResultMessage } from './application';
import { fillBasket } from './fillBasket';

async function applyPromo() {
  const input = promoBlock.firstChild as HTMLInputElement;
  const cart = await getActiveCart();
  const { id, version } = cart.body;
  if (input.value) {
    const response = await setPromoToCart(
      id,
      version,
      input.value.toUpperCase(),
    );
    if (response.statusCode !== 200) {
      showResultMessage(response, response.body.message);
    } else {
      showResultMessage(
        response,
        `Code '${input.value.toUpperCase()}' applied to cart!`,
      );
      input.value = '';
    }
    fillBasket();
  }
}
(promoBlock.lastChild as HTMLButtonElement).onclick = applyPromo;

function basketPageLoaded() {
  const location = window.location.pathname;
  if (location === '/basket') {
    fillBasket();
  }
}

window.addEventListener('PageContentLoaded', basketPageLoaded);
