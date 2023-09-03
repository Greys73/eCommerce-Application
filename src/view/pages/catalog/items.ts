import cardsBlock from './cards';

const items = document.createElement('div');
items.classList.add('catalog__items');

// routing block

const routingBlock = document.createElement('div');
routingBlock.classList.add('items__routing');

const catalogName = document.createElement('a');
catalogName.classList.add('routing__text');
catalogName.textContent = 'Catalog';
catalogName.href = '/catalog';

export const categoryName = document.createElement('a');
categoryName.classList.add('routing__text');
categoryName.textContent = '';

export const subCategoryName = document.createElement('a');
subCategoryName.classList.add('routing__text');
subCategoryName.textContent = '';

routingBlock.append(catalogName, categoryName, subCategoryName);

// searching block

const searchingBlock = document.createElement('div');
searchingBlock.classList.add('items__search');

const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.classList.add('search__search-field');
searchInput.placeholder = 'Search';

export const searchFilterBlock = document.createElement('select');
searchFilterBlock.classList.add('search__filter-block');
searchFilterBlock.name = 'sorting';
searchFilterBlock.setAttribute('form', 'filters');

const searchFilterSort = document.createElement('option');
searchFilterSort.classList.add('search__filter');
searchFilterSort.textContent = 'Sort';
searchFilterSort.selected = true;
searchFilterSort.value = '';

const searchFilterNameASC = document.createElement('option');
searchFilterNameASC.classList.add('search__filter');
searchFilterNameASC.textContent = 'Sort by Name: A-Z';
searchFilterNameASC.value = 'name.en asc';

const searchFilterNameDESC = document.createElement('option');
searchFilterNameDESC.classList.add('search__filter');
searchFilterNameDESC.textContent = 'Sort by Name: Z-A';
searchFilterNameDESC.value = 'name.en desc';

const searchFiltePriceASC = document.createElement('option');
searchFiltePriceASC.classList.add('search__filter');
searchFiltePriceASC.textContent = 'Sort by Lowest Price';
searchFiltePriceASC.value = 'price asc';

const searchFiltePriceDESC = document.createElement('option');
searchFiltePriceDESC.classList.add('search__filter');
searchFiltePriceDESC.textContent = 'Sort by Highest Price';
searchFiltePriceDESC.value = 'price desc';

searchFilterBlock.append(
  searchFilterSort,
  searchFilterNameASC,
  searchFilterNameDESC,
  searchFiltePriceASC,
  searchFiltePriceDESC,
);

searchingBlock.append(searchInput, searchFilterBlock);

export const categoryBlock = document.createElement('div');
categoryBlock.classList.add('items__category');

// compiling

items.append(routingBlock, searchingBlock, categoryBlock, cardsBlock);

export default items;
