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
    clientId: 'jXCk5T3Iq7MthDDBz6mXxnOI',
    clientSecret: 'x75YTPwT0WPn3ZS6Ythl5f3uUPF50Cdl',
    user: {
      username: obj.username,
      password: obj.password,
    },
  },
  scopes: [
    'manage_project:ddt-e-commerce-rss-app view_audit_log:ddt-e-commerce-rss-app manage_api_clients:ddt-e-commerce-rss-app',
  ],
  fetch,
};

// Export verified ClientBuilder
export const vrfClient = new ClientBuilder()
  .withPasswordFlow(passwordAuthMiddlewareOptions)
  .build();
