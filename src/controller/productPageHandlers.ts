import {
  addToCart,
  createCart,
  getActiveCart,
  removeFromCart,
} from '../model/api/cartApiRoot';
import { addBasketButton } from '../view/pages/product/product';
import { fillProductPage } from './fillProductPage';

async function pageLoaded(e: Event) {
  const location = window.location.pathname;
  const options = (e as CustomEvent).detail;
  if (location === '/product') {
    fillProductPage(options.sku);
  }
}

window.addEventListener('PageContentLoaded', pageLoaded);

// add / remove product from basket

const toggleBasket = async (action: 'add' | 'remove') => {
  let activeCart;
  try {
    activeCart = await getActiveCart();
  } catch {
    activeCart = await createCart();
  }

  const { id, version, lineItems } = activeCart.body;
  const sku = window.location.search.slice(5);
  if (action === 'add') {
    await addToCart(id, version, sku);
  }
  if (action === 'remove') {
    const lineItem = lineItems.find((item) => item.variant.sku === sku);
    const lineItemId = lineItem?.id || '';
    await removeFromCart(id, version, lineItemId);
  }
};
const addBasketButtonHandler = async () => {
  let action: 'add' | 'remove';
  if (addBasketButton.textContent === 'Add to basket') {
    addBasketButton.textContent = 'Remove from basket';
    action = 'add';
  } else {
    addBasketButton.textContent = 'Add to basket';
    action = 'remove';
  }
  try {
    await toggleBasket(action);
  } catch (error) {
    console.log(error);
  }
};

addBasketButton.addEventListener('click', addBasketButtonHandler);
