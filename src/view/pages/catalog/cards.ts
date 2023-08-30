import categoryLogoObj from '../../../model/data/images-src';

const cardsBlock = document.createElement('div');
cardsBlock.classList.add('items__cards');

const productsArr = [
  // get from API
  [
    'Honda CB 400',
    categoryLogoObj.Honda,
    'Best motrcycle from Honda, ever, trust me',
    '2000',
    0.2,
  ],
  [
    'Yamaha WR 450',
    categoryLogoObj.Yamaha,
    'Best enduro motrcycle from Yamaha, it is not a lie',
    '4000',
    0.1,
  ],
  [
    'Honda CB 400',
    categoryLogoObj.Honda,
    'Best motrcycle from Honda, ever, trust me',
    '2000',
    0.2,
  ],
  [
    'Yamaha WR 450',
    categoryLogoObj.Kawasaki,
    'Best enduro motrcycle from Yamaha, it is not a lie',
    '4000',
    0.1,
  ],
  [
    'Honda CB 400',
    categoryLogoObj.Suzuki,
    'Best motrcycle from Honda, ever, trust me',
    '2000',
    0.2,
  ],
  [
    'Yamaha WR 450',
    categoryLogoObj.Honda,
    'Best enduro motrcycle from Yamaha, it is not a lie',
    '4000',
    0.1,
  ],
];

function createCard(
  name: string,
  img: string,
  description: string,
  price: string,
  discont?: number,
) {
  const card = document.createElement('div');
  card.classList.add('cards__card');

  const cardName = document.createElement('h4');
  cardName.classList.add('card__name');
  cardName.textContent = name;

  const cardText = document.createElement('p');
  cardText.classList.add('card__text');
  cardText.textContent = description;

  const cardImg = document.createElement('img');
  cardImg.classList.add('card__image');
  cardImg.src = img;

  const cardPriceBlock = document.createElement('div');
  cardPriceBlock.classList.add('card__price-block');

  const cardPrice = document.createElement('p');
  cardPrice.classList.add('price-block__price');
  cardPrice.textContent = price;

  cardPriceBlock.append(cardPrice);

  if (discont) {
    cardPrice.style.textDecoration = 'line-through';

    const cardDiscontPrice = document.createElement('p');
    cardDiscontPrice.classList.add('price-block__discont-price');
    cardDiscontPrice.textContent = (Number(price) * discont).toString();

    const cardDiscont = document.createElement('p');
    cardDiscont.classList.add('price-block__discont');
    cardDiscont.textContent = (discont * 100).toString().concat('%');

    cardDiscontPrice.append(cardDiscont);

    cardPriceBlock.append(cardDiscontPrice);
  }

  const cardButton = document.createElement('button');
  cardButton.classList.add('card__button');
  cardButton.textContent = 'Add to basket';

  card.append(cardName, cardImg, cardText, cardPriceBlock, cardButton);

  cardsBlock.append(card);
}

productsArr.forEach((el) =>
  createCard(
    el[0] as string,
    el[1] as string,
    el[2] as string,
    el[3] as string,
    el[4] as number,
  ),
);

export default cardsBlock;
