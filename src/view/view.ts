import { header } from './header/header';
import footer from './footer/footer';
// import createProductPage from './pages/product/product';

const main = document.createElement('main');
main.classList.add('main');

const mainContainer = document.createElement('div');
mainContainer.classList.add('main__container');

// temporary
// comment next line
main.append(mainContainer);
// and uncomment next lines and import to see product page on main
// createProductPage('honda-gl1800-black').then((page) =>
//   main.append(page),
// );

document.body.append(header, main, footer);

export default mainContainer;
