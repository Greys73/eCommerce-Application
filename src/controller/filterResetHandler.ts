import { filterByParams } from '../model/api/apiRoot';
import filters from '../view/pages/catalog/filters';
import { getCategory, placeCards } from './filterSubmitHandler';
import { getLimit, getOffset, updatePaginator } from './paginatorHandlers';

const filterReset = async () => {
  const categoryFilter = await getCategory();
  const limit = getLimit();
  const offset = getOffset();
  const resp = await filterByParams([categoryFilter], [], offset, limit);
  const cardsData = resp.body.results;
  updatePaginator(resp.body);
  placeCards(cardsData);
};

filters.addEventListener('reset', filterReset);
