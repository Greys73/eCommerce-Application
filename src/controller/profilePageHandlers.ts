import { Customer } from '@commercetools/platform-sdk';
import { getLoacalCustomer } from '../model/login';
import { getCustomerById } from '../model/api/apiRoot';

let customer: Customer;

async function getCustomerFromServer() {
  const response = await getCustomerById(customer.id);
  if (response.statusCode === 200) {
    console.log(response);
  } else {
    console.log(`ERROR`);
  }
}

function checkCustomer() {
  setTimeout(() => {
    customer = getLoacalCustomer();
    if ('id' in customer) getCustomerFromServer();
    else window.routeLocation = '/login';
  }, 50);
}

function pageLoaded() {
  const location = window.location.pathname;
  if (location === '/profile') {
    checkCustomer();
  }
}

window.addEventListener('DOMContentLoaded', pageLoaded);
