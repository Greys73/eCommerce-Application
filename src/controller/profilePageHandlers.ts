import { CustomerDraft } from '@commercetools/platform-sdk';
import { Address } from '../types/API-interfaces';
import { getLoacalCustomer } from '../model/login';
import * as HTML from '../view/pages/user/user';
import { submitUserData } from '../model/profile';
import { createAddressContainer } from '../view/pages/user/user';

type HTMLBlock = {
  id?: string;
  input: HTMLInputElement;
  label: HTMLElement;
};
type HTMLBlockAdress = {
  id: string;
  country: HTMLBlock;
  city: HTMLBlock;
  adress: HTMLBlock;
  postalcode: HTMLBlock;
  btnSubmit: HTMLButtonElement;
  btnDefShip: HTMLButtonElement;
  btnDefBill: HTMLButtonElement;
};

const view = {
  user: {
    firstName: {} as HTMLBlock,
    lastName: {} as HTMLBlock,
    phoneNumber: {} as HTMLBlock,
    birthDate: {} as HTMLBlock,
    btnSubmit: {} as HTMLButtonElement,
    btnUpdPswrd: {} as HTMLButtonElement,
  },
  adresses: [] as HTMLBlockAdress[],
};

function queryHTMLElements() {
  Object.assign(view.user.firstName, {
    input: HTML.name.querySelector('input'),
    label: HTML.name.querySelector('[class$="__value"]'),
  });

  Object.assign(view.user.lastName, {
    input: HTML.lastName.querySelector('input'),
    label: HTML.lastName.querySelector('[class$="__value"]'),
  });

  Object.assign(view.user.phoneNumber, {
    input: HTML.phone.querySelector('input'),
    label: HTML.phone.querySelector('[class$="__value"]'),
  });

  Object.assign(view.user.birthDate, {
    input: HTML.birthDate.querySelector('input'),
    label: HTML.birthDate.querySelector('[class$="__value"]'),
  });

  view.user.btnSubmit = HTML.default.querySelector('button[class*="confirm"]')!;
  view.user.btnUpdPswrd = HTML.default.querySelector(
    'button[class*="password__request"]',
  )!;

  // Add addresses:
  view.adresses = [];
  const customer = getLoacalCustomer();
  customer.addresses.forEach((address: Address) => {
    const HTMLAddress: HTMLElement =
      document.getElementById(address.id!) ||
      createAddressContainer(address.id!);

    view.adresses.push({
      id: address.id!,
      country: {
        input: HTMLAddress.querySelector('[name="country"] input')!,
        label: HTMLAddress.querySelector(
          '[name="country"] [class$="__value"]',
        )!,
      },
      city: {
        input: HTMLAddress.querySelector('[name="city"] input')!,
        label: HTMLAddress.querySelector('[name="city"] [class$="__value"]')!,
      },
      adress: {
        input: HTMLAddress.querySelector('[name="address"] input')!,
        label: HTMLAddress.querySelector(
          '[name="address"] [class$="__value"]',
        )!,
      },
      postalcode: {
        input: HTMLAddress.querySelector('[name="postal-code"] input')!,
        label: HTMLAddress.querySelector(
          '[name="postal-code"] [class$="__value"]',
        )!,
      },
      btnSubmit: HTMLAddress.querySelector('button[class*="confirm"]')!,
      btnDefShip: HTMLAddress.querySelector(
        'button[name="defaultBillingButton"]',
      )!,
      btnDefBill: HTMLAddress.querySelector(
        'button[name="defaultShippingButton"]',
      )!,
    });
    HTML.default.append(HTMLAddress);
  });
}

const hideData = () => HTML.default.classList.add('hidden');
const showData = () => HTML.default.classList.remove('hidden');
const submitUser = () => {
  const user: CustomerDraft = {
    firstName: view.user.firstName.input.value,
    lastName: view.user.lastName.input.value,
    dateOfBirth: view.user.birthDate.input.value,
    email: getLoacalCustomer().email,
  };
  submitUserData(user);
};

const submitAddress = (e: Event) => {
  const parent: HTMLElement = (e.currentTarget as HTMLElement).parentElement!;
  const address = view.adresses.find((el) => el.id === parent.id);
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
  console.log(data);
};

function fillForm() {
  queryHTMLElements();
  const customer = getLoacalCustomer();
  view.user.firstName.label.textContent = customer.firstName || '';
  view.user.firstName.input.value = customer.firstName || '';

  view.user.lastName.label.textContent = customer.lastName || '';
  view.user.lastName.input.value = customer.lastName || '';

  view.user.phoneNumber.label.textContent = customer.customerNumber || '';

  view.user.birthDate.label.textContent = customer.dateOfBirth || '';
  view.user.birthDate.input.value = customer.dateOfBirth || '';

  view.user.btnSubmit.addEventListener('click', submitUser);

  view.adresses.forEach((val, id) => {
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

    address.btnSubmit.addEventListener('click', submitAddress);
    // address.btnDefShip.addEventListener('click', submitUser);
    // address.btnDefBill.addEventListener('click', submitUser);
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
        fillForm();
      } else window.routeLocation = '/login';
    }, 50);
  }
}

window.addEventListener('DOMContentLoaded', pageLoaded);
