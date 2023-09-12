import { getCart, getCustomerById } from '../model/api/apiRoot';
import { getLocalCart } from '../model/cartStorage';
import { getLoacalCustomer, setLoacalCustomer } from '../model/login';

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
  }, 50);
}

function contentLoaded() {
  updateCustomer();
  getCart();

  setTimeout(() => {
    console.log(getLocalCart());
  }, 2000);
}
window.addEventListener('PageContentLoaded', contentLoaded);
