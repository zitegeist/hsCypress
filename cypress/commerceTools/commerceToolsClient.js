import { createClient } from '@commercetools/sdk-client';
import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth';
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http';
import { createQueueMiddleware } from '@commercetools/sdk-middleware-queue';
import { createRequestBuilder } from '@commercetools/api-request-builder';
import fetch from 'node-fetch';

export const buildScopes = ({ scopes = [], projectKey }) => scopes.map(scope => `${scope}:${projectKey}`);

export default ({ clientId, clientSecret, projectKey, host, oauthHost, scopes }) => {
  const commercetools = {};
  commercetools.client = createClient({
    middlewares: [
      createAuthMiddlewareForClientCredentialsFlow({
        host: oauthHost,
        projectKey,
        credentials: {
          clientId,
          clientSecret,
        },
        scopes: buildScopes({ scopes, projectKey }),
        fetch,
      }),
      createQueueMiddleware(),
      createHttpMiddleware({ host, fetch }),
    ],
  });
  commercetools.getEntityRequestBuilder = entityType => createRequestBuilder({ projectKey })[entityType];
  return commercetools;
};
