import { createRequestBuilder } from '@commercetools/api-request-builder';
import { createClient } from '@commercetools/sdk-client';
import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth';
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http';
import { createQueueMiddleware } from '@commercetools/sdk-middleware-queue';
const requestBuilder = createRequestBuilder({ projectKey: Cypress.env('COMMERCETOOLS_PROJECT_KEY') });
const client = createClient({
  middlewares: [
    createAuthMiddlewareForClientCredentialsFlow({
      host: Cypress.env('commerceToolsOAuthUrl'),
      projectKey: Cypress.env('COMMERCETOOLS_PROJECT_KEY'),
      credentials: {
        clientId: Cypress.env('COMMERCETOOLS_CLIENT_ID'),
        clientSecret: Cypress.env('COMMERCETOOLS_CLIENT_SECRET'),
      },
      scopes: ['manage_project:highsnobiety-staging'],
      fetch,
    }),
    createQueueMiddleware(),
    createHttpMiddleware({ host: Cypress.env('COMMERCETOOLS_HOST'), fetch }),
  ],
});

export default async email => {
  const customerResponse = await client.execute({
    method: 'GET',
    uri: requestBuilder.customers
      .perPage(1)
      .where(`email = "${email}"`)
      .build(),
  });
  const customer = customerResponse.body.results[0];
  const tokenResponse = await client.execute({
    method: 'POST',
    uri: `/${Cypress.env('COMMERCETOOLS_PROJECT_KEY')}/customers/email-token`,
    body: {
      id: customer.id,
      ttlMinutes: 60,
    },
  });
  const token = tokenResponse.body.value;

  await client.execute({
    method: 'POST',
    uri: `/${Cypress.env('COMMERCETOOLS_PROJECT_KEY')}/customers/email/confirm`,
    body: {
      tokenValue: token,
    },
  });
};
