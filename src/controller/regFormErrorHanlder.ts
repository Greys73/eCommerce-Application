import registrationForm from '../view/pages/registration/registration';
import loginForm from '../view/pages/login/login';
import getSpecifyError from '../model/inputErrorSpecifier';

const checkPassword = (input: HTMLInputElement): boolean => {
  const secondPassword = input.value;
  const firstPasswordInput = input.parentElement?.previousElementSibling
    ?.previousElementSibling?.children[1] as HTMLInputElement;
  const firstPassword = firstPasswordInput.value;
  return secondPassword === firstPassword;
};

const regInputs = [...registrationForm.querySelectorAll('input')];
const loginInputs = [...loginForm.querySelectorAll('input')];
const regSelects = [...registrationForm.querySelectorAll('select')];

const changeStyle = (
  elem: HTMLInputElement | HTMLSelectElement,
  isValid: boolean,
) => {
  const errorMessage = elem.nextElementSibling;
  const el = elem;
  if (isValid) {
    el.style.borderColor = 'green';
    el.classList.remove('invalid');
    el.classList.add('valid');
    if (errorMessage) errorMessage.textContent = '';
  } else {
    el.style.borderColor = 'red';
    el.classList.remove('valid');
    el.classList.add('invalid');
    if (errorMessage)
      errorMessage.textContent = getSpecifyError(el.name, el.value) || el.title;
  }
};

export const inputValidationErrorHandler = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.pattern) {
    const regex = new RegExp(input.pattern);
    let isValid = regex.test(input.value);
    if (input.name === 'checkPassword') {
      isValid = checkPassword(input);
    }
    changeStyle(input, isValid);
  }
};

const selectValidationHandler = (e: Event) => {
  const countrySelect = e.target as HTMLSelectElement;
  const isValid = countrySelect.disabled === false && !!countrySelect.value;
  changeStyle(countrySelect, isValid);
};

regInputs.forEach((input) => {
  input.addEventListener('change', inputValidationErrorHandler);
});

loginInputs.forEach((input) => {
  input.addEventListener('change', inputValidationErrorHandler);
});

regSelects.forEach((select) => {
  select.addEventListener('change', selectValidationHandler);
});
