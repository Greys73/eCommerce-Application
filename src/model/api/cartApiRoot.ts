import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import { createUserAPIRoot } from './createApiRootUser';

export const createCart = (): Promise<ClientResponse<Cart>> =>
  createUserAPIRoot()
    .me()
    .carts()
    .post({
      body: {
        currency: 'EUR',
      },
    })
    .execute()
    .then((obj) => obj)
    .catch((err) => err);

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
    .execute()
    .then((obj) => obj)
    .catch((err) => err);

export const queryCarts = () =>
  createUserAPIRoot()
    .me()
    .carts()
    .get()
    .execute()
    .then((obj) => obj)
    .catch((err) => err);

export const loginCustomerPass = (userEmail: string, userPassword: string) =>
  createUserAPIRoot(userEmail, userPassword)
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
