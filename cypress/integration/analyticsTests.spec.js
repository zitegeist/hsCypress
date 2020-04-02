const Chance = require('chance');

const chance = new Chance();

const password = `${chance.guid()}!123JAY[^~`;
/*eslint-disable */
Cypress.on('window:before:load', win => {
  win.ga = cy.stub().as('ga');
});
/* eslint-enable */

describe('Highsnobiety | Google Analytics', () => {
  it('Google Analytics | Add to Cart', () => {
    cy.authVisit('/shop/product/MSMOODJA01/');
    cy.get('@ga').should('be.calledWith', 'create', 'UA-16203725-6');
    cy.get('@ga').should('be.calledWith', Cypress.sinon.match('ec:setAction', 'detail'));
    cy.get('[class*="header"]').invoke('attr', 'style', 'display: none');
    cy.get('[name="shipping.country"]')
      .invoke('val')
      .should('eq', 'DE');
    cy.get('[name="shipping.country"]')
      .find(':selected')
      .contains('Germany');
    cy.get('[class*="regularPrice"]').should('contain', 'EUR');
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
    cy.get('@ga').should(
      'be.calledWith',
      Cypress.sinon.match('ec:addProduct'),
      Cypress.sinon.match({
        id: '8521c6c3-83a6-4153-9d5c-c035b922bbef',
        name: 'Test | Single Variant',
        campaign_slug: 'prada-2',
        brand: 'Prada',
        category: 'Shoes',
        sku: 'MSMOODJA01',
        size: '35',
        price_currency: 'EUR',
        price: 520,
        price_gross_md: 520,
        price_gross_fp: 520,
        type: 'Shoes',
        variant: 'White',
        dimension22: undefined,
        dimension20: true,
        dimension24: 'female',
        list: '/shop/product/MSMOODJA01/',
        quantity: 1,
      }),
    );
    cy.get('@ga').should(
      'be.calledWith',
      Cypress.sinon.match('send'),
      Cypress.sinon.match({
        hitType: 'event',
        eventCategory: 'Ecommerce',
        eventAction: 'Add To Cart',
        eventLabel: 'Test | Single Variant',
      }),
    );
    cy.get('@ga').should('be.calledWith', Cypress.sinon.match('ec:setAction', 'add'));
    cy.authVisit('/shop/cart/');
    cy.get('@ga').should('be.calledWith', Cypress.sinon.match('send', 'pageview'));
  });
  it('Google Analytics | Bag Page', () => {
    cy.addToCart();
    cy.get('@ga').should('be.calledWith', Cypress.sinon.match('send', 'pageview'));
    cy.get('@ga').should('be.calledWith', Cypress.sinon.match('set'), '&cu', 'EUR');
    cy.get('@ga').should('be.calledWith', Cypress.sinon.match('ec:setAction'), 'checkout', { step: 1 });
  });
  it('Google Analytics | Checkout Process', () => {
    cy.addToCart();
    cy.contains('checkout').click();
    cy.get('[href="/shop/checkout/account/signup/"]')
      .first()
      .click();
    cy.get('[name="email"]').type(`${chance.guid()}@highsnobiety.com`);
    cy.get('[name="password"]').type(password);
    cy.get('[type="submit"]').click();
    cy.get('.close').click({ force: true });
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.get('@ga').should('be.calledWith', Cypress.sinon.match('send', 'pageview'));
    cy.get('@ga').should('be.calledWith', Cypress.sinon.match('ec:setAction'), 'checkout', { step: 2 });
    cy.fillInAddressForm({ formName: 'shippingAddress', country: 'Germany' });
    cy.contains('Proceed to secure payment').click();
    cy.get('@ga').should('be.calledWith', Cypress.sinon.match('send', 'pageview'));
    cy.get('@ga').should('be.calledWith', Cypress.sinon.match('ec:setAction'), 'checkout', { step: 3 });
    cy.contains('Credit Card').click();
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.fillInCreditCardDetails({ cardNumber: Cypress.env('cardGeneric') });
    cy.contains('review and pay').click();
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.contains('Total recap')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="content"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="creditCardMask"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.contains('buy now')
      .first()
      .click({ force: true });
    cy.url().should('contain', '/order/thanks');
    cy.get('@ga').should('be.calledWith', Cypress.sinon.match('send', 'pageview'));
    cy.get('@ga').should(
      'be.calledWith',
      Cypress.sinon.match('ec:setAction'),
      'purchase',
      Cypress.sinon.match({
        revenue: 520,
        tax: 83.03,
        shipping: 0,
      }),
    );
  });
  it('Google Analytics | Shop Home', () => {
    cy.authVisit('/shop/');
    cy.get('@ga').should('be.calledWith', 'create', 'UA-16203725-6');
    cy.get('@ga').should('be.calledWith', Cypress.sinon.match('send', 'pageview'));
    cy.get('@ga').should('be.calledWith', Cypress.sinon.match('require', 'render'));
    cy.get('@ga').should('be.calledWith', Cypress.sinon.match('require', 'displayFeatures'));
  });
  it('Google Analytics | Campaign Page', () => {
    cy.authVisit('/c/chinatown-market-highsnobiety/');
    cy.get('@ga').should('be.calledWith', 'create', 'UA-16203725-6');
    cy.get('@ga').should('be.calledWith', Cypress.sinon.match('send', 'pageview'));
    cy.get('@ga').should('be.calledWith', Cypress.sinon.match('require', 'render'));
    cy.get('@ga').should('be.calledWith', Cypress.sinon.match('require', 'displayFeatures'));
  });
  it('Google Analytics | in-stock Page', () => {
    cy.authVisit('/shop/in-stock/');
    cy.get('@ga').should('be.calledWith', 'create', 'UA-16203725-6');
    cy.get('@ga').should('be.calledWith', Cypress.sinon.match('ec', 'addImpression'));
    cy.get('@ga').should('be.calledWith', Cypress.sinon.match('require', 'displayFeatures'));
    cy.get('@ga').should('be.calledWith', Cypress.sinon.match('send', 'pageview'));
    cy.get('@ga').should('be.calledWith', Cypress.sinon.match('require', 'render'));
  });
});
