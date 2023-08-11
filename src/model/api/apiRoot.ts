import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from '../../lib/BuildClient';
import { CustomerDraft } from '../../types/API-interfaces';

// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: 'ddt-e-commerce-rss-app',
});

export const viewCustomers = () =>
  apiRoot
    .customers()
    .get({
      headers: { 'Content-Type': 'application/json' },
    })
    .execute()
    .then((obj) => obj)
    .catch((err) => err);

export const createCustomer = (createCustomerRequest: CustomerDraft) =>
  apiRoot
    .customers()
    .post({
      body: createCustomerRequest,
      headers: { 'Content-Type': 'application/json' },
    })
    .execute()
    .then((arg) => arg)
    .catch((err) => err);

export const loginCustomer = (userEmail: string, userPassword: string) =>
  apiRoot
    .me()
    .login()
    .post({
      body: {
        email: userEmail,
        password: userPassword,
        activeCartSignInMode: 'MergeWithExistingCustomerCart',
        updateProductData: true,
      },
    })
    .execute()
    .then((obj) => obj)
    .catch((err) => err);
