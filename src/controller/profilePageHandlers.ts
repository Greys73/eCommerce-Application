// import { lastName, birthDate } from './../view/pages/profile/profile';
// import { CustomerDraft } from '@commercetools/platform-sdk';
// import { Address } from '../types/API-interfaces';
import { getLoacalCustomer } from '../model/login';
import * as HTML from '../view/pages/profile/profile';
// import { submitUserData } from '../model/profile';
// import { createAddressContainer } from '../view/pages/profile/profile';

const hideData = () => HTML.default.classList.add('hidden');
const showData = () => HTML.default.classList.remove('hidden');

const submitUser = async (e: Event) => {
  e.preventDefault();
  console.log(e);
  /* const user: CustomerDraft = {
    firstName: view.user.firstName.input.value,
    lastName: view.user.lastName.input.value,
    dateOfBirth: view.user.birthDate.input.value,
    email: getLoacalCustomer().email,
  };
  submitUserData(user); */
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
}

function fillForm() {
  const customer = getLoacalCustomer();
  const form = HTML.createUserDataForm();
  const elements = form.elements as FormElements;

  elements.email.value = customer.email;
  elements.firstName.value = customer.firstName;
  elements.lastName.value = customer.lastName;
  elements.phone.value = customer.customerNumber;
  elements.dateOfBirth.value = customer.dateOfBirth;

  HTML.userDataSection.innerHTML = '';
  HTML.userDataSection.append(form);
  form.addEventListener('submit', submitUser);

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
  form.addEventListener('click', submitAddress);
}

function pageLoaded() {
  const location = window.location.pathname;
  if (location === '/profile') {
    setTimeout(async () => {
      const customer = getLoacalCustomer();
      if ('id' in customer) {
        hideData();
        showData();
        fillForm();
      } else window.routeLocation = '/login';
    }, 50);
  }
}

window.addEventListener('DOMContentLoaded', pageLoaded);
