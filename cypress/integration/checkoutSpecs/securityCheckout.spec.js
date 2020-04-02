const Chance = require('chance');

const chance = new Chance();

const password = `${chance.guid()}!123JAY[^~`;

describe('Highsnobiety | Checkout | Security Tests', () => {
  beforeEach(() => {
    cy.addToCart();
    cy.contains('checkout').click();
  });
  it('Checkout | 3D Secure Required | Accepted', () => {
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
    cy.fillInAddressForm({ formName: 'shippingAddress', country: 'Germany' });
    cy.get('[class*="input"]').should('be.visible');
    cy.get('[class*="label"]').should('contain', 'Standard');
    cy.contains('Proceed to secure payment').click();
    cy.contains('Credit Card').click();
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.fillInCreditCardDetails({ cardNumber: Cypress.env('card3DRequired') });
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
  it('Checkout | 3D Secure Required | Denied', () => {
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
    cy.fillInAddressForm({ formName: 'shippingAddress', country: 'Germany' });
    cy.get('[class*="input"]').should('be.visible');
    cy.get('[class*="label"]').should('contain', 'Standard');
    cy.contains('Proceed to secure payment').click();
    cy.contains('Credit Card').click();
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.fillInCreditCardDetails({ cardNumber: '4000008400001629' });
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
    cy.authorize3DSecure(true);
    cy.get('.notification___1W8Va');
    cy.get('[class*="notification"]')
      .should('be.visible')
      .and('contain', 'declined for an unknown reason');
  });
  it('Checkout | 3D Secure Required | Cancel Validation', () => {
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
    cy.fillInAddressForm({ formName: 'shippingAddress', country: 'Germany' });
    cy.get('[class*="input"]').should('be.visible');
    cy.get('[class*="label"]').should('contain', 'Standard');
    cy.contains('Proceed to secure payment').click();
    cy.contains('Credit Card').click();
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.fillInCreditCardDetails({ cardNumber: '4000008400001629' });
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
    cy.authorize3DSecure(false);
    cy.get('.notification___1W8Va');
    cy.get('[class*="notification"]')
      .should('be.visible')
      .and('contain', 'Something went wrong');
  });
});
