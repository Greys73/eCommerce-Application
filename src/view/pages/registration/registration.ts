import { FormBlock } from '../../../types/type';
import checkAgeParams from '../../../utils/checkAgeParams';
import createAddressBlock from '../../../utils/view/createAddressBlock';
import createFormBlock from '../../../utils/view/createFormBlock';

const createAddressButton = (): HTMLButtonElement => {
  const button = document.createElement('button');
  button.textContent = 'Add second address';
  button.className = 'reg-page__adress-button';
  return button;
};

export const billingAddressBlock = createAddressBlock('billing');
export const shippingAddressBlock = createAddressBlock('shipping');
export const addressButton = createAddressButton();

function createRegistrationForm(): HTMLFormElement {
  const emailOptions: FormBlock = {
    type: 'email',
    placeholder: 'E-mail',
    name: 'email',
    text: 'E-mail:',
    required: true,
    pattern: /.+@.+\..+/,
    title: 'Type valid e-mail (e.g., example@email.com)',
  };

  const passwordOptions: FormBlock = {
    type: 'password',
    placeholder: 'Password',
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
    placeholder: '',
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
    placeholder: 'First name',
    name: 'firstName',
    text: 'First name:',
    required: true,
    pattern: /[A-Za-z]+/,
    title: 'At least one character, no special characters or numbers',
  };

  const lastNameOptions: FormBlock = {
    type: 'text',
    placeholder: 'Last name',
    name: 'lastName',
    text: 'Last Name:',
    required: true,
    pattern: /[A-Za-z]+/,
    title: 'At least one character, no special characters or numbers',
  };

  const telOptions: FormBlock = {
    type: 'tel',
    placeholder: 'Phone number (10-12 digits)',
    name: 'tel',
    text: 'Phone number:',
    required: true,
    pattern: /^[0-9]{10,12}$/,
    title: '10 to 12 digits, no plus sign',
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
