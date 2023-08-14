import { FormBlock } from '../../../types/type';
import createFormBlock from '../../../utils/view/createFormBlock';
import resultMessage from './resultMessage';

function createLoginForm(): HTMLFormElement {
  const loginForm = document.createElement('form');
  loginForm.className = 'login-form';

  const heading = document.createElement('h2');
  heading.textContent = 'Login';
  heading.className = 'login-form__heading';

  const emailOptions: FormBlock = {
    type: 'email',
    placeholder: 'Enter e-mail',
    name: 'email',
    text: 'E-mail',
    required: true,
    pattern: /.+@.+\..+/,
    title: 'Type valid e-mail (e.g., example@email.com)',
  };

  const passwordOptions: FormBlock = {
    type: 'password',
    placeholder: 'Enter password',
    name: 'password',
    text: 'Password',
    required: true,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.* ).{8,}/,
    title:
      'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number',
  };

  const showPassword = createFormBlock({
    type: 'checkbox',
    name: `showPassword`,
    text: 'Show password',
    required: false,
  });

  const blocks = [emailOptions, passwordOptions];
  blocks.forEach((opt) => {
    const block = createFormBlock(opt);
    loginForm.append(block);
  });

  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'Submit';
  submitBtn.type = 'submit';
  submitBtn.className = 'button login-form__button';
  loginForm.append(showPassword);
  loginForm.append(submitBtn);
  loginForm.prepend(heading);
  loginForm.prepend(resultMessage);
  return loginForm;
}

const loginForm = createLoginForm();

export default loginForm;
