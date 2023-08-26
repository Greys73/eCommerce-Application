import yamahaLogo from '../../../assets/images/yamaha-logo.png';
import hondaLogo from '../../../assets/images/honda-logo.png';
import kawasakiLogo from '../../../assets/images/kawasaki-logo.png';
import suzukiLogo from '../../../assets/images/suzuki-logo.png';

const categoryLogoObj: Record<string, string> = {
  Yamaha: yamahaLogo,
  Honda: hondaLogo,
  Kawasaki: kawasakiLogo,
  Suzuki: suzukiLogo,
};

const categoryArr = ['Honda', 'Kawasaki', 'Yamaha', 'Suzuki'];

const productsPage = document.createElement('div');
productsPage.classList.add('products-page');

const categorySection = document.createElement('div');
categorySection.classList.add('products-page__category', 'hidden');

categoryArr.forEach((el) => {
  const logo = document.createElement('img');
  logo.classList.add('category__logo');
  logo.src = categoryLogoObj[el];
  logo.alt = `${el}-logo`;

  categorySection.append(logo);
});

// products

const catalogSection = document.createElement('div');
catalogSection.classList.add('products-page__catalog');

const filters = document.createElement('div');
filters.classList.add('catalog__filters');

const items = document.createElement('div');
items.classList.add('catalog__items');

const routingBlock = document.createElement('div');
routingBlock.classList.add('items__routing');

const categoryName = document.createElement('p');
categoryName.classList.add('routing__text');
categoryName.textContent = 'Honda';

const subCategoryName = document.createElement('p');
subCategoryName.classList.add('routing__text');
subCategoryName.textContent = ' / Sport';

const modelName = document.createElement('p');
modelName.classList.add('routing__text');
modelName.textContent = ' / CBR 954RR';

routingBlock.append(categoryName, subCategoryName, modelName);

const searchingBlock = document.createElement('div');
searchingBlock.classList.add('items__search');

const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.classList.add('search__search-field');
searchInput.placeholder = 'Search';

const searchFilter = document.createElement('p');
searchFilter.classList.add('search__filter');
searchFilter.textContent = 'Filter ▼';

searchingBlock.append(searchInput, searchFilter);

// Cards

const cardsBlock = document.createElement('div');
cardsBlock.classList.add('items__cards');

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

const productsArr = [
  [
    'Honda CB 400',
    hondaLogo,
    'Best motrcycle from Honda, ever, trust me',
    '2000',
    0.2,
  ],
  [
    'Yamaha WR 450',
    yamahaLogo,
    'Best enduro motrcycle from Yamaha, it is not a lie',
    '4000',
    0.1,
  ],
  [
    'Honda CB 400',
    hondaLogo,
    'Best motrcycle from Honda, ever, trust me',
    '2000',
    0.2,
  ],
  [
    'Yamaha WR 450',
    yamahaLogo,
    'Best enduro motrcycle from Yamaha, it is not a lie',
    '4000',
    0.1,
  ],
  [
    'Honda CB 400',
    hondaLogo,
    'Best motrcycle from Honda, ever, trust me',
    '2000',
    0.2,
  ],
  [
    'Yamaha WR 450',
    yamahaLogo,
    'Best enduro motrcycle from Yamaha, it is not a lie',
    '4000',
    0.1,
  ],
];

productsArr.forEach((el) => createCard(el[0], el[1], el[2], el[3], el[4]));

items.append(routingBlock, searchingBlock, cardsBlock);

catalogSection.append(filters, items);

productsPage.append(categorySection, catalogSection);

export default productsPage;
