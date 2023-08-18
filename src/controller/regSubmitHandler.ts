import { createCustomer, loginCustomer } from '../model/api/apiRoot';
import countries from '../model/data/countries';
import { Address, CustomerDraft } from '../types/API-interfaces';
import registrationForm from '../view/pages/registration/registration';
import resultMessage from '../view/pages/registration/resultMessage';

const getRegFormData = (e: Event): CustomerDraft => {
  const regForm = e.target as HTMLFormElement;
  const formData = new FormData(regForm);

  const newCustomer: CustomerDraft = {
    email: `${formData.get('email')}`,
    password: `${formData.get('password')}`,
    customerNumber: `${formData.get('tel')}`,
    firstName: `${formData.get('firstName')}`,
    lastName: `${formData.get('lastName')}`,
    dateOfBirth: `${formData.get('dateOfBirth')}`,
    addresses: [],
  };

  const shippingCountry = `${formData.get('shippingCountry')}`;
  const shipAsDefault = `${formData.get('defaultshippingAddress')}` === 'on';
  const bothShipAsDefault = `${formData.get('bothDefaultAddress')}` === 'on';

  const shippingAddress = {
    country: countries[shippingCountry as keyof typeof countries],
    city: `${formData.get('shippingCity')}`,
    streetName: `${formData.get('shippingStreet')}`,
    postalCode: `${formData.get('shippingPostCode')}`,
    firstName: `${formData.get('firstName')}`,
    lastName: `${formData.get('lastName')}`,
    phone: `${formData.get('tel')}`,
  };
  newCustomer.addresses.push(shippingAddress);
  if (shipAsDefault) {
    newCustomer.defaultShippingAddress = 0;
  }
  if (bothShipAsDefault) {
    newCustomer.defaultBillingAddress = 0;
    newCustomer.defaultShippingAddress = 0;
  }

  const billingCountry = `${formData.get('billingCountry')}`;
  const billAsDefault = `${formData.get('defaultbillingAddress')}` === 'on';
  let billingAddress: Address;
  if (billingCountry && billingCountry !== 'null' && !bothShipAsDefault) {
    billingAddress = {
      country: countries[billingCountry as keyof typeof countries],
      city: `${formData.get('billingCity')}`,
      streetName: `${formData.get('billingStreet')}`,
      postalCode: `${formData.get('billingPostCode')}`,
      firstName: `${formData.get('firstName')}`,
      lastName: `${formData.get('lastName')}`,
      phone: `${formData.get('tel')}`,
    };
    newCustomer.addresses?.push(billingAddress);
    if (billAsDefault && shippingCountry) {
      newCustomer.defaultBillingAddress = 1;
    }
    if (billAsDefault && !shippingCountry) {
      newCustomer.defaultBillingAddress = 0;
    }
  }
  return newCustomer;
};

const submitHandler = async (e: Event) => {
  e.preventDefault();
  const newCustomer = getRegFormData(e);
  try {
    const regResponse = await createCustomer(newCustomer);
    const regMessage = regResponse.message;
    if (regResponse.statusCode === 201) {
      resultMessage.textContent = `Successfully registered`;

      const logResponse = await loginCustomer(
        newCustomer.email,
        newCustomer.password,
      );
      if (logResponse.statusCode === 200) {
        // setLoacalCustomer(logResponse.body.customer); - раскомментить перед коммитом
        resultMessage.textContent = 'Logged in';
        setTimeout(() => {
          window.location.pathname = '/';
        }, 0);
      } else {
        resultMessage.textContent += 'Error with login';
      }
    } else if (`${regResponse.statusCode}`.startsWith('4')) {
      if (regMessage.includes(newCustomer.customerNumber)) {
        resultMessage.textContent =
          'There is already an existing customer with provided phone number.';
      } else {
        resultMessage.textContent = regMessage;
      }
    } else if (`${regResponse.statusCode}`.startsWith('5')) {
      resultMessage.textContent = `Server error. Try again later.`;
    }
  } catch {
    resultMessage.textContent = 'Something went wrong. Try again later.';
  }
};

registrationForm.addEventListener('submit', submitHandler);
