const profilePage = document.createElement('div');
profilePage.classList.add('profile-page');

const header = document.createElement('h1');
header.classList.add('profile-page__header');
header.textContent = 'Profile';

const userDataHeader = document.createElement('h2');
userDataHeader.classList.add('user-data__header');
userDataHeader.textContent = 'User data:';

function createProfileBlock(
  fieldName: string,
  value: string,
  inputType: string,
  isEdited: boolean,
): HTMLElement {
  const container = document.createElement('div');
  container.classList.add('user-data__container');
  container.id = fieldName.toLowerCase().replace(' ', '-');

  const dataBlock = document.createElement('div');
  dataBlock.classList.add('user-data__data-block');

  const description = document.createElement('p');
  description.classList.add('user-data__description');
  description.textContent = fieldName.concat(':');

  const fieldValue = document.createElement('p');
  fieldValue.classList.add('user-data__value');
  fieldValue.textContent = value;

  dataBlock.append(description, fieldValue);

  container.append(dataBlock);

  if (isEdited === true) {
    // console.log('fieldName', fieldName);
    // console.log('form', fieldName.includes('password'));
    const input = document.createElement('input');
    input.classList.add('user-data__input');
    if (fieldName.includes('password') === false) {
      input.classList.add('hidden');
    } else {
      description.classList.add('user-data__description_password');
    }
    input.value = value;
    input.type = inputType;

    dataBlock.append(input);

    const errorBlock = document.createElement('p');
    errorBlock.classList.add('user-data__error-block');
    errorBlock.textContent = 'some error';

    container.append(errorBlock);
  }

  return container;
}

function createAddressContainer(/* AddressData: AddressType , isShipping: boolean, isBilling: boolean, isDefault: boolean */): HTMLElement {
  const container = document.createElement('div');
  container.classList.add('address__container');

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

  const defaultShippingButton = document.createElement('button');
  defaultShippingButton.textContent = 'set as default shipping';
  defaultShippingButton.classList.add('address__default-button');

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

  // return
  return container;
}

// User data

const userDataSection = document.createElement('div');
userDataSection.classList.add('profile-page__user-data');

const name = createProfileBlock('Name', '{{User}}', 'text', true);
const lastName = createProfileBlock('Last name', '{{LastUser}}', 'text', true);
const phone = createProfileBlock('Phone', '{{+333445556677}}', 'tel', false);
const birthDate = createProfileBlock(
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

const addressBlock = createAddressContainer();
addressSection.append(addressBlock);

const addressBlock2 = createAddressContainer();
addressSection.append(addressBlock2);

profilePage.append(
  header,
  userDataHeader,
  userDataSection,
  addressHeader,
  addressSection,
);

// eventListners

editButton.addEventListener('click', () => {
  [name, lastName, birthDate].forEach((el) => {
    // console.log(el.children);
    el.children[0].children[1].classList.add('hidden');
    el.children[0].children[2].classList.remove('hidden');
  });
  editButton.classList.add('hidden');
  confirmButton.classList.remove('hidden');
});

confirmButton.addEventListener('click', () => {
  [name, lastName, birthDate].forEach((el) => {
    console.log(el.children);
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
