import {
  ClientBuilder,
  type PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

// import clientObj from ...;

// example
const obj = {
  username: 'testView@test.test',
  password: 'testView111',
};

// Configure const passwordAuthMiddlewareOptions
const passwordAuthMiddlewareOptions: PasswordAuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey: 'ddt-e-commerce-rss-app',
  credentials: {
    clientId: 'zN9fyYyVDuGaBxpvbSn4pu3A',
    clientSecret: '9poBQh8UGBOLpVTxXmcAq3pgMOur7nFM',
    user: {
      username: obj.username,
      password: obj.password,
    },
  },
  scopes: ['manage_project:ddt-e-commerce-rss-app'],
  fetch,
};

// Export verified ClientBuilder
export const vrfClient = new ClientBuilder()
  .withPasswordFlow(passwordAuthMiddlewareOptions)
  .build();
