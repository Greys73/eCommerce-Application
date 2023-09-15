import { LineItem } from '@commercetools/platform-sdk';
import { getActiveCart } from '../model/api/cartApiRoot';
import {
  addItemToBasketView,
  basketContainer,
  emptyContainer,
} from '../view/pages/basket/basket';
import { ItemToBasket } from '../types/type';

export const mapBasketItem = (item: LineItem): ItemToBasket => {
  const name = item.name.en;
  let img: ItemToBasket['img'] = '';
  if (item.variant.images) {
    img = item.variant.images[0].url;
  }
  const { attributes } = item.variant;

  const year: ItemToBasket['year'] = attributes?.find(
    (el) => el.name === 'attr-year',
  )?.value;
  const type: ItemToBasket['type'] = attributes?.find(
    (el) => el.name === 'attr-type',
  )?.value;
  const dsp: ItemToBasket['dsp'] = attributes?.find(
    (el) => el.name === 'attr-dsp',
  )?.value;
  const power: ItemToBasket['power'] = attributes?.find(
    (el) => el.name === 'attr-power',
  )?.value;
  const weight: ItemToBasket['power'] = attributes?.find(
    (el) => el.name === 'attr-weight',
  )?.value;

  const amount: ItemToBasket['amount'] = item.quantity;

  const sku: ItemToBasket['sku'] = item.variant.sku || '';

  const centsPerEuro = 100;
  const price: ItemToBasket['price'] =
    item.price.value.centAmount / centsPerEuro;
  const totalPrice: ItemToBasket['totalPrice'] =
    item.totalPrice.centAmount / centsPerEuro;

  const option: ItemToBasket = {
    name,
    img,
    year,
    type,
    dsp,
    power,
    weight,
    amount,
    price,
    totalPrice,
    sku,
  };

  if (item.price.discounted) {
    const priceDiscount: ItemToBasket['priceDiscount'] =
      item.price.discounted.value.centAmount / centsPerEuro;
    option.priceDiscount = priceDiscount;
  }
  return option;
};

export const fillBasket = async () => {
  const cart = await getActiveCart();
  console.log(cart);
  const { lineItems } = cart.body;
  if (!lineItems.length) {
    basketContainer.hidden = true;
  } else {
    emptyContainer.hidden = true;
    lineItems.forEach((item) => {
      const opt = mapBasketItem(item);
      addItemToBasketView(opt);
    });
  }
};
