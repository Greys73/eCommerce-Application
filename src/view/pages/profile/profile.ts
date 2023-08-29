import countries from '../../../model/data/countries';
import { FormBlock } from '../../../types/type';
import checkAgeParams from '../../../utils/checkAgeParams';
import createFormBlock from '../../../utils/view/createFormBlock';
import createButtonsFor from './buttons';
import { createMenu } from './menu';
import resultMessage from './resultMessage';

const profilePage: HTMLElement = document.createElement('div');
profilePage.classList.add('profile-page');

const header = document.createElement('h1');
header.classList.add('profile-page__header');
header.textContent = 'Profile';

// User data
export const userDataSection = document.createElement('div');
userDataSection.classList.add('profile-page__user-data');
export function createUserDataForm(): HTMLFormElement {
  const firstNameOptions: FormBlock = {
    type: 'text',
    placeholder: 'First name',
    name: 'firstName',
    text: 'First name:',
    required: true,
    pattern: /[A-Za-z]+/,
    title: 'At least one character, no special characters or numbers',
    display: 'inline',
  };

  const lastNameOptions: FormBlock = {
    type: 'text',
    placeholder: 'Last name',
    name: 'lastName',
    text: 'Last Name:',
    required: true,
    pattern: /[A-Za-z]+/,
    title: 'At least one character, no special characters or numbers',
    display: 'inline',
  };

  const emailOptions: FormBlock = {
    type: 'email',
    placeholder: 'E-mail',
    name: 'email',
    text: 'E-mail:',
    required: true,
    pattern: /.+@.+\..+/,
    title: 'Type valid e-mail (e.g., example@email.com)',
    display: 'inline',
  };

  const telOptions: FormBlock = {
    type: 'tel',
    placeholder: 'Phone (10-12 digits)',
    name: 'phone',
    text: 'Phone:',
    required: true,
    pattern: /^[0-9]{10,12}$/,
    title: '10 to 12 digits, no plus sign',
    display: 'inline',
  };

  const birthDateOptions: FormBlock = {
    type: 'date',
    name: 'dateOfBirth',
    text: 'Date of Birth:',
    required: true,
    max: `${checkAgeParams().bitrhExtr.getFullYear()}-${
      checkAgeParams().mExtr
    }-${checkAgeParams().dExtr}`,
    title: 'Only customers over 18 years old',
    placeholder: 'Date of Birth',
  };

  const blocksArr = [
    emailOptions,
    firstNameOptions,
    lastNameOptions,
    telOptions,
    birthDateOptions,
  ];

  const form = document.createElement('form');
  form.className = 'reg-page__form';

  blocksArr.forEach((opt) => {
    const block = createFormBlock(opt);
    form.append(block);
  });

  createButtonsFor(form);

  return form;
}

// Change password
const changePasswordButton = document.createElement('button');
changePasswordButton.classList.add('user-data__password-button');
changePasswordButton.textContent = 'Change Password';
export function createChangePasswordForm(): HTMLFormElement {
  const passwordOptions: FormBlock = {
    type: 'password',
    placeholder: 'Password',
    name: 'password',
    text: 'Current password:',
    required: true,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.* ).{8,}/,
    title:
      'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
    display: 'inline',
  };

  const newPasswordOptions: FormBlock = {
    type: 'password',
    placeholder: 'Password',
    name: 'newPassword',
    text: 'New password:',
    required: true,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.* ).{8,}/,
    title:
      'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
    display: 'inline',
  };

  const repeatPasswordOptions: FormBlock = {
    type: 'password',
    placeholder: 'Repeat password',
    name: 'checkPassword',
    text: 'Repeat password:',
    required: true,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.* ).{8,}/,
    title: 'Must match the password',
    display: 'inline',
  };

  const showPasswordOptions: FormBlock = {
    type: 'checkbox',
    name: `showPassword`,
    text: 'Show password:',
    required: false,
    placeholder: '',
  };

  const blocksArr = [
    passwordOptions,
    newPasswordOptions,
    repeatPasswordOptions,
    showPasswordOptions,
  ];

  const form = document.createElement('form');
  form.className = 'reg-page__form';

  blocksArr.forEach((opt) => {
    const block = createFormBlock(opt);
    form.append(block);
  });

  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'apply';
  submitBtn.type = 'submit';
  submitBtn.className = 'reg-page__button';

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'cancel';
  cancelBtn.className = 'reg-page__button';
  cancelBtn.addEventListener('click', (e: Event) => {
    (e.target as HTMLElement).parentElement?.remove();
    changePasswordButton.classList.remove('hidden');
  });

  form.append(submitBtn, cancelBtn);

  return form;
}

changePasswordButton.addEventListener('click', () => {
  userDataSection.append(createChangePasswordForm());
  changePasswordButton.classList.add('hidden');
});

userDataSection.append(changePasswordButton);

// Adress section
export const addressSection = document.createElement('div');
addressSection.classList.add('profile-page__address');

export const addressesSection = document.createElement('div');
addressesSection.classList.add('reg-page__form');
export function createAddressForm(): HTMLFormElement {
  const form = document.createElement('form');
  form.className = 'profile-page__user-data';

  const defaultShippingBlock = createFormBlock({
    type: 'checkbox',
    name: 'defaultShippingAddress',
    text: 'Address as default Shipping',
    required: false,
  });

  const defaultBillingBlock = createFormBlock({
    type: 'checkbox',
    name: 'defaultBillingAddress',
    text: 'Address as default Billing',
    required: false,
  });

  const streetOptions: FormBlock = {
    type: 'text',
    text: 'Street:',
    name: 'Street',
    required: true,
    pattern: /.+/,
    title: 'Must contain at least one character',
    display: 'inline',
  };

  const cityOptions: FormBlock = {
    type: 'text',
    text: 'City:',
    name: 'City',
    required: true,
    pattern: /[A-Za-z]+/,
    title:
      'Must contain at least one character and no special characters or numbers',
    display: 'inline',
  };

  const postCodeOptions: FormBlock = {
    type: 'text',
    text: 'Postal code:',
    name: 'PostCode',
    required: true,
    pattern: /[0-9]{5,7}/,
    title: 'Must contain from 5 to 7 digits',
    display: 'inline',
  };

  const city = createFormBlock(cityOptions);
  const street = createFormBlock(streetOptions);
  const postCode = createFormBlock(postCodeOptions);

  const countryBlock = document.createElement('div');
  countryBlock.classList.add('form__block');

  const countryContainer = document.createElement('div');
  countryContainer.classList.add('form__flex-container');

  const countryLabel = document.createElement('label');
  countryLabel.htmlFor = 'Country';
  countryLabel.textContent = 'Country:';
  countryLabel.classList.add('form__label');

  const countrySelection = document.createElement('select');
  countrySelection.name = 'Country';
  countrySelection.title = 'You should select a country to save this address';
  countrySelection.classList.add('form__input', 'selection__country');

  const countryMessage = document.createElement('p');
  countryMessage.classList.add('form__error');

  countryContainer.append(countryLabel, countrySelection);

  countryBlock.append(countryContainer, countryMessage);

  Object.keys(countries).forEach((el) => {
    const option = document.createElement('option');
    option.value = el;
    option.textContent = el;
    countrySelection.append(option);
  });

  form.append(
    countryBlock,
    city,
    street,
    postCode,
    defaultShippingBlock,
    defaultBillingBlock,
  );

  createButtonsFor(form);

  return form;
}

profilePage.append(
  resultMessage,
  header,
  createMenu(userDataSection, addressesSection),
);

export default profilePage;
