import * as mainSection from '../view/view';
import * as mainPage from '../view/pages/main/main';
import * as regPage from '../view/pages/registration/registration';
import * as loginPage from '../view/pages/login/login';
import * as er404Page from '../view/pages/404/404';
import * as catalogPage from '../view/pages/catalog/catalog';
import * as productPage from '../view/pages/product/product';
import * as profilePage from '../view/pages/profile/profile';
import * as basketPage from '../view/pages/basket/basket';
import * as aboutPage from '../view/pages/about/about';
import { checkRedirection, getSearch } from './redirection';

type RoutesType = {
  [key: string]: HTMLElement;
};

const routes: RoutesType = {
  '/': mainPage.default,
  '/catalog': catalogPage.default,
  '/product': productPage.default,
  '/basket': basketPage.default,
  '/about': aboutPage.default,
  '/registration': regPage.default,
  '/login': loginPage.default,
  '/profile': profilePage.default,
  '404': er404Page.default,
};

function locationHandler() {
  const pathName = window.location.pathname || '/';

  const main = document.querySelector('.main');
  if (pathName.slice(1) === 'about') {
    main?.classList.add('background');
  } else {
    main?.classList.remove('background');
  }

  if (!checkRedirection(pathName)) {
    const page: HTMLElement = routes[pathName] || routes['404'];
    mainSection.default.innerHTML = '';
    mainSection.default.append(page);
    const event = new CustomEvent('PageContentLoaded', {
      detail: getSearch(window.location),
    });
    window.dispatchEvent(event);
  }
}

function route(e: Event) {
  const location = (e.target as HTMLAnchorElement).href;
  window.history.pushState({}, '', location);
  locationHandler();
}

function linkClick(e: Event) {
  if ((e.target as HTMLAnchorElement).origin === window.location.origin) {
    e.preventDefault();
    route(e);
  }
}

function contentLoaded() {
  document.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', linkClick);
  });
}

Object.defineProperty(window, 'routeLocation', {
  get() {
    return this.value;
  },
  set(_value: string) {
    this.value = _value;
    window.history.pushState({}, '', this.value);
    locationHandler();
  },
});

window.addEventListener('load', locationHandler);
window.addEventListener('popstate', locationHandler);
window.addEventListener('PageContentLoaded', contentLoaded);
