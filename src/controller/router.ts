import * as mainSection from '../view/view';
import * as mainPage from '../view/pages/main/main';
import * as regPage from '../view/pages/registration/registration';
import * as loginPage from '../view/pages/login/login';
import * as er404Page from '../view/pages/404/404';
import * as profilePage from '../view/pages/user/user';
import * as productPage from '../view/pages/product/product';
import * as productsPage from '../view/pages/catalog/catalog';

type RoutesType = {
  [key: string]: HTMLElement;
};
const routes: RoutesType = {
  '/': mainPage.default,
  '/products': productsPage.default,
  '/product': productPage.default,
  // '/basket':
  // '/about':
  '/registration': regPage.default,
  '/login': loginPage.default,
  '/profile': profilePage.default,
  // '/logout':
  '404': er404Page.default,
};

function locationHandler() {
  const path = window.location.pathname || '/';
  const page: HTMLElement = routes[path] || routes['404'];
  mainSection.default.innerHTML = '';
  mainSection.default.append(page);
  window.dispatchEvent(new Event('DOMContentLoaded'));
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
window.addEventListener('DOMContentLoaded', contentLoaded);
