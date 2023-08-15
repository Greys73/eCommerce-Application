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

const validationErrorHandler = (e: Event) => {
  const input = e.target as HTMLInputElement;
  if (input.pattern) {
    const regex = new RegExp(input.pattern);
    let isValid = regex.test(input.value);
    if (input.name === 'checkPassword') {
      isValid = checkPassword(input);
    }
    const errorMessage = input.nextElementSibling;
    if (isValid) {
      input.style.borderColor = 'green';
      input.classList.remove('invalid');
      input.classList.add('valid');
      if (errorMessage) errorMessage.textContent = '';
    } else {
      input.style.borderColor = 'red';
      input.classList.remove('valid');
      input.classList.add('invalid');
      if (errorMessage)
        errorMessage.textContent =
          getSpecifyError(input.name, input.value) || input.title;
    }
  }
};

regInputs.forEach((input) => {
  input.addEventListener('change', validationErrorHandler);
});

loginInputs.forEach((input) => {
  input.addEventListener('change', validationErrorHandler);
});
