import loginForm from '../view/pages/login/login';
import { loginCustomer } from '../model/api/apiRoot';
import resultMessage from '../view/components/resultMessage';
import { getLoacalCustomer, setLoacalCustomer } from '../model/login';

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

  resultMessage.classList.remove('hidden');
  if (response.statusCode === 200) {
    setLoacalCustomer(response.body.customer);
    resultMessage.firstChild!.textContent = `Welcome to MotoDream, ${response.body.customer.firstName}!`;
    setTimeout(() => {
      window.routeLocation = '/';
    }, 3000);
  } else {
    resultMessage.firstChild!.textContent = response.message;
  }
  setTimeout(() => {
    resultMessage.firstChild!.textContent = '';
    resultMessage.classList.add('hidden');
  }, 3000);
}

function checkCustomer() {
  const location = window.location.pathname;
  if (location === '/login') {
    setTimeout(() => {
      const customer = getLoacalCustomer();
      if ('id' in customer) window.routeLocation = '/';
    }, 50);
  }
}

chkBox?.addEventListener('click', changeType);
loginForm.addEventListener('submit', submitHandler);
window.addEventListener('DOMContentLoaded', checkCustomer);

export { changeType, submitHandler, checkCustomer };
