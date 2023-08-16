import header from '../view/header/header';
import { getLoacalCustomer, setLoacalCustomer } from '../model/login';
import { NavObjType } from '../types/type';

function navChanger(menu: NavObjType) {
  const customer = getLoacalCustomer();
  if ('id' in customer) {
    menu.sigin.obj?.classList.add('hidden');
    menu.login.obj?.classList.add('hidden');
    menu.logout.obj?.classList.remove('hidden');
    menu.profile.obj?.classList.remove('hidden');
  } else {
    menu.logout.obj?.classList.add('hidden');
    menu.profile.obj?.classList.add('hidden');
    menu.sigin.obj?.classList.remove('hidden');
    menu.login.obj?.classList.remove('hidden');
  }
  menu.logout.obj?.addEventListener('click', () => setLoacalCustomer({}));
}

header.addEventListener('load', ((e: CustomEvent) =>
  navChanger(e.detail)) as EventListener);
