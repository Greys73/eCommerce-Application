import * as mainSection from '../view/view';
import * as mainPage from '../view/pages/main/main';
import * as regPage from '../view/pages/registration/registration';
import * as loginPage from '../view/pages/login/login';
import * as er404Page from '../view/pages/404/404';

type RoutesType = {
  [key: string]: HTMLElement;
};
const routes: RoutesType = {
  '/': mainPage.default,
  // '/products':
  // '/basket':
  // '/about':
  '/registration': regPage.default,
  '/login': loginPage.default,
  // '/profile':
  // '/logout':
  '404': er404Page.default,
};

function locationHandler() {
  const path = window.location.pathname || '/';
  const page: HTMLElement = routes[path] || routes['404'];
  mainSection.default.innerHTML = '';
  mainSection.default.append(page);
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
  locationHandler();
}

window.addEventListener('popstate', locationHandler);
window.addEventListener('DOMContentLoaded', contentLoaded);
