import '../../../assets/styles/pages/basket.scss';
import emptyImg from '../../../assets/images/empty-cart.png';
import { ItemToBasket } from '../../../types/type';

const basketPage = document.createElement('div');
basketPage.classList.add('basket-page');

// empty cart

const emptyContainer = document.createElement('div');
emptyContainer.classList.add('basket__empty'); // , 'hidden');

const emptyHeader = document.createElement('h2');
emptyHeader.classList.add('empty__header');
emptyHeader.textContent = 'Warning! The cart is empty!';

const emptyImage = document.createElement('img');
emptyImage.classList.add('empty__image');
emptyImage.src = emptyImg;

emptyContainer.append(emptyHeader, emptyImage);

function appendText(str: string): void {
  const emptyMessage = document.createElement('p');
  emptyMessage.classList.add('empty__message');
  emptyMessage.textContent = str;

  emptyContainer.append(emptyMessage);
}

const emptyTextArr = [
  'Your cart is currently craving for some high-octane action!',
  'Discover our lineup of motorcycles and start add your dream to the cart.',
  "Let's hit the road and make every ride unforgettable!",
];

emptyTextArr.forEach((el) => appendText(el));

const emptyButton = document.createElement('a');
emptyButton.classList.add('empty__button');
emptyButton.href = '/catalog';
emptyButton.textContent = 'Choose your bike now!';

emptyContainer.append(emptyButton);

// not empty cart

const basketContainer = document.createElement('div');
basketContainer.classList.add('basket__basket-container'); // , 'hidden');

const basketHeader = document.createElement('h2');
basketHeader.classList.add('basket__header');
basketHeader.textContent = 'Products in cart:';

const itemsBlock = document.createElement('div');
itemsBlock.classList.add('basket-container__items');

// function to fill items to basket

const addItemToBasketView = (el: ItemToBasket) => {
  const image = document.createElement('img');
  image.classList.add('item__image');
  image.src = el.img;

  const params = document.createElement('div');
  params.classList.add('item__params-block');

  const name = document.createElement('a');
  name.classList.add('item__name');
  name.textContent = el.name;
  // SKU?
  name.onclick = () => {
    window.routeLocation = `/product?sku=${el.sku}`;
  };

  const textParams = document.createElement('p');
  params.classList.add('params-block__params');
  textParams.textContent = `${el.year}, ${el.type}`;

  const digitalParams = document.createElement('p');
  digitalParams.classList.add('params-block__params');
  digitalParams.textContent = `${el.dsp.toString()} cc, ${el.power.toString()} hp, ${el.weight.toString()} kg`;

  params.append(name, textParams, digitalParams);

  const price = document.createElement('div');
  price.classList.add('item__price-block');

  const fullPrice = document.createElement('p');
  fullPrice.classList.add('price-block__item-full-price');
  fullPrice.textContent = `${el.price.toString()} €`;
  price.append(fullPrice);

  if (el.priceDiscount) {
    const discountPrice = document.createElement('p');
    discountPrice.classList.add('price-block__item-discont-price');
    discountPrice.textContent = `${el.priceDiscount.toString()} €`;

    const discont = document.createElement('p');
    discont.classList.add('price-block__item-discont');
    discont.textContent = `-${Math.round(
      (1 - el.priceDiscount / el.price) * 100,
    )}%`.toString();
    price.append(discont, discountPrice);
  }

  const amount = document.createElement('div');
  amount.classList.add('item__amount');

  const decreaseButton = document.createElement('button');
  decreaseButton.classList.add('amount__decrease-button');
  decreaseButton.textContent = '-';

  const increaseButton = document.createElement('button');
  increaseButton.classList.add('amount__increase-button');
  increaseButton.textContent = '+';

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

  deleteBlock.append(deleteButton);

  itemsBlock.append(image, params, price, amount, totalPrice, deleteBlock);
};

const promoBlock = document.createElement('div');
promoBlock.classList.add('basket-container__promo');

const input = document.createElement('input');
input.classList.add('promo-block__input');
input.type = 'text';
input.placeholder = 'Type a promocode here';

const promoButton = document.createElement('button');
promoButton.classList.add('promo-block__button');
promoButton.textContent = 'Apply';

promoBlock.append(input, promoButton);

const priceBlock = document.createElement('div');
priceBlock.classList.add('basket-container__price');

const priceBlockText = document.createElement('p');
priceBlockText.classList.add('price__text');
priceBlockText.textContent = 'Total: ';

const totalCartPrice = document.createElement('p');
totalCartPrice.classList.add('price__total');
totalCartPrice.textContent = '000000 €';

priceBlock.append(priceBlockText, totalCartPrice);

const deleteBlock = document.createElement('div');
deleteBlock.classList.add('basket-container__delete');

const deleteAllButton = document.createElement('button');
deleteAllButton.classList.add('delete-block__delete-button');
deleteAllButton.textContent = 'Clear cart';

const confirmButton = document.createElement('button');
confirmButton.classList.add('delete-block__confirm-button'); // , 'hidden');
confirmButton.textContent = 'Confirm';

const returnButton = document.createElement('button');
returnButton.classList.add('delete-block__return-button'); // , 'hidden');
returnButton.textContent = 'Return';

const confirmMessage = document.createElement('p');
confirmMessage.classList.add('delete-block__confirm-message'); // , 'hidden');
confirmMessage.textContent =
  'Are you sure you want to delete all items from your cart? This action cannot be undone';

deleteBlock.append(
  deleteAllButton,
  confirmMessage,
  returnButton,
  confirmButton,
);

basketContainer.append(
  basketHeader,
  itemsBlock,
  promoBlock,
  priceBlock,
  deleteBlock,
);

basketPage.append(emptyContainer, basketContainer);

export default basketPage;

export { basketContainer, emptyContainer, itemsBlock, addItemToBasketView };
