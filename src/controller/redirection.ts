import { getLoacalCustomer } from '../model/login';
import { fillMenu } from './fillCatalogPage';
import { fillProductPage } from './fillProductPage';

type RedirectMapElement = {
  from: string;
  to: string;
  loginCondition: boolean;
};

const redirectionMap: RedirectMapElement[] = [
  {
    from: '/login',
    to: '/',
    loginCondition: true,
  },
  {
    from: '/registration',
    to: '/profile',
    loginCondition: true,
  },
  {
    from: '/profile',
    to: '/login',
    loginCondition: false,
  },
];

function parseSearch(href: Location) {
  const params = new URLSearchParams(href.search);
  if (href.pathname === '/product') {
    const id = params.get('sku') || params.get('key') || '';
    fillProductPage(id.toString());
  }
  if (href.pathname === '/catalog') {
    const id = params.get('category') || '';
    fillMenu(id);
  }
}

export function checkRedirection(location: string): boolean {
  let result = false;
  const customer = getLoacalCustomer();
  const loginCondition = 'id' in customer;
  redirectionMap.forEach((element) => {
    if (
      element.from === location &&
      loginCondition === element.loginCondition
    ) {
      result = true;
      setTimeout(() => {
        window.routeLocation = element.to;
      }, 50);
    } else {
      parseSearch(window.location);
    }
  });
  return result;
}
