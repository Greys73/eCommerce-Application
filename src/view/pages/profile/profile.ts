import { FormBlock } from '../../../types/type';
import checkAgeParams from '../../../utils/checkAgeParams';
import createFormBlock from '../../../utils/view/createFormBlock';
import { createProfileBlock } from '../../../utils/view/createProfileBlock';
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

  const regForm = document.createElement('form');
  regForm.className = 'reg-page__form';

  blocksArr.forEach((opt) => {
    const block = createFormBlock(opt);
    /* if (opt.type === 'password') {
      const showPassword = createFormBlock(showPasswordOptions);
      block.append(showPassword);
    } */
    regForm.append(block);
  });

  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'edit';
  submitBtn.type = 'submit';
  submitBtn.className = 'reg-page__button';

  regForm.append(submitBtn);
  regForm.prepend(resultMessage);

  return regForm;
}

// Addresses

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
  editButton,
  confirmButton,
  changePasswordButton,
  passwordBlock,
);

// Adress section

export const addressSection = document.createElement('div');
addressSection.classList.add('profile-page__address');

profilePage.append(
  header,
  createMenu(userDataSection, addressSection),
  resultMessage,
);

// eventListners

/* editButton.addEventListener('click', () => {
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
}); */

export default profilePage;
