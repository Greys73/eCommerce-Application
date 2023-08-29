import { header } from './header/header';
import footer from './footer/footer';
// import productPage from './pages/product/product';
// import { fillProductPage } from '../controller/fillProductPage';

const main = document.createElement('main');
main.classList.add('main');

const mainContainer = document.createElement('div');
mainContainer.classList.add('main__container');

// temporary
// comment next line
main.append(mainContainer);

// and uncomment next lines and import to see product page on main
// main.append(productPage)
// fillProductPage('honda-cbr600rr-red')

document.body.append(header, main, footer);

export default mainContainer;
