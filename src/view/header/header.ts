import logo from '../../assets/images/header-logo.png';

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

  nav.append(el);
});

headerContainer.append(headerLogo, nav);

export default header;
