import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import { createUserAPIRoot } from './createApiRootUser';

export const createCart = async (): Promise<ClientResponse<Cart>> => {
  const response = await createUserAPIRoot()
    .me()
    .carts()
    .post({
      body: {
        currency: 'EUR',
      },
    })
    .execute()
   
  updateHeaderCart(response.body);
  return response;
};

export const getActiveCart = async () => {
  const response = await createUserAPIRoot().me().activeCart().get().execute();

  updateHeaderCart(response.body);
  return response;
};

export const addToCart = async (ID: string, version: number, sku: string) => {
  const response = await createUserAPIRoot()
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
  
  updateHeaderCart(response.body);
  return response;
};

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

export const removeFromCart = async (
  ID: string,
  version: number,
  lineItemId: string,
) => {
  const response = await createUserAPIRoot()
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

  updateHeaderCart(response.body);
  return response;
};
