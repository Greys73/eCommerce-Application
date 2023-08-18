import { header } from '../view/header/header';
import { getLoacalCustomer, setLoacalCustomer } from '../model/login';
import { NavObjType } from '../types/type';

let menu: NavObjType = {};

function switchElements(_logined: boolean) {
  if (_logined) {
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
}

function navChanger(_menu: NavObjType) {
  menu = _menu;
  const customer = getLoacalCustomer();
  switchElements('id' in customer);
  menu.logout.obj?.addEventListener('click', () => {
    setLoacalCustomer({});
    switchElements(false);
  });
}

header.addEventListener('load', ((e: CustomEvent) =>
  navChanger(e.detail)) as EventListener);
