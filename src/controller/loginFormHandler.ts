import loginForm from '../view/pages/login/login';

const input: HTMLInputElement = loginForm.querySelector(
  'input[name="password"]',
)!;
const chkBox: HTMLInputElement = loginForm.querySelector(
  'input[name="showPassword"]',
)!;

function changeType() {
  input.type = chkBox.checked ? 'text' : 'password';
}
chkBox?.addEventListener('click', changeType);
