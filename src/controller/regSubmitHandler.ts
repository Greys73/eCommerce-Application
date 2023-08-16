import { createCustomer, loginCustomer } from '../model/api/apiRoot';
import countries from '../model/data/countries';
import { Address, CustomerDraft } from '../types/API-interfaces';
import registrationForm from '../view/pages/registration/registration';
import resultMessage from '../view/pages/registration/resultMessage';

const getRegFormData = (e: Event): CustomerDraft => {
  const regForm = e.target as HTMLFormElement;
  const formData = new FormData(regForm);

  const country = `${formData.get('shippingCountry')}`;

  const shippingAddress: Address = {
    country: countries[country as keyof typeof countries],
    city: `${formData.get('shippingCity')}`,
    streetName: `${formData.get('shippingStreet')}`,
    postalCode: `${formData.get('shippingPostCode')}`,
    firstName: `${formData.get('firstName')}`,
    lastName: `${formData.get('lastName')}`,
    phone: `${formData.get('tel')}`,
  };
  const billingAddress: Address = {
    country: countries[country as keyof typeof countries],
    city: `${formData.get('billingCity')}`,
    streetName: `${formData.get('billingStreet')}`,
    postalCode: `${formData.get('billingPostCode')}`,
    firstName: `${formData.get('firstName')}`,
    lastName: `${formData.get('lastName')}`,
    phone: `${formData.get('tel')}`,
  };

  const newCustomer: CustomerDraft = {
    email: `${formData.get('email')}`,
    password: `${formData.get('password')}`,
    customerNumber: `${formData.get('tel')}`,
    firstName: `${formData.get('firstName')}`,
    lastName: `${formData.get('lastName')}`,
    dateOfBirth: `${formData.get('dateOfBirth')}`,
    addresses: [shippingAddress, billingAddress],
  };
  return newCustomer;
};

const submitHandler = async (e: Event) => {
  e.preventDefault();
  const newCustomer = getRegFormData(e);
  try {
    const response = await createCustomer(newCustomer);
    if (response.statusCode === 201) {
      resultMessage.textContent = `Successfully registered`;

      const logResponse = await loginCustomer(
        newCustomer.email,
        newCustomer.password,
      );
      if (logResponse.statusCode === 200) {
        window.location.pathname = '/';
        resultMessage.textContent = 'Logged in';
      } else {
        resultMessage.textContent += 'Error with login';
      }
    } else {
      resultMessage.textContent = response.message;
    }
  } catch {
    resultMessage.textContent = 'Something went wrong. Try again.';
  }
};

registrationForm.addEventListener('submit', submitHandler);
