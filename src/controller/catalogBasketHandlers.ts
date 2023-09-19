import { Cart } from '@commercetools/platform-sdk';
import { addToCart, getActiveCart } from '../model/api/cartApiRoot';
import loading from '../assets/images/icons/loading_2.gif';
import { showResultMessage } from './application';

const loader = new Image();
loader.src = loading;
loader.className = 'card__loader';

export function disableBasketBtn(btn: HTMLButtonElement) {
  const button = btn;
  button.disabled = true;
  button.classList.add('card__button_unactive');
  button.textContent = 'Already added';
}

export async function clickBasketBtn(e: Event) {
  e.stopPropagation();
  const btn = e.target as HTMLButtonElement;
  btn.parentElement?.prepend(loader);
  const activeCart = await getActiveCart();
  const { id, version } = activeCart.body;
  const cart = await addToCart(id, version, btn.name);
  if (cart.statusCode === 200) {
    disableBasketBtn(btn);
    showResultMessage(cart, 'Product added to cart!');
  } else {
    showResultMessage(cart, cart.body.message);
  }
  loader.remove();
}

export function tuneWithCart(btn: HTMLButtonElement, cart?: Cart) {
  const button = btn;
  button.onclick = clickBasketBtn;
  if (cart) {
    cart.lineItems.forEach((product) => {
      if (product.variant.sku === button.name) disableBasketBtn(button);
    });
  }
}
