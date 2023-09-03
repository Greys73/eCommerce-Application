import { getCustomerById } from '../model/api/apiRoot';
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
    // else window.routeLocation = '/login';
  }, 50);
}

function contentLoaded() {
  updateCustomer();
}
window.addEventListener('PageContentLoaded', contentLoaded);
