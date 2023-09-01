export function createMenu(
  userSection: HTMLElement,
  addressSection: HTMLElement,
) {
  const menu = document.createElement('div');
  menu.className = 'profile-page__menu';

  const userDataTab = document.createElement('div');
  userDataTab.className = 'profile-page__menu-tabs';
  userDataTab.append(userSection);
  const userDataTabInput = document.createElement('input');
  userDataTabInput.type = 'radio';
  userDataTabInput.className = 'profile-page__menu-tabs__radio';
  userDataTabInput.name = 'menu';
  userDataTabInput.id = 'menu-tab-user';
  userDataTabInput.checked = true;
  const userDataTabLabel = document.createElement('label');
  userDataTabLabel.htmlFor = 'menu-tab-user';
  userDataTabLabel.className = 'profile-page__menu-tabs__label';
  userDataTabLabel.classList.add('user-data__description');
  userDataTabLabel.textContent = 'User data';
  menu.append(userDataTabInput, userDataTabLabel, userDataTab);

  const addressDataTab = document.createElement('div');
  addressDataTab.className = 'profile-page__menu-tabs';
  addressDataTab.append(addressSection);
  const addressDataTabInput = document.createElement('input');
  addressDataTabInput.type = 'radio';
  addressDataTabInput.className = 'profile-page__menu-tabs__radio';
  addressDataTabInput.name = 'menu';
  addressDataTabInput.id = 'menu-tab-address';
  addressDataTabInput.checked = false;
  const addressDataTabLabel = document.createElement('label');
  addressDataTabLabel.htmlFor = 'menu-tab-address';
  addressDataTabLabel.className = 'profile-page__menu-tabs__label';
  addressDataTabLabel.classList.add('user-data__description');
  addressDataTabLabel.textContent = 'Addresses';
  menu.append(addressDataTabInput, addressDataTabLabel, addressDataTab);

  return menu;
}
