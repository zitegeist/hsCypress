import activateUserHelper from '../helpers/activateUserHelper';

const Chance = require('chance');

const chance = new Chance();

const password = `${chance.guid()}!123JAY[^~`;

describe('Highsnobiety | Account | Billing Address Tests', () => {
  it('Account | Addresses | Separate Billing Address', () => {
    const emailBilling = `${chance.guid()}@highsnobiety.com`;
    const firstName = chance.first();
    const firstNameBilling = chance.first();

    cy.authVisit('/account/signup/');
    cy.get('[name="email"]').type(emailBilling);
    cy.get('[name="password"]').type(password);
    cy.get('[type="submit"]').click();
    cy.get('.close').click({ force: true });
    cy.get('[href="/account/addresses/"]')
      .should('be.visible')
      .then(() => {
        cy.wrap(activateUserHelper(emailBilling));
      });
    cy.get('[name="firstName"]').should('be.visible');
    cy.get('[href="/account/addresses/"]').click();
    cy.reload();
    cy.fillInAddressForm({ formName: 'shippingAddress', country: 'Germany' });
    cy.get('[name="shippingAddress.country"]').select('Germany');
    cy.get('[name="shippingAddress.firstName"')
      .clear()
      .type(firstName);
    cy.get('[class*="billingSameAsShipping"]').click();
    cy.fillInAddressForm({ formName: 'billingAddress', country: 'Germany' });
    cy.get('[name="billingAddress.firstName"')
      .clear()
      .type(firstNameBilling);
    cy.get('[name="billingAddress.country"]').select('United Kingdom');
    cy.contains('Save changes').click();
    cy.contains('Your address has been succesfully changed').should('be.visible');
    cy.contains('Log out').click();
    cy.get('[name="email"]').type(emailBilling);
    cy.get('[name="password"]').type(password);
    cy.get('[type="submit"]').click();
    cy.get('[href="/account/addresses/"]').click();
    cy.get('[name="shippingAddress.firstName"]')
      .invoke('val')
      .should('equal', firstName);
    cy.get('[name="shippingAddress.lastName"')
      .invoke('val')
      .should('not.be.empty');
    cy.get('[name="shippingAddress.country"')
      .invoke('val')
      .should('equal', 'DE');
    cy.get('[name="billingAddress.firstName"]')
      .invoke('val')
      .should('equal', firstNameBilling);
    cy.get('[name="billingAddress.lastName"')
      .invoke('val')
      .should('not.be.empty');
    cy.get('[name="billingAddress.country"')
      .invoke('val')
      .should('equal', 'GB');
  });
  it('Account | Addresses | Separate Billing Address Auto-filled on Checkout', () => {
    const emailBilling = `${chance.guid()}@highsnobiety.com`;
    const firstName = chance.first();
    const firstNameBilling = chance.first();

    cy.authVisit('/account/signup/');
    cy.get('[name="email"]').type(emailBilling);
    cy.get('[name="password"]').type(password);
    cy.get('[type="submit"]').click();
    cy.get('.close').click({ force: true });
    cy.get('[href="/account/addresses/"]')
      .should('be.visible')
      .then(() => {
        cy.wrap(activateUserHelper(emailBilling));
      });
    cy.get('[name="firstName"]').should('be.visible');
    cy.get('[href="/account/addresses/"]').click();
    cy.reload();
    cy.fillInAddressForm({ formName: 'shippingAddress', country: 'Germany' });
    cy.get('[name="shippingAddress.country"]').select('Germany');
    cy.get('[name="shippingAddress.firstName"')
      .clear()
      .type(firstName);
    cy.get('[class*="billingSameAsShipping"]').click();
    cy.fillInAddressForm({ formName: 'billingAddress', country: 'Germany' });
    cy.get('[name="billingAddress.firstName"')
      .clear()
      .type(firstNameBilling);
    cy.get('[name="billingAddress.country"]').select('United Kingdom');
    cy.contains('Save changes').click();
    cy.contains('Your address has been succesfully changed').should('be.visible');
    cy.contains('Log out').click();
    cy.get('[name="email"]').type(emailBilling);
    cy.get('[name="password"]').type(password);
    cy.get('[type="submit"]').click();
    cy.get('[href="/account/addresses/"]').click();
    cy.get('[name="shippingAddress.firstName"]')
      .invoke('val')
      .should('equal', firstName);
    cy.get('[name="shippingAddress.lastName"')
      .invoke('val')
      .should('not.be.empty');
    cy.get('[name="shippingAddress.country"')
      .invoke('val')
      .should('equal', 'DE');
    cy.get('[name="billingAddress.firstName"]')
      .invoke('val')
      .should('equal', firstNameBilling);
    cy.get('[name="billingAddress.lastName"')
      .invoke('val')
      .should('not.be.empty');
    cy.get('[name="billingAddress.country"')
      .invoke('val')
      .should('equal', 'GB');
    cy.addToCart();
    cy.contains('checkout').click();
    cy.get('[name="shippingAddress.firstName"]')
      .invoke('val')
      .should('equal', firstName);
    cy.get('[name="shippingAddress.lastName"')
      .invoke('val')
      .should('not.be.empty');
    cy.get('[name="shippingAddress.country"')
      .invoke('val')
      .should('equal', 'DE');
    cy.get('[name="shippingAddress.streetName"')
      .invoke('val')
      .should('not.be.empty');
    cy.get('[name="shippingAddress.streetNumber"')
      .invoke('val')
      .should('not.be.empty');
    cy.get('[name="shippingAddress.phone"')
      .invoke('val')
      .should('not.be.empty');
    cy.get('[name="billingAddress.firstName"]')
      .invoke('val')
      .should('equal', firstNameBilling);
    cy.get('[name="billingAddress.lastName"')
      .invoke('val')
      .should('not.be.empty');
    cy.get('[name="billingAddress.country"')
      .invoke('val')
      .should('equal', 'GB');
  });
  it('Account | Addresses | Separate Billing Saved, Data not used on Checkout', () => {
    const emailBilling = `${chance.guid()}@highsnobiety.com`;
    const firstName = chance.first();
    const firstNameBilling = chance.first();

    cy.authVisit('/account/signup/');
    cy.get('[name="email"]').type(emailBilling);
    cy.get('[name="password"]').type(password);
    cy.get('[type="submit"]').click();
    cy.get('.close').click({ force: true });
    cy.get('[href="/account/addresses/"]')
      .should('be.visible')
      .then(() => {
        cy.wrap(activateUserHelper(emailBilling));
      });
    cy.get('[name="firstName"]').should('be.visible');
    cy.get('[href="/account/addresses/"]').click();
    cy.reload();
    cy.fillInAddressForm({ formName: 'shippingAddress', country: 'Germany' });
    cy.get('[name="shippingAddress.country"]').select('Germany');
    cy.get('[name="shippingAddress.firstName"')
      .clear()
      .type(firstName);
    cy.get('[class*="billingSameAsShipping"]').click();
    cy.fillInAddressForm({ formName: 'billingAddress', country: 'Germany' });
    cy.get('[name="billingAddress.firstName"')
      .clear()
      .type(firstNameBilling);
    cy.get('[name="billingAddress.country"]').select('United Kingdom');
    cy.contains('Save changes').click();
    cy.contains('Your address has been succesfully changed').should('be.visible');
    cy.contains('Log out').click();
    cy.get('[name="email"]').type(emailBilling);
    cy.get('[name="password"]').type(password);
    cy.get('[type="submit"]').click();
    cy.get('[href="/account/addresses/"]').click();
    cy.get('[name="shippingAddress.firstName"]')
      .invoke('val')
      .should('equal', firstName);
    cy.get('[name="shippingAddress.lastName"')
      .invoke('val')
      .should('not.be.empty');
    cy.get('[name="shippingAddress.country"')
      .invoke('val')
      .should('equal', 'DE');
    cy.get('[name="billingAddress.firstName"]')
      .invoke('val')
      .should('equal', firstNameBilling);
    cy.get('[name="billingAddress.lastName"')
      .invoke('val')
      .should('not.be.empty');
    cy.get('[name="billingAddress.country"')
      .invoke('val')
      .should('equal', 'GB');
    cy.addToCart();
    cy.contains('checkout').click();
    cy.get('[name="shippingAddress.firstName"]')
      .invoke('val')
      .should('equal', firstName);
    cy.get('[name="shippingAddress.lastName"')
      .invoke('val')
      .should('not.be.empty');
    cy.get('[name="shippingAddress.country"')
      .invoke('val')
      .should('equal', 'DE');
    cy.get('[name="shippingAddress.streetName"')
      .invoke('val')
      .should('not.be.empty');
    cy.get('[name="shippingAddress.streetNumber"')
      .invoke('val')
      .should('not.be.empty');
    cy.get('[name="shippingAddress.phone"')
      .invoke('val')
      .should('not.be.empty');
    cy.get('[name="billingAddress.firstName"]')
      .invoke('val')
      .should('equal', firstNameBilling);
    cy.get('[name="billingAddress.lastName"')
      .invoke('val')
      .should('not.be.empty');
    cy.get('[name="billingAddress.country"')
      .invoke('val')
      .should('equal', 'GB');
    cy.get('[class*="billingAddressToggle"]').click();
    cy.get('[class*="shippingOption"]')
      .should('be.visible')
      .and('contain', 'Standard');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
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
    cy.get('[class*="content"]').should('not.contain', firstNameBilling);
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
});
