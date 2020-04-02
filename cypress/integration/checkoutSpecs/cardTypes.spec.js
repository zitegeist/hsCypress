const Chance = require('chance');

const chance = new Chance();

const password = `${chance.guid()}!123JAY[^~`;

describe('Highsnobiety | Checkout | Card Types', () => {
  beforeEach(() => {
    cy.addToCart();
    cy.contains('checkout').click();
  });
  it('Checkout | VISA Debit', () => {
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
    cy.get('[class*="shippingOption"]')
      .should('be.visible')
      .and('contain', 'Standard');
    cy.contains('Proceed to secure payment').click();
    cy.contains('Credit Card').click();
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.fillInCreditCardDetails({ cardNumber: '4000056655665556' });
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
  });
  it('Checkout | Mastercard', () => {
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
    cy.get('[class*="shippingOption"]')
      .should('be.visible')
      .and('contain', 'Standard');
    cy.contains('Proceed to secure payment').click();
    cy.contains('Credit Card').click();
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.fillInCreditCardDetails({ cardNumber: '5555555555554444' });
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
  });
  it('Checkout | AMEX', () => {
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
    cy.get('[class*="shippingOption"]')
      .should('be.visible')
      .and('contain', 'Standard');
    cy.contains('Proceed to secure payment').click();
    cy.contains('Credit Card').click();
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.fillInCreditCardDetails({ cardNumber: '378282246310005' });
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
  });
  it('Checkout | Union Pay', () => {
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
    cy.get('[class*="shippingOption"]')
      .should('be.visible')
      .and('contain', 'Standard');
    cy.contains('Proceed to secure payment').click();
    cy.contains('Credit Card').click();
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.fillInCreditCardDetails({ cardNumber: '6200000000000005' });
    cy.contains('review and pay').click();
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.get('[class*="error"]')
      .should('be.visible')
      .and('contain', 'declined');
  });
});
