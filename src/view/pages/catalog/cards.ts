const cardsBlock = document.createElement('div');
cardsBlock.classList.add('items__cards');

export function createCard(
  name: string,
  img: string,
  description: string[],
  price: string,
  discont?: number,
) {
  const card = document.createElement('div');
  card.classList.add('cards__card');

  const cardName = document.createElement('h4');
  cardName.classList.add('card__name');
  cardName.textContent = name;

  function generateDescription(strArr: string[]): void {
    strArr.forEach((el) => {
      const cardText = document.createElement('p');
      cardText.classList.add('card__text');
      cardText.textContent = el;
      card.append(cardText);
    });
  }

  generateDescription(description);

  const cardImg = document.createElement('img');
  cardImg.classList.add('card__image');
  cardImg.src = img;

  const cardPriceBlock = document.createElement('div');
  cardPriceBlock.classList.add('card__price-block');

  const cardPrice = document.createElement('p');
  cardPrice.classList.add('price-block__price');
  cardPrice.textContent = `${price} €`;

  cardPriceBlock.append(cardPrice);

  if (discont) {
    cardPrice.style.textDecoration = 'line-through';

    const cardDiscontPrice = document.createElement('p');
    cardDiscontPrice.classList.add('price-block__discont-price');
    cardDiscontPrice.textContent = `${+price * (1 - discont)} €`;

    const cardDiscont = document.createElement('p');
    cardDiscont.classList.add('price-block__discont');
    cardDiscont.textContent = `-${(discont * 100).toFixed()}%`;

    cardDiscontPrice.append(cardDiscont);

    cardPriceBlock.append(cardDiscontPrice);
  }

  const cardButton = document.createElement('button');
  cardButton.classList.add('card__button');
  cardButton.textContent = 'Add to basket';

  card.prepend(cardName, cardImg);
  card.append(cardPriceBlock, cardButton);

  cardsBlock.append(card);
  return card;
}

export default cardsBlock;
