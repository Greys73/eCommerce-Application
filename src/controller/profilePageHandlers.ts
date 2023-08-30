import { AddressDraft, CustomerDraft } from '@commercetools/platform-sdk';
import { getLoacalCustomer } from '../model/login';
import * as HTML from '../view/pages/profile/profile';
import { submitAddressData, submitUserData } from '../model/profile';
import { inputValidationErrorHandler } from './errorHanlders';
import { getCountryName } from '../model/data/countries';
import { AddressVariant, FormElements } from '../types/type';

const hideData = () => HTML.default.classList.add('hidden');
const showData = () => HTML.default.classList.remove('hidden');

const submitUser = async (e: Event) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const user: CustomerDraft = {
    email: `${formData.get('email')}`,
    password: `${formData.get('password')}`,
    customerNumber: `${formData.get('tel')}`,
    firstName: `${formData.get('firstName')}`,
    lastName: `${formData.get('lastName')}`,
    dateOfBirth: `${formData.get('dateOfBirth')}`,
  };
  submitUserData(user);
};

const submitAddress = async (e: Event) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const formData = form.elements as FormElements;
  const address: AddressDraft = {
    id: form.id,
    country: formData.Country.value,
    city: formData.City.value,
    streetName: formData.Street.value,
    postalCode: formData.PostCode.value,
  };
  // const addressIndex = customer.addresses.findIndex((el: AddressDraft) => el.id === form.id);
  const type: AddressVariant = {
    billing: formData.addressType.selectedIndex === 1,
    shipping: formData.addressType.selectedIndex === 2,
    defbilling: formData.defaultBillingAddress.checked,
    defShipping: formData.defaultShippingAddress.checked,
  };
  submitAddressData(address, type);
};

function getAddressType(id: string): number {
  const customer = getLoacalCustomer();
  console.log(customer);
  let type = 0;
  if (customer.billingAddressIds.findIndex((el: string) => el === id) >= 0)
    type = 1;
  if (customer.shippingAddressIds.findIndex((el: string) => el === id) >= 0)
    type = 2;
  return type;
}

function createNewAddress() {
  const newForm = HTML.createAddressForm();
  newForm.getElementsByTagName('button')[1].dispatchEvent(new Event('click'));
  newForm.addEventListener('submit', submitAddress);
  HTML.createAddressBtn.after(newForm);
}

function fillForms() {
  Array.from(document.forms).forEach((form) => {
    form.remove();
  });

  const customer = getLoacalCustomer();

  const userDataForm = HTML.createUserDataForm();
  const user = userDataForm.elements as FormElements;

  user.email.value = customer.email;
  user.firstName.value = customer.firstName;
  user.lastName.value = customer.lastName;
  user.phone.value = customer.customerNumber;
  user.dateOfBirth.value = customer.dateOfBirth;

  HTML.userDataSection.prepend(userDataForm);
  userDataForm.addEventListener('submit', submitUser);

  Array.from(customer.addresses).forEach((val, id) => {
    const addressForm = HTML.createAddressForm();
    const address = addressForm.elements as FormElements;
    addressForm.id = customer.addresses[id].id;
    address.addressType.selectedIndex = getAddressType(
      customer.addresses[id].id,
    );
    address.defaultShippingAddress.checked =
      customer.defaultShippingAddressId === customer.addresses[id].id;
    address.defaultBillingAddress.checked =
      customer.defaultBillingAddressId === customer.addresses[id].id;
    address.Country.value = getCountryName(customer.addresses[id].country);
    address.City.value = customer.addresses[id].city || '';
    address.Street.value = customer.addresses[id].streetName || '';
    address.PostCode.value = customer.addresses[id].postalCode || '';

    HTML.addressesSection.append(addressForm);

    addressForm.addEventListener('submit', submitAddress);
  });

  HTML.createAddressBtn.addEventListener('click', createNewAddress);

  const profileInputs = [...HTML.default.querySelectorAll('input')];
  profileInputs.forEach((input) => {
    input.addEventListener('input', inputValidationErrorHandler);
  });
}

function pageLoaded() {
  const location = window.location.pathname;
  if (location === '/profile') {
    setTimeout(async () => {
      const customer = getLoacalCustomer();
      if ('id' in customer) {
        hideData();
        showData();
        fillForms();
      } else window.routeLocation = '/login';
    }, 50);
  }
}

window.addEventListener('DOMContentLoaded', pageLoaded);
