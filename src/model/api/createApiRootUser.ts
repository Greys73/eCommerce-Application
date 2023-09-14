import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';
import { httpMiddlewareOptions } from '../../lib/BuildClient';
import { passOptions } from '../../lib/ConstructClient';
import { anonCartClient } from '../../lib/getAnonimousClient';
import { getLoacalCustomer } from '../login';

const apiRoots: Map<string, ByProjectKeyRequestBuilder> = new Map();

export const createUserAPIRoot = (
  mail?: string,
  pass?: string,
): ByProjectKeyRequestBuilder => {
  // create clientBuilder with pass flow for this user and add it to cache
  if (mail && pass) {
    const options = passOptions(mail, pass);
    const client = new ClientBuilder()
      .withPasswordFlow(options)
      .withHttpMiddleware(httpMiddlewareOptions)
      .build();
    const apiRootUser = createApiBuilderFromCtpClient(client).withProjectKey({
      projectKey: 'ddt-e-commerce-rss-app',
    });
    apiRoots.set(mail, apiRootUser);
  }
  // return builder from cache for logged customer
  const customer = getLoacalCustomer();
  const isCustomerLogged = Object.keys(customer).length;
  if (isCustomerLogged) {
    const { email } = customer;
    return apiRoots.get(email) as ByProjectKeyRequestBuilder;
  }

  // return anonymous builder from cache
  if (apiRoots.has('anon')) {
    return apiRoots.get('anon') as ByProjectKeyRequestBuilder;
  }

  // create anonymous builder
  const apiRootUserAnonym = createApiBuilderFromCtpClient(
    anonCartClient,
  ).withProjectKey({
    projectKey: 'ddt-e-commerce-rss-app',
  });
  apiRoots.set('anon', apiRootUserAnonym);
  return apiRootUserAnonym;
};
