import {
  Cart,
  ClientResponse,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { anonCartClient } from '../../lib/getAnonimousClient';
import { getLoacalCustomer } from '../login';
import { passOptions } from '../../lib/ConstructClient';
import { httpMiddlewareOptions } from '../../lib/BuildClient';

const createUserAPIRoot = () => {
  const customer = getLoacalCustomer();
  const isCustomerLogged = Object.keys(customer).length;
  let apiRootUser;
  if (isCustomerLogged) {
    console.log('apiRoot LOGGED');
    const { email } = customer;
    const password = localStorage.getItem(email) || '';
    console.log('from API', email, password);
    const options = passOptions(email, password);
    const client = new ClientBuilder()
      .withPasswordFlow(options)
      .withHttpMiddleware(httpMiddlewareOptions)
      .build();
    apiRootUser = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: 'ddt-e-commerce-rss-app',
    });
  } else {
    console.log('apiRoot ANONYMOUS');
    apiRootUser = createApiBuilderFromCtpClient(anonCartClient).withProjectKey({
      projectKey: 'ddt-e-commerce-rss-app',
    });
  }
  return apiRootUser;
};
export const createCart = (): Promise<ClientResponse<Cart>> =>
  createUserAPIRoot()
    .me()
    .carts()
    .post({
      body: {
        currency: 'EUR',
      },
    })
    .execute();

export const getActiveCart = () =>
  createUserAPIRoot().me().activeCart().get().execute();

export const addToCart = (ID: string, version: number, sku: string) =>
  createUserAPIRoot()
    .me()
    .carts()
    .withId({ ID })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'addLineItem',
            sku,
            variantId: 1,
            quantity: 1,
          },
        ],
      },
    })
    .execute();

export const queryCarts = () =>
  createUserAPIRoot().me().carts().get().execute();

export const loginCustomerPass = (userEmail: string, userPassword: string) => {
  localStorage.setItem(userEmail, userPassword);
  return createUserAPIRoot()
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
};

export const removeFromCart = (
  ID: string,
  version: number,
  lineItemId: string,
) =>
  createUserAPIRoot()
    .me()
    .carts()
    .withId({ ID })
    .post({
      body: {
        version,
        actions: [
          {
            action: 'removeLineItem',
            lineItemId,
          },
        ],
      },
    })
    .execute();
