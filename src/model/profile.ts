import {
  AddressDraft,
  CustomerDraft,
  CustomerUpdateAction,
} from '@commercetools/platform-sdk';
import { getLoacalCustomer, setLoacalCustomer } from './login';
import { updateCustomerData } from './api/apiRoot';
import resultMessage from '../view/pages/profile/resultMessage';
import countries from './data/countries';
import { AddressVariant } from '../types/type';

async function update(data: CustomerUpdateAction[]) {
  const customer = getLoacalCustomer();
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
  return response;
}

export async function submitUserData(user: CustomerDraft) {
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

  update(data);
}

export async function submitAddressData(
  address: AddressDraft,
  type: AddressVariant,
) {
  const customer = getLoacalCustomer();
  const lsAddress = customer.addresses.find(
    (el: AddressDraft) => el.id === address.id,
  );
  const data: CustomerUpdateAction[] = [];
  if (lsAddress) {
    lsAddress.country = countries[address.country as keyof typeof countries];
    lsAddress.city = address.city;
    lsAddress.streetName = address.streetName;
    lsAddress.postalCode = address.postalCode;
    data.push({
      action: 'changeAddress',
      addressId: address.id,
      address: lsAddress,
    });

    if (type.billing)
      data.push({ action: 'addBillingAddressId', addressId: address.id });
    if (type.shipping)
      data.push({ action: 'addShippingAddressId', addressId: address.id });
    if (type.defbilling)
      data.push({ action: 'setDefaultBillingAddress', addressId: address.id });
    if (type.defShipping)
      data.push({ action: 'setDefaultShippingAddress', addressId: address.id });
  } else {
    data.push({
      action: 'addAddress',
      address: {
        country: countries[address.country as keyof typeof countries],
        city: address.city,
        streetName: address.streetName,
        postalCode: address.postalCode,
      },
    });
  }
  update(data);
}
