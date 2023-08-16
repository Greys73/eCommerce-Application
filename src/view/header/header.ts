import logo from '../../assets/images/header-logo.png';
import '../../assets/styles/footer.scss';

const header = document.createElement('header');
header.classList.add('header');

const headerContainer = document.createElement('div');
headerContainer.classList.add('header__container');
header.append(headerContainer);

// create HeaderLogo

const headerLogo = document.createElement('div');
headerLogo.classList.add('header__logo');

const logoImg = document.createElement('img');
logoImg.classList.add('logo__image');
logoImg.src = logo;
logoImg.alt = 'DreamMoto logo';

const logoText = document.createElement('h1');
logoText.classList.add('logo__text');

headerLogo.append(logoImg, logoText);

// create Nav

const nav = document.createElement('nav');
nav.classList.add('header__nav');

const navContainer = document.createElement('div');
navContainer.classList.add('header__nav-container');
nav.append(navContainer);

const navObj = {
  'main-page': {
    text: 'Main page 🏠',
    routing: '/',
  },
  products: {
    text: 'Products 📋',
    routing: '/products',
  },
  basket: {
    text: 'Basket 🛒',
    routing: '/basket',
  },
  about: {
    text: 'About us 🙋‍♂️🙋‍♀️',
    routing: '/about',
  },
  sigin: {
    text: 'Sign in 👨‍💻',
    routing: '/registration',
  },
  login: {
    text: 'Log in 🔓',
    routing: '/login',
  },
  profile: {
    text: 'Profile 👤',
    routing: '/profile',
  },
  logout: {
    text: 'Log out 🔐',
    routing: '/logout',
  },
};

Object.entries(navObj).forEach(([key, value]) => {
  console.log('key=', key, ', value=', value);

  const el = document.createElement('a');
  el.classList.add('nav__item');
  el.id = key;
  el.textContent = value.text;
  el.href = value.routing.slice(1);

  if (value.routing === '/profile' || value.routing === '/logout')
    el.classList.add('hidden');
  // if (value.routing === '/registration' || value.routing === '/login') el.classList.add('hidden');

  navContainer.append(el);
});

// create burger-icon

const burger = document.createElement('div');
burger.classList.add('header__burger');

for (let i = 0; i < 4; i += 1) {
  const span = document.createElement('span');
  span.classList.add('burger__span');
  // if (i === 0) span.classList.add('rotated');
  // if (i === 3) span.classList.add('rotated-reverse');
  burger.append(span);
}

headerContainer.append(headerLogo, nav, burger);

const clickBurger = (): void => {
  nav.classList.toggle('header__nav_visable');

  burger.children[0].classList.toggle('hidden');
  burger.children[1].classList.toggle('rotated');
  burger.children[2].classList.toggle('rotated-reverse');
  burger.children[3].classList.toggle('hidden');
};

burger.addEventListener('click', clickBurger);

export default header;
