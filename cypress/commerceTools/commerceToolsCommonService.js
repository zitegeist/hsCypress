import Commercetools from './commerceToolsClient.js';
import { NotFoundError, CommercetoolsError, ConcurrencyError } from './commerceToolsErrors.js';

const config = {
  commerceToolsProjectKey: Cypress.env('COMMERCETOOLS_PROJECT_KEY'),
  commerceToolsClientId: Cypress.env('COMMERCETOOLS_CLIENT_ID'),
  commerceToolsClientSecret: Cypress.env('COMMERCETOOLS_CLIENT_SECRET'),
  commerceToolsHost: Cypress.env('COMMERCETOOLS_HOST'),
  commerceToolsOAuthUrl: Cypress.env('COMMERCETOOLS_OAUTH_URL'),
  commerceToolsScopes: [Cypress.env('COMMERCETOOLS_SCOPES')],
};

const MAX_PER_PAGE = 500;
const errorHandler = error => {
  if (error.code === 404) {
    throw new NotFoundError();
  }
  if (error.code === 409) {
    throw new ConcurrencyError();
  }
  throw new CommercetoolsError(error);
};
const sleep = duration =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
const CommonsService = ({ entity, isCacheable = false, maxAttemptsOnUpdate = 3, timeOutBetweenAttempts = 500 }) => {
  const commonsService = {};
  let entitiesByKey = {};
  let entitiesById = {};

  const { client, getEntityRequestBuilder } = Commercetools({
    clientId: config.commerceToolsClientId,
    clientSecret: config.commerceToolsClientSecret,
    projectKey: config.commerceToolsProjectKey,
    host: config.commerceToolsHost,
    oauthHost: config.commerceToolsOAuthUrl,
    scopes: config.commerceToolsScopes,
  });

  const storeInCache = result => {
    if (result && isCacheable) {
      const { id, key } = result;
      if (key) {
        entitiesByKey[key] = result;
      }
      if (id) {
        entitiesById[id] = result;
      }
    }
  };
  commonsService.byId = async (id, expand = []) => {
    const existingEntity = entitiesById[id];
    if (existingEntity) {
      return existingEntity;
    }
    const result = await client
      .execute({
        uri: getEntityRequestBuilder(entity)
          .parse({ id, expand })
          .build(),
        method: 'GET',
      })
      .then(res => res.body)
      .catch(errorHandler);
    if (isCacheable) {
      storeInCache(result);
    }
    return result;
  };
  commonsService.byKey = async key => {
    const existingEntity = entitiesByKey[key];
    if (existingEntity) {
      return existingEntity;
    }
    const result = await client
      .execute({
        uri: getEntityRequestBuilder(entity)
          .where(`key="${key}"`)
          .build(),
        method: 'GET',
      })
      .then(res => res.body.results[0])
      .catch(errorHandler);
    if (isCacheable) {
      storeInCache(result);
    }
    return result;
  };
  const updateEntity = async ({ id, version, actions, attempts = 0 }) => {
    try {
      const result = await client
        .execute({
          uri: getEntityRequestBuilder(entity)
            .parse({ id })
            .build(),
          method: 'POST',
          body: { version, actions },
        })
        .then(res => res.body)
        .catch(errorHandler);
      storeInCache(result);
      return result;
    } catch (error) {
      if (error instanceof ConcurrencyError && attempts < maxAttemptsOnUpdate - 1) {
        const newAttempts = attempts + 1;
        const { currentVersion } = error;
        await sleep(timeOutBetweenAttempts * newAttempts);
        return updateEntity({ id, version: currentVersion, actions, attempts: newAttempts });
      }
      throw error;
    }
  };
  commonsService.update = async ({ id, version, actions }) => {
    if (version) {
      return updateEntity({ id, version, actions });
    }
    const { version: existingVersion } = await commonsService.byId(id);
    return updateEntity({ id, version: existingVersion, actions });
  };
  commonsService.save = async payload => {
    const result = await client
      .execute({
        uri: getEntityRequestBuilder(entity).build(),
        method: 'POST',
        body: payload,
      })
      .then(res => res.body)
      .catch(errorHandler);
    storeInCache(result);
    return result;
  };
  commonsService.find = async ({ where, page, perPage, sortBy, sortAscending, expand }) => {
    let requestBuilder = getEntityRequestBuilder(entity);
    requestBuilder = where ? requestBuilder.where(where) : requestBuilder;
    requestBuilder = sortBy ? requestBuilder.sort(sortBy, sortAscending) : requestBuilder;
    requestBuilder = page ? requestBuilder.page(page) : requestBuilder;
    requestBuilder = perPage ? requestBuilder.perPage(perPage) : requestBuilder;
    requestBuilder = expand ? requestBuilder.expand(expand) : requestBuilder;
    return client
      .execute({
        uri: requestBuilder.build(),
        method: 'GET',
      })
      .then(res => ({ results: res.body.results, total: res.body.total }));
  };
  commonsService.getAll = async ({ where, sortBy, sortAscending, expand }) => {
    let results = [];
    const perPage = MAX_PER_PAGE;
    let page = 1;
    let response;
    do {
      response = await commonsService.find({ where, page, perPage, sortBy, sortAscending, expand });
      results = results.concat(response.results);
      page += 1;
    } while (results.length !== response.total);
    return results;
  };
  commonsService.delete = async ({ id, version }) => {
    let entityVersion = version;
    if (!version) {
      const { version: oldVersion } = await commonsService.byId({ id });
      entityVersion = oldVersion;
    }
    return client
      .execute({
        uri: getEntityRequestBuilder(entity)
          .parse({ id, version: entityVersion })
          .build(),
        method: 'DELETE',
      })
      .then(res => res.body);
  };
  commonsService.clearCache = () => {
    entitiesByKey = {};
    entitiesById = {};
  };
  return commonsService;
};
export default CommonsService;
