import * as view from '../view/view';
// import * as mainPage from "../view/pages/main/main";
// import * as regPage from "../view/pages/registration/registration";
// import * as loginPage from "../view/pages/login/login";
// import * as er404Page from "../view/pages/404/404";

type RoutesType = {
  [key: string]: HTMLElement;
};
const routes: RoutesType = {
  // "/": mainPage.default,
  // "/registration": regPage.default,
  // "/login": loginPage.default,
  // "404": er404Page.default,
};

const locationHandler = () => {
  const path = window.location.pathname || '/';
  const section: HTMLElement = routes[path] || routes['404'];
  view.default.append(section);
};

const route = (event: Event) => {
  const location = window.location.pathname;
  event.preventDefault();
  window.history.pushState({}, '', location);
  locationHandler();
};

window.addEventListener('popstate', route);
window.addEventListener('DOMContentLoaded', locationHandler);
