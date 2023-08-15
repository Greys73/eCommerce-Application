import loginForm from '../view/pages/login/login';
import { loginCustomer } from '../model/api/apiRoot';
import resultMessage from '../view/pages/login/resultMessage';

const input: HTMLInputElement = loginForm.querySelector(
  'input[name="password"]',
)!;
const chkBox: HTMLInputElement = loginForm.querySelector(
  'input[name="showPassword"]',
)!;

function changeType() {
  input.type = chkBox.checked ? 'text' : 'password';
}

async function submitHandler(e: Event) {
  e.preventDefault();
  const regForm = e.target as HTMLFormElement;
  const formData = new FormData(regForm);
  const mail = formData.get('email')?.toString() || '';
  const password = formData.get('password')?.toString() || '';
  const response = await loginCustomer(mail, password);
  if (response.statusCode === 200) {
    resultMessage.textContent = `Successfully login!`;
    setTimeout(() => {
      window.location.pathname = '/';
    }, 3000);
  } else {
    resultMessage.textContent = response.message;
  }
}

chkBox?.addEventListener('click', changeType);
loginForm.addEventListener('submit', submitHandler);
