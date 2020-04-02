/* eslint-disable jest/valid-expect */

import Chance from 'chance';
import { defaults } from 'lodash/fp';
import '@percy/cypress';
import 'cypress-pipe';
import CustomerService from '../commerceTools/commerceToolsCustomerService.js';
import ProductService from '../commerceTools/commerceToolsProductService.js';
import ProductProjectionsService from '../commerceTools/commerceToolsProductProjectionsService.js';
import standardProduct from '../commerceTools/productMocks/standardProduct.js';

const customerService = CustomerService();
const productService = ProductService();
const productProjectionsService = ProductProjectionsService();

Cypress.Commands.add('getCustomerByEmail', async email => {
  const customerResults = await customerService.find({ where: `email="${email}"` });
  if (customerResults.total > 0) {
    return customerResults.results[0];
  }
  return null;
});

Cypress.Commands.add('getProductProjection', async sku => {
  const productResponse = await productProjectionsService.find({
    where: `masterVariant(sku = "${sku}") or variants(sku = "${sku}")`,
  });
  if (productResponse.total > 0) {
    console.log(productResponse.results[0]);
    return productResponse.results[0];
  }
  return null;
});

Cypress.Commands.add('createStandardProduct', async id => {
  try {
    const creationResponse = await productService.save(standardProduct(id));
    console.log(creationResponse);
    if (creationResponse.total > 0) {
      console.log(creationResponse.results[0]);
      return creationResponse.results[0];
    }
    return null;
  } catch (error) {
    console.log(error);
  }
});

Cypress.Commands.add('deleteProduct', async id => {
  // 'find' product and get its productKey for deletion
  const productResponse = await productProjectionsService.find({
    where: `masterVariant(sku = "${id}") or variants(sku = "${id}")`,
  });
  const key = productResponse.results[0].id;
  console.log(key);

  // 'update' product to unpublish
  try {
    console.log({ id: `${key}`, version: 1, actions: ['unpublish'] });
    productService.update({ id: `${key}`, version: 1, actions: [{ action: 'unpublish' }] });
  } catch (error) {
    console.log(error);
  }
  // deletion of product
  try {
    const deletionResponse = await productService.delete(standardProduct(key));
    console.log(deletionResponse);

    if (deletionResponse.total > 0) {
      console.log(deletionResponse.results[0]);
      return deletionResponse.results[0];
    }
    return null;
  } catch (error) {
    console.log(error);
  }
});

Cypress.Commands.add('login', () => {
  cy.get('[name="email"]').type(Cypress.env('testEmail'));
  cy.get('[name="password"]').type(Cypress.env('testPassword'));
  cy.get('button')
    .contains('Log in')
    .click();
});

Cypress.Commands.add('addToCart', () => {
  Cypress.env('RETRIES', 2);
  cy.authVisit('/shop/product/MSMOODJA01/');
  cy.get('[class*="header"]').invoke('attr', 'style', 'display: none');
  cy.get('[name="dropdown"]').select('EU  35');
  cy.get('[name="dropdown"]')
    .find(':selected')
    .contains('EU 35');
  cy.get('.addToCart').should('not.be.disabled');
  cy.get('.addToCart')
    .first()
    .click();
  cy.get('[class*="header"]').invoke('attr', 'style', 'display: block');
  cy.contains('checkout').should('be.visible');
  cy.get('[href="/shop/cart/"]').should('contain', 2);
  cy.get('[href="/shop/cart/"]').click();
});

Cypress.Commands.add('authorize3DSecure', (confirm = true) => {
  // eslint-disable-next-line cypress/no-unnecessary-waiting
  cy.wait(5000);
  cy.get('iframe[name^=__privateStripeFrame]').then(firstIFrame => {
    cy.wrap(firstIFrame.contents().find('iframe#challengeFrame')).then(secondIFrame => {
      // authorise
      const target = confirm ? '#test-source-authorize-3ds' : '#test-source-fail-3ds';
      cy.wrap(secondIFrame.contents().find(target)).click();
    });
  });
});

Cypress.Commands.add('fillInCreditCardDetails', cardDetails => {
  const chance = new Chance();
  const defaultCardDetails = {
    name: chance.name(),
    cardNumber: undefined,
    expDate: '0150',
    cvc: '999',
  };
  const cd = defaults(defaultCardDetails, cardDetails);

  cy.get('input[name="cardHolder"]').type(cd.name);

  cy.get('iframe[name^="__privateStripeFrame"]')
    .should('have.length', 3)
    .then(iframe => {
      const body = iframe.contents().find('body');
      cy.wrap(body[0])
        .find('[name="cardnumber"]')
        .type(cd.cardNumber);
      cy.wrap(body[1])
        .find('input[name="exp-date"]')
        .type(cd.expDate);
      cy.wrap(body[2])
        .find('input[name="cvc"]')
        .type(cd.cvc);
    });
});

Cypress.Commands.add('iframeElement', selector => {
  cy.log(selector)
    .get(`body > iframe`, { log: false })
    .should(iframe => expect(iframe.contents().find(selector)).to.exist)
    .then(iframe => cy.wrap(iframe.contents().find(selector), { log: false }));
});

Cypress.Commands.add('fillInAddressForm', ({ formName, address, country }) => {
  const chance = new Chance();
  const defaultAddress = {
    firstName: chance.first(),
    lastName: chance.last(),
    country: 'Germany',
    streetName: chance.address(),
    streetNumber: chance.integer(),
    additionalAddressInfo: chance.address(),
    city: 'Berlin',
    postalCode: '14050',
    phone: chance.phone(),
  };
  const addressToFill = defaults(defaultAddress, address);

  cy.get(`[name="${formName}.firstName"]`).type(addressToFill.firstName);
  cy.get(`[name="${formName}.lastName"]`).type(addressToFill.lastName);
  if (!country) {
    cy.get(`[name="${formName}.country"]`).select(country);
    cy.get('[class*="changeCountryButtons"]').click();
  }
  cy.get(`[name="${formName}.streetName"]`).type(addressToFill.streetName);
  cy.get(`[name="${formName}.streetNumber"]`).type(addressToFill.streetNumber, { force: true });
  cy.get(`[name="${formName}.additionalAddressInfo"]`).type(addressToFill.additionalAddressInfo, { force: true });
  cy.get(`[name="${formName}.city"]`).type(addressToFill.city);
  cy.get(`[name="${formName}.postalCode"]`).type(addressToFill.postalCode);
  cy.get(`[name="${formName}.phone"]`).type(addressToFill.phone);
});

Cypress.Commands.add('addToCartStub', (locale, country, sku) => {
  Cypress.env('RETRIES', 2);
  cy.request({
    method: 'POST',
    url: Cypress.env('apiUrl'),
    body: {
      query: `mutation addLineItem($locale: Locale, $country: Country!, $sku: String!) {
        addLineItem(country: $country, action: { sku: $sku }) {
          id
          lineItems {
            name(locale: $locale)
          }
        }
      }`,
      variables: JSON.stringify({ locale, country, sku }),
    },
    failOnStatusCode: false,
  }).then(res => {
    cy.log(res);
  });
});

Cypress.Commands.add('loginStub', draft => {
  cy.request({
    method: 'POST',
    url: Cypress.env('apiUrl'),
    body: {
      query: `mutation customerSignIn ($draft: CustomerSignInDraft!) {
        customerSignIn(draft: $draft) {
          customer {id}
        }
      }`,
      variables: JSON.stringify({ draft }),
    },
    failOnStatusCode: false,
  }).then(res => {
    cy.log(res);
  });
});

Cypress.Commands.add('selectNth', { prevSubject: 'element' }, (subject, pos) => {
  cy.wrap(subject)
    .children('option')
    .eq(pos)
    .then(e => {
      cy.wrap(subject).select(e.val());
    });
});

Cypress.Commands.add('authVisit', url => {
  cy.visit(url, {
    auth: {
      username: Cypress.env('authUsername'),
      password: Cypress.env('authPassword'),
    },
  });
});

// Percy CSS

// cy.percySnapshot('Home page', {
//   percyCSS: `iframe { display: none; }`,
// });
