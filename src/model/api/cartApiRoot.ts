import {
  Cart,
  ClientResponse,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { anonCartClient } from '../../lib/getAnonimousClient';

const apiRootAnonimous = createApiBuilderFromCtpClient(
  anonCartClient,
).withProjectKey({
  projectKey: 'ddt-e-commerce-rss-app',
});

export const createAnonCart = (): Promise<ClientResponse<Cart>> =>
  apiRootAnonimous
    .me()
    .carts()
    .post({
      body: {
        currency: 'EUR',
      },
    })
    .execute();

export const getAnonCart = () =>
  apiRootAnonimous.me().activeCart().get().execute();
