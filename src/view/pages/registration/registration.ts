import countries from '../../../model/data/countries';
import { AddressType, FormBlock } from '../../../types/type';
import createFormBlock from '../../../utils/view/createFormBlock';
import bothDefaultAddressBlock from './defaultCheckbox';
import resultMessage from './resultMessage';

const createAddressBlock = (addressType: AddressType): HTMLDivElement => {
  const block = document.createElement('div');
  block.className = `reg-form__address ${addressType}`;

  // const addressHeader = document.createElement('h4');
  // addressHeader.className = 'reg-form__subheader';
  // addressHeader.textContent = `Address Section`;

  const defaultAddressBlock = createFormBlock({
    type: 'checkbox',
    name: `default${addressType}Address`,
    text: `Set this address as default ${addressType}`,
    required: false,
  });

  const streetOptions: FormBlock = {
    type: 'text',
    text: 'Address:',
    name: `${addressType}Street`,
    required: true,
    pattern: /.+/,
    title: 'Must contain at least one character',
  };

  const cityOptions: FormBlock = {
    type: 'text',
    text: 'City:',
    name: `${addressType}City`,
    required: true,
    pattern: /[A-Za-z]+/,
    title:
      'Must contain at least one character and no special characters or numbers',
  };

  const postCodeOptions: FormBlock = {
    type: 'text',
    text: 'Postal code:',
    name: `${addressType}PostCode`,
    required: true,
    pattern: /[0-9]{5,7}/,
    title: 'Must contain from 5 to 7 digits',
  };

  const city = createFormBlock(cityOptions);
  const street = createFormBlock(streetOptions);
  const postCode = createFormBlock(postCodeOptions);

  const countryBlock = document.createElement('div');
  countryBlock.classList.add('form__block');

  const countryContainer = document.createElement('div');
  countryContainer.classList.add('form__flex-container');

  const countryLabel = document.createElement('label');
  countryLabel.htmlFor = `${addressType}Country`;
  countryLabel.textContent = 'Country:';
  countryLabel.classList.add('form__label');

  const countrySelection = document.createElement('select');
  countrySelection.name = `${addressType}Country`;
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

  block.append(countryBlock, city, street, postCode, defaultAddressBlock);

  if (addressType === 'shipping') {
    block.append(bothDefaultAddressBlock);
  }

  return block;
};

const createAddressButton = (): HTMLButtonElement => {
  const button = document.createElement('button');
  button.textContent = 'Add another address';
  button.className = 'reg-page__adress-button';

  return button;
};

export const billingAddressBlock = createAddressBlock('billing');
export const shippingAddressBlock = createAddressBlock('shipping');
export const addressButton = createAddressButton();

const checkAgeParams = () => {
  const currentDate = new Date().getTime();

  // const msInSec = 1000;
  // const secInMin = 60;
  // const minInHour = 60;
  // const hoursInDay = 24;
  // const monthInYear = 12; // correct?
  // const daysInYear = 365; // correct?
  // const smth = 3; //

  const MS_FOR_18_YEARS = (12 * 365 + 3) * 24 * 60 * 60 * 1000;
  const maxBirthDate = new Date(currentDate - MS_FOR_18_YEARS);
  const maxMonth = (maxBirthDate.getMonth() + 1).toString().padStart(2, '0');
  const maxDay = maxBirthDate.getDate().toString().padStart(2, '0');

  const resultObj = {
    bitrhExtr: maxBirthDate,
    mExtr: maxMonth,
    dExtr: maxDay,
  };

  return resultObj;
};

function createRegistrationForm(): HTMLFormElement {
  const emailOptions: FormBlock = {
    type: 'email',
    placeholder: 'Enter e-mail',
    name: 'email',
    text: 'E-mail:',
    required: true,
    pattern: /.+@.+\..+/,
    title: 'Type valid e-mail (e.g., example@email.com)',
  };

  const passwordOptions: FormBlock = {
    type: 'password',
    placeholder: 'Enter password',
    name: 'password',
    text: 'Password:',
    required: true,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.* ).{8,}/,
    title:
      'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
  };

  const showPasswordOptions: FormBlock = {
    type: 'checkbox',
    name: `showPassword`,
    text: 'Show password:',
    required: false,
  };

  const repeatPasswordOptions: FormBlock = {
    type: 'password',
    placeholder: 'Repeat password',
    name: 'checkPassword',
    text: 'Repeat password:',
    required: true,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.* ).{8,}/,
    title: 'Must match the password',
  };

  const firstNameOptions: FormBlock = {
    type: 'text',
    placeholder: 'Enter first name',
    name: 'firstName',
    text: 'First name:',
    required: true,
    pattern: /[A-Za-z]+/,
    title: 'At least one character and no special characters or numbers',
  };

  const lastNameOptions: FormBlock = {
    type: 'text',
    placeholder: 'Enter last name',
    name: 'lastName',
    text: 'Last Name:',
    required: true,
    pattern: /[A-Za-z]+/,
    title: 'At least one character and no special characters or numbers',
  };

  const telOptions: FormBlock = {
    type: 'tel',
    placeholder: 'Enter phone number',
    name: 'tel',
    text: 'Phone number:',
    required: true,
    pattern: /^[0-9]{10,12}$/,
    title: 'From 10 to 12 digits',
  };

  const birthDateOptions: FormBlock = {
    type: 'date',
    name: 'dateOfBirth',
    text: 'Date of Birth:',
    required: true,
    max: `${checkAgeParams().bitrhExtr.getFullYear()}-${
      checkAgeParams().mExtr
    }-${checkAgeParams().dExtr}`,
    title: 'Only customers over 12 years allowed',
  };

  const blocksArr = [
    emailOptions,
    passwordOptions,
    repeatPasswordOptions,
    firstNameOptions,
    lastNameOptions,
    telOptions,
    birthDateOptions,
  ];

  const regForm = document.createElement('form');
  regForm.className = 'reg-page__form';

  blocksArr.forEach((opt) => {
    const block = createFormBlock(opt);
    if (opt.type === 'password') {
      const showPassword = createFormBlock(showPasswordOptions);
      block.append(showPassword);
    }
    regForm.append(block);
  });

  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'Create MotoDream account!';
  submitBtn.type = 'submit';
  submitBtn.className = 'reg-page__button';

  regForm.append(shippingAddressBlock, addressButton, submitBtn);
  regForm.prepend(resultMessage);

  return regForm;
}

const createLoginLinkBlock = (): HTMLParagraphElement => {
  const redirectText = document.createElement('p');
  redirectText.className = 'reg-page__redirect';
  redirectText.textContent = 'Already have an account? ';

  const redirectLink = document.createElement('a');
  redirectLink.classList.add('reg-page__redirect-link');
  redirectLink.href = '/login';
  redirectLink.textContent = 'Log in to MotoDream';
  redirectText.append(redirectLink);
  return redirectText;
};

const registrationPage = document.createElement('div');
registrationPage.classList.add('reg-page');

const header = document.createElement('h2');
header.textContent = 'Create your MotoDream account';
header.className = 'reg-page__header';

const redirectionBlock = createLoginLinkBlock();

const form = createRegistrationForm();

registrationPage.append(header, redirectionBlock, form);

export default registrationPage;
