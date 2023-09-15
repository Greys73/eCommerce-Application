import { Cart } from '@commercetools/platform-sdk';

export function updateHeaderCart(cart?: Cart) {
  const prodCount = cart ? cart.lineItems.length : 0;
  const divObject = document.getElementById('basket-header-number')!;
  if (prodCount === 0) divObject.classList.add('hidden');
  else divObject.classList.remove('hidden');
  divObject.textContent = prodCount.toString();
}
