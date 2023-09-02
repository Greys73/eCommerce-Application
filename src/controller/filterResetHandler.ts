import { filterByParams, getAllProducts } from '../model/api/apiRoot';
import filters from '../view/pages/catalog/filters';
import { getCategory, placeCards } from './filterSubmitHandler';

const filterReset = async () => {
  const categoryFilter = await getCategory();
  let resp;
  console.log(categoryFilter);
  if (categoryFilter) {
    resp = await filterByParams([categoryFilter]);
  } else {
    resp = await getAllProducts();
  }
  const cardsData = resp.body.results;
  placeCards(cardsData);
};

filters.addEventListener('reset', filterReset);
