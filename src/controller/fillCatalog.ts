import { ProductDraft } from '@commercetools/platform-sdk';
import { getAllProducts } from '../model/api/apiRoot';
import cardsBlock from '../view/pages/catalog/cards';
import { placeCards } from './filterSubmitHandler';

export const fillCardsBlock = async () => {
  const resp = await getAllProducts();
  const cards = resp.body.results as ProductDraft[];
  cardsBlock.innerHTML = '';
  placeCards(cards);
};
