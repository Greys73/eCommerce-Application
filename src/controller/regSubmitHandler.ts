import { createCustomer } from '../model/api/apiRoot';
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
  const response = await createCustomer(newCustomer);
  console.log(response);
  if (response.statusCode === 201) {
    resultMessage.textContent = `Successfully registered`;
    // redirect to main page
    // setTimeout(() => {window.location.href = '/'}, 3000 )
  } else {
    resultMessage.textContent = response.message;
    // show error massage "try again"
  }
};

registrationForm.addEventListener('submit', submitHandler);
