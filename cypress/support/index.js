// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
require('cypress-plugin-retries');
require('cypress-dark');

// Import commands.js using ES2015 syntax:
import './commands';

beforeEach(() => {
  cy.setCookie('ec_country_new', 'DE');
  cy.setCookie('hs_survey', 'true');
});

// returning false here prevents Cypress from failing the test
// eslint-disable-next-line lodash/prefer-constant
Cypress.on('uncaught:exception', (_err, _runnable) => {
  return false;
});
