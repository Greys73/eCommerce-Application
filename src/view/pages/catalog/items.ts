import cardsBlock from './cards';
import categoryLogoObj from '../../../model/data/images-src';

const items = document.createElement('div');
items.classList.add('catalog__items');

// routing block

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

// searching block

const searchingBlock = document.createElement('div');
searchingBlock.classList.add('items__search');

const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.classList.add('search__search-field');
searchInput.placeholder = 'Search';

const searchFilter = document.createElement('p');
searchFilter.classList.add('search__filter');
searchFilter.textContent = 'Sorting ▼';

searchingBlock.append(searchInput, searchFilter);

// category block

const categoryArr = [
  'Honda',
  'Kawasaki',
  'Yamaha',
  'Suzuki',
  'Standard',
  'Sport',
  'Touring',
  'Cruiser',
]; // get from API

const categoryBlock = document.createElement('div');
categoryBlock.classList.add('items__category');

categoryArr.forEach((el) => {
  const logo = document.createElement('img');
  logo.classList.add('category__logo');
  logo.src = categoryLogoObj[el];
  logo.alt = `${el}-logo`;

  categoryBlock.append(logo);
});

// compiling

items.append(routingBlock, searchingBlock, categoryBlock, cardsBlock);

export default items;
