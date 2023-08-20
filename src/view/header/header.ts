import logo from '../../assets/images/header-logo.png';
import '../../assets/styles/footer.scss';
import { NavObjType } from '../../types/type';

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

const navObj: NavObjType = {
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
    routing: '/login',
  },
};

Object.entries(navObj).forEach(([key, value]) => {
  const el = document.createElement('a');
  el.classList.add('nav__item');
  el.id = key;
  el.textContent = value.text;
  el.href = value.routing;

  navObj[key].obj = el;
  navContainer.append(el);
});

const changeRegStatus = () => {
  const arr = ['sigin', 'login', 'profile', 'logout'];
  arr.forEach((el) => {
    const element = document.getElementById(el);
    element?.classList.toggle('hidden');
  });
};

// create burger-icon

const burger = document.createElement('div');
burger.classList.add('header__burger');

for (let i = 0; i < 4; i += 1) {
  const span = document.createElement('span');
  span.classList.add('burger__span');
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
navContainer.childNodes.forEach((el) =>
  el.addEventListener('click', () => {
    if (nav.classList.contains('header__nav_visable')) clickBurger();
  }),
);

const event = new CustomEvent('DOMContentLoaded', { detail: navObj });
logoImg.addEventListener('load', () => window.dispatchEvent(event));

export { header, changeRegStatus };
