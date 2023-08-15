import header from './header/header';
import footer from './footer/footer';

const main = document.createElement('main');
main.classList.add('main');

const mainContainer = document.createElement('div');
mainContainer.classList.add('main__container');

main.append(mainContainer);

document.body.append(header, main, footer);

export default mainContainer;
