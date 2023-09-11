// import '../../assets/styles/basket.scss';
import emptyImg from '../../../assets/images/empty-cart.png';

const basketPage = document.createElement('div');
basketPage.classList.add('basket-page');

// empty cart

const emptyContainer = document.createElement('div');
emptyContainer.classList.add('basket__empty');

const emptyHeader = document.createElement('h2');
emptyHeader.classList.add('empty__header');
emptyHeader.textContent = 'Warning! The cart is empty!';

const emptyImage = document.createElement('img');
emptyImage.classList.add('empty__image');
emptyImage.src = emptyImg;

const emptyMessage = document.createElement('div');
emptyMessage.classList.add('empty__message');
emptyMessage.textContent =
  "Your cart is currently craving for some high-octane action! Discover our impressive lineup of motorcycles and start adding your dream ride to the cart. Let's hit the road and make every ride unforgettable!";

const emptyButton = document.createElement('a');
emptyButton.classList.add('empty__button');
emptyButton.href = '/catalog';
emptyButton.textContent = 'Choose your bike now!';

emptyContainer.append(emptyHeader, emptyImage, emptyMessage, emptyButton);

// not empty cart

const basketContainer = document.createElement('div');
basketContainer.classList.add('basket__basket-container');

const itemsBlock = document.createElement('div');
itemsBlock.classList.add('basket-container__items');

// get from api (or calculate)

const itemsArr = [
  {
    name: 'Honda CBR 1000 RR',
    price: 22000,
    priceDiscont: 19800,
    img: 'https://9e649986e9e870f67d9d-e4d63a8edab70d942851d988166221b8.ssl.cf3.rackcdn.com/ZX25R_2-DoOAPT56.png',
    year: '2023',
    type: 'Sport',
    dsp: 599,
    power: 192,
    weight: 194,
    amount: 2,
  },
  {
    name: 'Another model',
    price: 6000,
    priceDiscont: 6000,
    img: 'https://9e649986e9e870f67d9d-e4d63a8edab70d942851d988166221b8.ssl.cf3.rackcdn.com/CBR600RR_1-FhmjjIB0.png',
    year: '2010',
    type: 'Touring',
    dsp: 350,
    power: 35,
    weight: 350,
    amount: 1,
  },
];

// continue view

// function createCartItems(itemsArr) {

// }

itemsArr.forEach((el) => {
  const item = document.createElement('div');
  item.classList.add('items__item');

  const image = document.createElement('img');
  image.classList.add('item__image');
  image.src = el.img;

  const params = document.createElement('div');
  params.classList.add('item__params-block');

  const name = document.createElement('a');
  name.classList.add('item__name');
  name.textContent = el.name;
  // SKU?
  name.href = '/sku';

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
  fullPrice.textContent = el.price.toString();

  const discontPrice = document.createElement('p');
  discontPrice.classList.add('price-block__item-discont-price');
  discontPrice.textContent = el.priceDiscont.toString();

  const discont = document.createElement('p');
  discont.classList.add('price-block__item-discont');
  discont.textContent = `${Math.round(
    1 - el.priceDiscont / el.price,
  )}`.toString();

  price.append(fullPrice, discont, discontPrice);

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
  totalPrice.textContent = `${el.priceDiscont * el.amount} EUR`;

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('item__delete');
  deleteButton.textContent = 'del';

  item.append(image, params, price, amount, totalPrice, deleteButton);

  itemsBlock.append(item);
});

const promoBlock = document.createElement('div');
promoBlock.classList.add('basket-container__promo');

const input = document.createElement('input');
input.classList.add('promo-block__input');
input.type = 'text';
input.placeholder = 'Type promocode here';

const promoButton = document.createElement('button');
promoButton.classList.add('promo-block__button');
promoButton.textContent = 'Apply promo';

promoBlock.append(input, promoButton);

const priceBlock = document.createElement('div');
priceBlock.classList.add('basket-container__price');

const priceBlockText = document.createElement('p');
priceBlockText.classList.add('price__text');
priceBlockText.textContent = 'Total: ';

const totalCartPrice = document.createElement('p');
totalCartPrice.classList.add('price__total');
totalCartPrice.textContent = '000000';

priceBlock.append(priceBlockText, totalCartPrice);

const deleteBlock = document.createElement('div');
deleteBlock.classList.add('basket-container__delete');

const deleteAllButton = document.createElement('button');
deleteAllButton.classList.add('delete-block__delete-button');
deleteAllButton.textContent = 'Clear cart';

const confirmButton = document.createElement('button');
confirmButton.classList.add('delete-block__confirm-button');
confirmButton.textContent = 'Confirm';

basketContainer.append(itemsBlock, promoBlock, priceBlock, deleteBlock);

basketPage.append(emptyContainer, basketContainer);

export default basketPage;
