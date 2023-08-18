import { FormBlock } from '../../../types/type';
import createFormBlock from '../../../utils/view/createFormBlock';
import resultMessage from './resultMessage';

const header = document.createElement('h2');
header.textContent = 'Log in your MotoDream account';
header.className = 'login-page__header';

function createLoginForm(): HTMLFormElement {
  const loginForm = document.createElement('form');
  loginForm.className = 'login-page__form';

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

  const blocks = [emailOptions, passwordOptions];
  blocks.forEach((opt) => {
    const block = createFormBlock(opt);
    if (opt.type === 'password') {
      const showPassword = createFormBlock({
        type: 'checkbox',
        name: `showPassword`,
        text: 'Show password',
        required: false,
      });

      block.append(showPassword);
    }
    loginForm.append(block);
  });

  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'Log in';
  submitBtn.type = 'submit';
  submitBtn.className = 'login-form__button';

  loginForm.append(submitBtn);
  loginForm.prepend(resultMessage);

  return loginForm;
}

const loginPage = document.createElement('div');
loginPage.classList.add('login-page');

const form = createLoginForm();

const redirectText = document.createElement('p');
redirectText.innerHTML =
  'Don\'t have an account? <a class="redirect__link" href="/registration">Sign up</a> now!';
redirectText.className = 'login-page__redirect';

loginPage.append(header, form, redirectText);

export default loginPage;
