import registrationForm from '../view/pages/registration/registration';

const checkPassword = (input: HTMLInputElement): boolean => {
  const secondPassword = input.value;
  const firstPasswordInput = input.parentElement?.previousElementSibling
    ?.children[1] as HTMLInputElement;
  const firstPassword = firstPasswordInput.value;
  return secondPassword === firstPassword;
};

export default function addErrorHandlers() {
  const inputs = [...registrationForm.querySelectorAll('input')];

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
        if (errorMessage) errorMessage.textContent = input.title;
      }
    }
  };

  inputs.forEach((input) => {
    input.addEventListener('change', validationErrorHandler);
  });
}
