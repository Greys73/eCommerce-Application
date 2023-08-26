import { createProfileBlock } from '../../../utils/view/createProfileBlock';
import resultMessage from './resultMessage';

const profilePage: HTMLElement = document.createElement('div');
profilePage.classList.add('profile-page');

const header = document.createElement('h1');
header.classList.add('profile-page__header');
header.textContent = 'Profile';

const userDataHeader = document.createElement('h2');
userDataHeader.classList.add('user-data__header');
userDataHeader.textContent = 'User data:';

export function createAddressContainer(id: string): HTMLElement {
  const container = document.createElement('div');
  container.classList.add('address__container');
  container.id = id;

  const defaultShippingMarker = document.createElement('p');
  defaultShippingMarker.classList.add('address__marker_shipping', 'hidden');
  defaultShippingMarker.textContent = 'Default shipping';

  const defaultBillingMarker = document.createElement('p');
  defaultBillingMarker.classList.add('address__marker_billing', 'hidden');
  defaultBillingMarker.textContent = 'Default billing';

  const country = createProfileBlock('Country', '{{Country}}', 'text', true);
  const city = createProfileBlock('City', '{{City}}', 'text', true);
  const address = createProfileBlock('Address', '{{Address}}', 'text', true);
  const postalCode = createProfileBlock('Postal Code', '00000', 'number', true);

  const editButton = document.createElement('button');
  editButton.classList.add('user-data__edit-button');
  editButton.textContent = 'edit';

  const confirmButton = document.createElement('button');
  confirmButton.classList.add('user-data__confirm-button', 'hidden');
  confirmButton.textContent = 'confirm';

  const defaultBillingButton = document.createElement('button');
  defaultBillingButton.textContent = 'set as default billing';
  defaultBillingButton.classList.add('address__default-button');
  defaultBillingButton.setAttribute('name', 'defaultBillingButton');

  const defaultShippingButton = document.createElement('button');
  defaultShippingButton.textContent = 'set as default shipping';
  defaultShippingButton.classList.add('address__default-button');
  defaultShippingButton.setAttribute('name', 'defaultShippingButton');

  container.append(
    defaultShippingMarker,
    defaultBillingMarker,
    country,
    city,
    address,
    postalCode,
    editButton,
    confirmButton,
    defaultShippingButton,
    defaultBillingButton,
  );

  // listner functions

  editButton.addEventListener('click', () => {
    [country, city, address, postalCode].forEach((el) => {
      // console.log(el.children);
      el.children[0].children[1].classList.add('hidden');
      el.children[0].children[2].classList.remove('hidden');
    });
    editButton.classList.add('hidden');
    confirmButton.classList.remove('hidden');
  });

  confirmButton.addEventListener('click', () => {
    [country, city, address, postalCode].forEach((el) => {
      console.log(el.children);
      el.children[0].children[1].classList.remove('hidden');
      el.children[0].children[2].classList.add('hidden');
    });
    editButton.classList.remove('hidden');
    confirmButton.classList.add('hidden');
  });

  defaultShippingButton.addEventListener('click', () => {
    defaultShippingMarker.classList.remove('hidden');
    container.classList.add('background-shipping');
  });

  defaultBillingButton.addEventListener('click', () => {
    defaultBillingMarker.classList.remove('hidden');
    container.classList.add('background-billing');
  });

  return container;
}

// User data

const userDataSection = document.createElement('div');
userDataSection.classList.add('profile-page__user-data');

export const name = createProfileBlock('Name', '{{User}}', 'text', true);
export const lastName = createProfileBlock(
  'Last name',
  '{{LastUser}}',
  'text',
  true,
);
export const phone = createProfileBlock(
  'Phone',
  '{{+333445556677}}',
  'tel',
  false,
);
export const birthDate = createProfileBlock(
  'Date of Birth',
  '2018-08-23',
  'date',
  true,
);

const changePasswordButton = document.createElement('button');
changePasswordButton.classList.add('user-data__password-button');
changePasswordButton.textContent = 'Change Password';

const passwordBlock = document.createElement('div');
passwordBlock.classList.add('user-data__password-block', 'hidden');

const prevPassword = createProfileBlock(
  'Current password',
  '',
  'password',
  true,
);
const password = createProfileBlock('New password', '', 'password', true);
const confirmPassword = createProfileBlock(
  'Confirm new password',
  '',
  'password',
  true,
);

const sendPasswordRequest = document.createElement('button');
sendPasswordRequest.classList.add('password__request-button');
sendPasswordRequest.textContent = 'Update password';

passwordBlock.append(
  prevPassword,
  password,
  confirmPassword,
  sendPasswordRequest,
);

const editButton = document.createElement('button');
editButton.classList.add('user-data__edit-button');
editButton.textContent = 'edit';

const confirmButton = document.createElement('button');
confirmButton.classList.add('user-data__confirm-button', 'hidden');
confirmButton.textContent = 'confirm';

userDataSection.append(
  name,
  lastName,
  phone,
  birthDate,
  editButton,
  confirmButton,
  changePasswordButton,
  passwordBlock,
);

// Adress section

const addressSection = document.createElement('div');
addressSection.classList.add('profile-page__address');

const addressHeader = document.createElement('h2');
addressHeader.classList.add('address__header');
addressHeader.textContent = 'Addresses:';

/* const addressBlock = createAddressContainer();
addressSection.append(addressBlock);

const addressBlock2 = createAddressContainer();
addressSection.append(addressBlock2); */

profilePage.append(
  header,
  userDataHeader,
  userDataSection,
  addressHeader,
  addressSection,
  resultMessage,
);

// eventListners

editButton.addEventListener('click', () => {
  [name, lastName, birthDate].forEach((el) => {
    el.children[0].children[1].classList.add('hidden');
    el.children[0].children[2].classList.remove('hidden');
  });
  editButton.classList.add('hidden');
  confirmButton.classList.remove('hidden');
});

confirmButton.addEventListener('click', () => {
  [name, lastName, birthDate].forEach((el) => {
    el.children[0].children[1].classList.remove('hidden');
    el.children[0].children[2].classList.add('hidden');
  });
  editButton.classList.remove('hidden');
  confirmButton.classList.add('hidden');
});

changePasswordButton.addEventListener('click', () => {
  passwordBlock.classList.remove('hidden');
  changePasswordButton.classList.add('hidden');
});

sendPasswordRequest.addEventListener('click', () => {
  passwordBlock.classList.add('hidden');
  sendPasswordRequest.classList.remove('hidden');
});

export default profilePage;
