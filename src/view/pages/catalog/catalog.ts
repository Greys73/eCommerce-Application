import categoryLogoObj from '../../../model/data/images-src';
import items from './items';

const categoryArr = ['Honda', 'Kawasaki', 'Yamaha', 'Suzuki'];

const productsPage = document.createElement('div');
productsPage.classList.add('products-page');

const categorySection = document.createElement('div');
categorySection.classList.add('products-page__category');

categoryArr.forEach((el) => {
  const logo = document.createElement('img');
  logo.classList.add('category__logo');
  logo.src = categoryLogoObj[el];
  logo.alt = `${el}-logo`;

  categorySection.append(logo);
});

// products

const filters = document.createElement('div');
filters.classList.add('catalog__filters');

// Cards

productsPage.append(filters, items);

export default productsPage;
