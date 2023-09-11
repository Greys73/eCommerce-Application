import {
  Cart,
  ClientResponse,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { anonCartClient } from '../../lib/getAnonimousClient';

export const createAnonCart = (): Promise<ClientResponse<Cart>> => {
  const apiRootAnonimous = createApiBuilderFromCtpClient(
    anonCartClient,
  ).withProjectKey({
    projectKey: 'ddt-e-commerce-rss-app',
  });
  return apiRootAnonimous
    .me()
    .carts()
    .post({
      body: {
        currency: 'EUR',
      },
    })
    .execute();
};
