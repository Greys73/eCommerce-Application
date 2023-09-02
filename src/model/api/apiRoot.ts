import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from '../../lib/BuildClient';
import { vrfClient } from '../../lib/ConstructClient';
import { CustomerDraft } from '../../types/API-interfaces';

//        !!! Current version (need local storage getters/setters)
const customerId = undefined; // get LocalStorage func;

// Create apiRoot from the imported ClientBuilder and include your Project key
const client = customerId ? vrfClient : ctpClient;
const apiRoot = createApiBuilderFromCtpClient(client).withProjectKey({
  projectKey: 'ddt-e-commerce-rss-app',
});

export const getCustomerById = (id: string) => {
  try {
    if (!id) return false;
    return apiRoot
      .customers()
      .withId({ ID: id })
      .get()
      .execute()
      .then((obj) => obj)
      .catch((err) => err);
  } catch {
    return false;
  }
};

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

export const getProductsBySearchField = (searchValue: string) =>
  apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        'text.en': searchValue,
      },
    })
    .execute()
    .then((obj) => obj.body.results)
    .catch((err) => err);

export const getProductByID = (productID: string) =>
  apiRoot
    .products()
    .withId({ ID: productID })
    .get()
    .execute()
    .then((obj) => obj)
    .catch((err) => err);

export const getProductByKey = (productKey: string) =>
  apiRoot
    .products()
    .withKey({ key: productKey })
    .get()
    .execute()
    .then((obj) => obj)
    .catch((err) => err);

export const getProductBySKU = (SKU: string) =>
  apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: [`variants.sku:"${SKU}"`],
      },
    })
    .execute()
    .then((obj) => obj)
    .catch((err) => err);

export const sortByParam = (param: string, order: string, limit: number) =>
  apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        sort: [`${param} ${order}`],
        limit,
      },
    })
    .execute()
    .then((obj) => obj)
    .catch((err) => err);

export const filterByParams = (filterOptions: string[]) =>
  apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        filter: filterOptions,
      },
    })
    .execute()
    .then((obj) => obj)
    .catch((err) => err);

export const getAllProducts = () =>
  apiRoot
    .productProjections()
    .search()
    .get()
    .execute()
    .then((obj) => obj)
    .catch((err) => err);
