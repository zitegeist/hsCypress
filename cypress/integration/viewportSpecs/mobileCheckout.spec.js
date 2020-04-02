const Chance = require('chance');

const chance = new Chance();

const password = `${chance.guid()}!123JAY[^~`;

describe('Highsnobiety | Mobile | Checkout Tests', () => {
  beforeEach(() => {
    cy.viewport('iphone-6+');
    cy.addToCart();
    cy.contains('checkout').click();
  });
  it('Mobile | Checkout | New User | Complete Purchase', () => {
    cy.get('[href="/shop/checkout/account/signup/"]')
      .first()
      .click();
    cy.get('[name="email"]').type(`${chance.guid()}@highsnobiety.com`);
    cy.get('[name="password"]').type(password);
    cy.get('[type="submit"]').click();
    cy.get('[class*="productName"]')
      .should('not.be.visible')
      .and('contain', 'Test | Single Variant');
    cy.fillInAddressForm({ formName: 'shippingAddress', country: 'Germany' });
    cy.contains('Proceed to secure payment').click();
    cy.contains('Credit Card').click();
    cy.get('[class*="productName"]')
      .should('not.be.visible')
      .and('contain', 'Test | Single Variant');
    cy.fillInCreditCardDetails({ cardNumber: Cypress.env('cardGeneric') });
    cy.contains('review and pay').click();
    cy.get('[class*="productName"]').should('not.be.visible');
    cy.contains('Total recap').should('not.be.visible');
    cy.get('[class*="title"]').should('be.visible');
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
  it('Mobile | Checkout | Security | 3D Secure', () => {
    cy.get('[href="/shop/checkout/account/signup/"]')
      .first()
      .click();
    cy.get('[name="email"]').type(`${chance.guid()}@highsnobiety.com`);
    cy.get('[name="password"]').type(password);
    cy.get('[type="submit"]').click();
    cy.get('[class*="productName"]')
      .should('not.be.visible')
      .and('contain', 'Test | Single Variant');
    cy.fillInAddressForm({ formName: 'shippingAddress', country: 'Germany' });
    cy.contains('Proceed to secure payment').click();
    cy.contains('Credit Card').click();
    cy.get('[class*="productName"]')
      .should('not.be.visible')
      .and('contain', 'Test | Single Variant');
    cy.fillInCreditCardDetails({ cardNumber: Cypress.env('card3DRequired') });
    cy.contains('review and pay').click();
    cy.get('[class*="productName"]').should('not.be.visible');
    cy.contains('Total recap').should('not.be.visible');
    cy.get('[class*="title"]').should('be.visible');
    cy.get('[class*="content"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="creditCardMask"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.contains('buy now').click({ force: true });
    cy.authorize3DSecure(true);
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
});
