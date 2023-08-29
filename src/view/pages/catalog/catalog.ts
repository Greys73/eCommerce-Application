import items from './items';
import filters from './filters';

const productsPage = document.createElement('div');
productsPage.classList.add('products-page');

productsPage.append(filters, items);

export default productsPage;
