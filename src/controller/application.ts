import { getCustomerById } from '../model/api/apiRoot';
import { getLoacalCustomer, setLoacalCustomer } from '../model/login';
import { PromiseResponse } from '../types/type';
import resultMessage from '../view/components/resultMessage';

export async function showResultMessage(
  response: PromiseResponse,
  msg: string,
) {
  resultMessage.classList.remove('hidden');
  if (response.statusCode === 200) {
    window.dispatchEvent(new Event('PageContentLoaded'));
    resultMessage.firstChild!.textContent = msg;
  } else {
    resultMessage.firstChild!.textContent = response.message;
  }
  setTimeout(() => {
    resultMessage.firstChild!.textContent = '';
    resultMessage.classList.add('hidden');
  }, 3000);
  return response;
}

async function updateCustomer() {
  setTimeout(async () => {
    let customer = getLoacalCustomer();
    if ('id' in customer) {
      const response = await getCustomerById(customer.id);
      if (response.statusCode === 200) {
        customer = response.body;
        setLoacalCustomer(customer);
      } else {
        console.log('server error or User is undefined');
      }
    }
    // else window.routeLocation = '/login';
  }, 50);
}

function contentLoaded() {
  updateCustomer();
}
window.addEventListener('PageContentLoaded', contentLoaded);
