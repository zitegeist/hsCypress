import activateUserHelper from '../helpers/activateUserHelper';

const Chance = require('chance');

const chance = new Chance();

const password = `${chance.guid()}!123JAY[^~`;

describe('Highsnobiety | Account | Shipping Address Tests', () => {
  it('Account | Addresses | Create New Address', () => {
    const email = `${chance.guid()}@highsnobiety.com`;
    const firstName = chance.first();

    cy.authVisit('/account/signup/');
    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type(password);
    cy.get('[type="submit"]').click();
    cy.get('.close').click({ force: true });
    cy.get('[href="/account/addresses/"]')
      .should('be.visible')
      .then(() => {
        cy.wrap(activateUserHelper(email));
      });
    cy.get('[name="firstName"]').should('be.visible');
    cy.get('[href="/account/addresses/"]').click();
    cy.reload();
    cy.fillInAddressForm({ formName: 'shippingAddress', country: 'Germany' });
    cy.get('[name="shippingAddress.country"]').select('Germany');
    cy.get('[name="shippingAddress.firstName"')
      .clear()
      .type(firstName);
    cy.contains('Save changes').click();
    cy.contains('Your address has been succesfully changed').should('be.visible');
    cy.get('.close')
      .click({ force: true })
      .then(() => {
        cy.wrap(activateUserHelper(email));
      });
    cy.contains('Log out').click();
    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type(password);
    cy.get('[type="submit"]').click();
    cy.get('[href="/account/addresses/"]').click();
    cy.reload();
    cy.get('[name="shippingAddress.firstName"]')
      .invoke('val')
      .should('equal', firstName);
    cy.get('[name="shippingAddress.lastName"')
      .invoke('val')
      .should('not.be.empty');
    cy.get('[name="shippingAddress.country"')
      .invoke('val')
      .should('equal', 'DE');
  });
  it('Account | Addresses | Create AND Edit Address', () => {
    const emailEdit = `${chance.guid()}@highsnobiety.com`;
    const firstName = chance.first();
    const firstNameEdit = chance.first();

    cy.authVisit('/account/signup/');
    cy.get('[name="email"]').type(emailEdit);
    cy.get('[name="password"]').type(password);
    cy.get('[type="submit"]').click();
    cy.get('[href="/account/addresses/"]').should('be.visible');
    cy.get('.close')
      .click({ force: true })
      .then(() => {
        cy.wrap(activateUserHelper(emailEdit));
      });
    cy.get('[name="firstName"]').should('be.visible');
    cy.get('[href="/account/addresses/"]').click();
    cy.reload();
    cy.fillInAddressForm({ formName: 'shippingAddress', country: 'Germany' });
    cy.get('[name="shippingAddress.country"]').select('Germany');
    cy.get('[name="shippingAddress.firstName"')
      .clear()
      .type(firstName);
    cy.contains('Save changes').click();
    cy.contains('Your address has been succesfully changed').should('be.visible');
    cy.get('.close').click({ force: true });
    cy.contains('Log out').click();
    cy.get('[name="email"]').type(emailEdit);
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
    cy.get('[name="shippingAddress.country"').select('United Kingdom');
    cy.get('[name="shippingAddress.firstName"')
      .clear()
      .type(firstNameEdit);
    cy.contains('Save changes').click();
    cy.contains('Your address has been succesfully changed').should('be.visible');
    cy.get('.close').click({ force: true });
    cy.contains('Log out').click();
    cy.get('[name="email"]').type(emailEdit);
    cy.get('[name="password"]').type(password);
    cy.get('[type="submit"]').click();
    cy.get('[href="/account/addresses/"]').click();
    cy.get('[name="shippingAddress.firstName"]')
      .invoke('val')
      .should('equal', firstNameEdit);
    cy.get('[name="shippingAddress.lastName"')
      .invoke('val')
      .should('not.be.empty');
    cy.get('[name="shippingAddress.country"')
      .invoke('val')
      .should('equal', 'GB');
  });
  it('Account | Addresses | New Address Auto-filled on Checkout', () => {
    const emailCheckout = `${chance.guid()}@highsnobiety.com`;
    const firstName = chance.first();

    cy.authVisit('/account/signup/');
    cy.get('[name="email"]').type(emailCheckout);
    cy.get('[name="password"]').type(password);
    cy.get('[type="submit"]').click();
    cy.get('.close').click({ force: true });
    cy.get('[href="/account/addresses/"]')
      .should('be.visible')
      .then(() => {
        cy.wrap(activateUserHelper(emailCheckout));
      });
    cy.get('[name="firstName"]').should('be.visible');
    cy.get('[href="/account/addresses/"]').click();
    cy.reload();
    cy.fillInAddressForm({ formName: 'shippingAddress', country: 'Germany' });
    cy.get('[name="shippingAddress.country"]').select('Germany');
    cy.get('[name="shippingAddress.firstName"')
      .clear()
      .type(firstName);
    cy.contains('Save changes').click();
    cy.contains('Your address has been succesfully changed').should('be.visible');
    cy.get('.close').click({ force: true });
    cy.contains('Log out').click();
    cy.get('[name="email"]').type(emailCheckout);
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
  });
});
