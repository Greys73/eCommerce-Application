import { LineItem } from '@commercetools/platform-sdk';
import { getActiveCart } from '../model/api/cartApiRoot';
import {
  basketContainer,
  emptyContainer,
  itemsBlock,
  totalCartPrice,
} from '../view/pages/basket/basket';
import { ItemToBasket } from '../types/type';
import { changeItemAmount } from './modifyBasket';

const centsPerEuro = 100;

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
  )?.value.label;
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

  const price: ItemToBasket['price'] =
    item.price.value.centAmount / centsPerEuro;
  const totalPrice: ItemToBasket['totalPrice'] =
    item.totalPrice.centAmount / centsPerEuro;
  const lineItemId = item.id;

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
    lineItemId,
  };

  if (item.price.discounted) {
    const priceDiscount: ItemToBasket['priceDiscount'] =
      item.price.discounted.value.centAmount / centsPerEuro;
    option.priceDiscount = priceDiscount;
  }
  if (item.discountedPricePerQuantity.length !== 0) {
    const priceDiscount: ItemToBasket['priceDiscount'] =
      item.discountedPricePerQuantity[0].discountedPrice.value.centAmount /
      centsPerEuro;
    option.priceDiscount = priceDiscount;
  }
  return option;
};

const addItemToBasketView = (el: ItemToBasket) => {
  const lineItem = document.createElement('div');
  lineItem.id = el.lineItemId;
  lineItem.className = 'items__item';

  const image = document.createElement('img');
  image.classList.add('item__image');
  image.src = el.img;

  const params = document.createElement('div');
  params.classList.add('item__params-block');

  const name = document.createElement('a');
  name.classList.add('item__name');
  name.textContent = el.name;

  name.onclick = () => {
    window.routeLocation = `/product?sku=${el.sku}`;
  };

  const textParams = document.createElement('p');
  textParams.classList.add('params-block__params');
  textParams.textContent = `${el.year}, ${el.type}`;

  const digitalParams = document.createElement('p');
  digitalParams.classList.add('params-block__params');
  digitalParams.textContent = `${el.dsp.toString()} cc, ${el.power.toString()} hp, ${el.weight.toString()} kg`;

  params.append(name, textParams, digitalParams);

  const price = document.createElement('div');
  price.classList.add('item__price-block');

  const fullPriceContainer = document.createElement('div');
  fullPriceContainer.classList.add('price-block__container');

  const fullPrice = document.createElement('p');
  fullPrice.classList.add('price-block__item-full-price');
  fullPrice.textContent = `${el.price.toString()} €`;
  price.append(fullPrice);

  const discountPrice = document.createElement('p');
  discountPrice.classList.add('price-block__item-discont-price');
  if (el.priceDiscount) {
    discountPrice.textContent = `${el.priceDiscount.toString()} €`;
  } else {
    discountPrice.textContent = '';
  }

  const discont = document.createElement('p');
  discont.classList.add('price-block__item-discont');
  if (el.priceDiscount) {
    discont.textContent = `-${Math.round(
      (1 - el.priceDiscount / el.price) * 100,
    )}%`.toString();
  } else {
    discont.textContent = '';
  }

  fullPriceContainer.append(fullPrice, discont);

  price.append(fullPriceContainer, discountPrice);

  const amount = document.createElement('div');
  amount.classList.add('item__amount');

  const decreaseButton = document.createElement('button');
  decreaseButton.classList.add('amount__decrease-button');
  decreaseButton.textContent = '-';
  decreaseButton.addEventListener('click', changeItemAmount);

  const increaseButton = document.createElement('button');
  increaseButton.classList.add('amount__increase-button');
  increaseButton.textContent = '+';
  increaseButton.addEventListener('click', changeItemAmount);

  const currAmount = document.createElement('p');
  currAmount.classList.add('amount__current');
  currAmount.textContent = el.amount.toString();

  amount.append(decreaseButton, currAmount, increaseButton);

  const totalPrice = document.createElement('p');
  totalPrice.classList.add('item__total-price');
  totalPrice.textContent = `${el.totalPrice} €`;

  const deleteBlock = document.createElement('div');
  deleteBlock.classList.add('item__delete-block');

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('item__delete');
  deleteButton.textContent = 'Delete item';
  deleteButton.addEventListener('click', changeItemAmount);

  deleteBlock.append(deleteButton);

  lineItem.append(image, params, price, amount, totalPrice, deleteBlock);

  itemsBlock.append(lineItem);
};

export const fillBasket = async () => {
  itemsBlock.innerHTML = '';
  const cart = await getActiveCart();
  console.log(cart);
  const { lineItems } = cart.body;
  if (!lineItems.length) {
    basketContainer.hidden = true;
    emptyContainer.hidden = false;
  } else {
    emptyContainer.hidden = true;
    basketContainer.hidden = false;
    lineItems.forEach((item) => {
      const opt = mapBasketItem(item);
      addItemToBasketView(opt);
    });

    totalCartPrice.textContent = `${
      cart.body.totalPrice.centAmount / centsPerEuro
    } €`;
  }
};
