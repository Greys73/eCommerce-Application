import countries from '../../../model/data/countries';
import { AddressType, FormBlock } from '../../../types/type';
import resultMessage from './resultMessage';

const createFormBlock = (options: FormBlock): HTMLDivElement => {
  const block = document.createElement('div');
  block.className = 'reg-form__block';
  const input = document.createElement('input');
  input.type = options.type;
  if (options.placeholder) input.placeholder = options.placeholder;
  input.name = options.name;
  input.required = options.required;
  if (options.pattern) input.pattern = options.pattern;
  if (options.max) input.max = options.max;
  if (options.title) input.title = options.title;

  const label = document.createElement('label');
  label.htmlFor = options.name;
  label.textContent = options.text;
  const errorMessage = document.createElement('p');
  block.append(label, input, errorMessage);
  return block;
};

const createAddressBlock = (addressType: AddressType): HTMLDivElement => {
  const block = document.createElement('div');
  block.className = 'reg-form__address';
  const heading = document.createElement('h4');
  heading.className = 'reg-form__subheading';
  heading.textContent = `Enter ${addressType} address`;

  const defaultAddressBlock = createFormBlock({
    type: 'checkbox',
    name: `default${addressType}Address`,
    text: 'Set this address as default',
    required: false,
  });
  const streetOptions: FormBlock = {
    type: 'text',
    text: 'Street',
    name: `${addressType}Street`,
    required: false,
    pattern: `.+`,
    title: 'Must contain at least one character',
  };
  const street = createFormBlock(streetOptions);
  const cityOptions: FormBlock = {
    type: 'text',
    text: 'City',
    name: `${addressType}City`,
    required: false,
    pattern: `[A-Za-z]+`,
    title:
      'Must contain at least one character and no special characters or numbers',
  };
  const city = createFormBlock(cityOptions);
  const postCodeOptions: FormBlock = {
    type: 'text',
    text: 'Postal code',
    name: `${addressType}PostCode`,
    required: false,
    pattern: '[0-9]{5,7}',
    title: 'Must contain from 5 to 7 digits',
  };
  const postCode = createFormBlock(postCodeOptions);

  const countryLabel = document.createElement('label');
  countryLabel.htmlFor = `${addressType}Country`;
  countryLabel.textContent = 'Select a country';

  const countrySelection = document.createElement('select');
  countrySelection.name = `${addressType}Country`;

  countries.forEach((el) => {
    const option = document.createElement('option');
    option.value = el;
    option.textContent = el;
    countrySelection.append(option);
  });
  block.append(
    heading,
    defaultAddressBlock,
    street,
    city,
    postCode,
    countryLabel,
    countrySelection,
  );
  return block;
};

function createRegistrationForm(): HTMLFormElement {
  const registrationForm = document.createElement('form');
  registrationForm.className = 'reg-form';

  const heading = document.createElement('h2');
  heading.textContent = 'Register';
  heading.className = 'reg-form__heading';

  const emailOptions: FormBlock = {
    type: 'email',
    placeholder: 'Enter e-mail',
    name: 'email',
    text: 'E-mail',
    required: true,
    pattern: '.+@.+',
    title: 'Type valid e-mail (e.g., example@email.com)',
  };

  const passwordOptions: FormBlock = {
    type: 'password',
    placeholder: 'Enter password',
    name: 'password',
    text: 'Password',
    required: true,
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}',
    title:
      'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
  };

  const repeatPasswordOptions: FormBlock = {
    type: 'password',
    placeholder: 'Repeat password',
    name: 'checkPassword',
    text: 'Repeat password',
    required: true,
    pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}',
    title: 'Must match the password',
  };

  const firstNameOptions: FormBlock = {
    type: 'text',
    placeholder: 'Enter first name',
    name: 'firstName',
    text: 'First name',
    required: true,
    pattern: '[A-Za-z]+',
    title: 'At least one character and no special characters or numbers',
  };
  const lastNameOptions: FormBlock = {
    type: 'text',
    placeholder: 'Enter last name',
    name: 'lastName',
    text: 'Last Name',
    required: true,
    pattern: '[A-Za-z]+',
    title: 'At least one character and no special characters or numbers',
  };
  const telOptions: FormBlock = {
    type: 'tel',
    placeholder: 'Enter phone number',
    name: 'tel',
    text: 'Phone',
    required: true,
    pattern: '[0-9]{10,12}',
    title: 'From 10 to 12 digits',
  };
  const currentDate = new Date().getTime();
  const MS_FOR_18_YEARS = (12 * 365 + 3) * 24 * 60 * 60 * 1000;
  const maxBirthDate = new Date(currentDate - MS_FOR_18_YEARS);
  const maxMonth = (maxBirthDate.getMonth() + 1).toString().padStart(2, '0');
  const maxDay = maxBirthDate.getDate().toString().padStart(2, '0');
  const birthDateOptions: FormBlock = {
    type: 'date',
    name: 'dateOfBirth',
    text: 'Date of Birth',
    required: true,
    max: `${maxBirthDate.getFullYear()}-${maxMonth}-${maxDay}`,
    title: 'Only customers over 12 years allowed',
  };
  const blocks = [
    emailOptions,
    passwordOptions,
    repeatPasswordOptions,
    firstNameOptions,
    lastNameOptions,
    telOptions,
    birthDateOptions,
  ];
  blocks.forEach((opt) => {
    const block = createFormBlock(opt);
    registrationForm.append(block);
  });

  const billingAddressBlock = createAddressBlock('billing');
  const shippingAddressBlock = createAddressBlock('shipping');

  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'Submit';
  submitBtn.type = 'submit';
  submitBtn.className = 'button reg-form__button';
  registrationForm.append(shippingAddressBlock, billingAddressBlock, submitBtn);
  registrationForm.prepend(heading);
  registrationForm.prepend(resultMessage);
  return registrationForm;
}

const registrationForm = createRegistrationForm();

export default registrationForm;
