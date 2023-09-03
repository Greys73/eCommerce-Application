import { getProductsBySearchField } from '../model/api/apiRoot';
import { searchInput } from '../view/pages/catalog/items';
import { placeCards } from './filterSubmitHandler';

const searchHandler = async () => {
  const searchValue = searchInput.value;
  console.log(searchValue);
  try {
    const cardsData = await getProductsBySearchField(searchValue.toLowerCase());
    placeCards(cardsData);
  } catch (err) {
    console.log(err);
  }
};

searchInput.addEventListener('change', searchHandler);
