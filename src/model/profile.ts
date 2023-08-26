import {
  CustomerDraft,
  CustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { getLoacalCustomer, setLoacalCustomer } from './login';
import { updateCustomerData } from './api/apiRoot';
import resultMessage from '../view/pages/user/resultMessage';

export async function submitUserData(user: CustomerDraft) {
  const customer = getLoacalCustomer();
  const data: CustomerUpdateAction[] = [];
  data.push({
    action: 'setFirstName',
    firstName: user.firstName,
  });
  data.push({
    action: 'setLastName',
    lastName: user.lastName,
  });
  data.push({
    action: 'setDateOfBirth',
    dateOfBirth: user.dateOfBirth,
  });
  data.push({
    action: 'changeEmail',
    email: user.email || '',
  });
  const response = await updateCustomerData(customer, data);

  resultMessage.classList.remove('hidden');
  if (response.statusCode === 200) {
    setLoacalCustomer(response.body);
    window.dispatchEvent(new Event('DOMContentLoaded'));
    resultMessage.firstChild!.textContent = `Your details have been updated!`;
  } else {
    resultMessage.firstChild!.textContent = response.message;
  }
  setTimeout(() => {
    resultMessage.firstChild!.textContent = '';
    resultMessage.classList.add('hidden');
  }, 3000);
}
