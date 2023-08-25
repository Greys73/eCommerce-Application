import { header } from './header/header';
import footer from './footer/footer';
import createProductPage from './pages/product/product';
// import { getProductsBySearchField } from '../model/api/apiRoot';

const main = document.createElement('main');
main.classList.add('main');

const mainContainer = document.createElement('div');
mainContainer.classList.add('main__container');
// temporary

// main.append(mainContainer);
createProductPage('kawasaki-versysx250-green').then((page) =>
  main.append(page),
);

document.body.append(header, main, footer);

export default mainContainer;
