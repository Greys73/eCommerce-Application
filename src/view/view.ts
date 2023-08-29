import { header } from './header/header';
import footer from './footer/footer';
// import productPage from './pages/product/product';
import { fillProductPage } from '../controller/fillProductPage';

const main = document.createElement('main');
main.classList.add('main');

const mainContainer = document.createElement('div');
mainContainer.classList.add('main__container');

main.append(mainContainer);

// temporary
fillProductPage('honda-cb400sf-red');

document.body.append(header, main, footer);

export default mainContainer;
