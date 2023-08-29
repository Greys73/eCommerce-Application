// import { lastName, birthDate } from './../view/pages/profile/profile';
import { CustomerDraft } from '@commercetools/platform-sdk';
// import { Address } from '../types/API-interfaces';
import { getLoacalCustomer } from '../model/login';
import * as HTML from '../view/pages/profile/profile';
import { submitUserData } from '../model/profile';
import { inputValidationErrorHandler } from './errorHanlders';
import { getCountryName } from '../model/data/countries';
// import { createAddressContainer } from '../view/pages/profile/profile';

const hideData = () => HTML.default.classList.add('hidden');
const showData = () => HTML.default.classList.remove('hidden');

const submitUser = async (e: Event) => {
  e.preventDefault();
  const regForm = e.target as HTMLFormElement;
  const formData = new FormData(regForm);
  const user: CustomerDraft = {
    email: `${formData.get('email')}`,
    password: `${formData.get('password')}`,
    customerNumber: `${formData.get('tel')}`,
    firstName: `${formData.get('firstName')}`,
    lastName: `${formData.get('lastName')}`,
    dateOfBirth: `${formData.get('dateOfBirth')}`,
    addresses: [],
  };
  submitUserData(user);
};

const submitAddress = async (e: Event) => {
  e.preventDefault();
  console.log(e);
  /* const parent: HTMLElement = (e.currentTarget as HTMLElement).parentElement!;
  const address = view.adresses.find((el) => el.id === parent.id);
  console.log(address)
  const data: Address = {
    id: address?.id,
    firstName: view.user.firstName.input.value,
    lastName: view.user.lastName.input.value,
    phone: getLoacalCustomer().customerNumber,
    email: getLoacalCustomer().email,
    country: address?.country.input.value || '',
    city: address?.city.input.value || '',
    streetName: address?.adress.input.value || '',
    postalCode: address?.postalcode.input.value || '',
  };
  console.log(data); */
};

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  firstName: HTMLInputElement;
  lastName: HTMLInputElement;
  phone: HTMLInputElement;
  dateOfBirth: HTMLInputElement;

  defaultShippingAddress: HTMLInputElement;
  defaultBillingAddress: HTMLInputElement;
  Street: HTMLInputElement;
  City: HTMLInputElement;
  PostCode: HTMLInputElement;
  Country: HTMLInputElement;
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
    // element.defaultShippingAddress.value = customer.
    // element.defaultBillingAddress.value = customer.
    address.Country.value = getCountryName(customer.addresses[id].country);
    address.City.value = customer.addresses[id].city || '';
    address.Street.value = customer.addresses[id].streetName || '';
    address.PostCode.value = customer.addresses[id].postalCode || '';
    HTML.addressesSection.prepend(addressForm);
    addressForm.addEventListener('submit', submitAddress);
  });

  /* customer.addresses.forEach((val, id) => {
    const address = view.adresses[id];
    address.country.label.textContent = customer.addresses[id].country || '';
    address.country.input.value = customer.addresses[id].country || '';

    address.city.label.textContent = customer.addresses[id].city || '';
    address.city.input.value = customer.addresses[id].city || '';

    address.adress.label.textContent = customer.addresses[id].streetName || '';
    address.adress.input.value = customer.addresses[id].streetName || '';

    address.postalcode.label.textContent =
      customer.addresses[id].postalCode || '';
    address.postalcode.input.value = customer.addresses[id].postalCode || '';

    // address.btnDefShip.addEventListener('click', submitUser);
    // address.btnDefBill.addEventListener('click', submitUser);
  }); */

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
