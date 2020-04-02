const Chance = require('chance');

const chance = new Chance();

const password = `${chance.guid()}!123JAY[^~`;

describe('Highsnobiety | Authed Checkout Tests', () => {
  beforeEach(() => {
    cy.addToCart();
    cy.contains('checkout').click();
  });
  it('Checkout | Authed User | Complete Purchase', () => {
    cy.login();
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.contains('Proceed to secure payment').click();
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
    cy.percySnapshot('Snapshot | Order Summary | Completed');
    cy.get('[class*="content"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="creditCardMask"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.contains('buy now').click({ force: true });
    cy.contains("We've got your order!")
      .should('be.visible')
      .and('exist');
    cy.contains('Check order status')
      .should('be.visible')
      .and('exist');
    cy.contains('My Orders')
      .should('be.visible')
      .and('exist');
    cy.get('[class*="header"]')
      .should('be.visible')
      .and('exist');
  });

  it('Checkout | New User | Complete Purchase', () => {
    cy.get('[href="/shop/checkout/account/signup/"]')
      .first()
      .click();
    cy.percySnapshot('Snapshot | Login Page');
    cy.get('[name="email"]').type(`${chance.guid()}@highsnobiety.com`);
    cy.get('[name="password"]').type(password);
    cy.get('[type="submit"]').click();
    cy.get('.close').click({ force: true });
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.percySnapshot('Snapshot | Shipping Form', {
      percyCSS: `p[class*="loggedInAs"] { display: none; }`,
    });
    cy.fillInAddressForm({ formName: 'shippingAddress', country: 'Germany' });
    cy.contains('Proceed to secure payment').click();
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
    cy.contains('buy now').click({ force: true });
    cy.contains("We've got your order!")
      .should('be.visible')
      .and('exist');
    cy.contains('Check order status')
      .should('be.visible')
      .and('exist');
    cy.contains('My Orders')
      .should('be.visible')
      .and('exist');
    cy.get('[class*="header"]')
      .should('be.visible')
      .and('exist');
    cy.percySnapshot('Snapshot | Order Confirmation', {
      percyCSS: `p[class*="orderNumber"] { display: none; } div[class*="marketingStrip"] { display: none; }`,
    });
  });
});
