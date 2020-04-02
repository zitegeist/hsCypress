const Chance = require('chance');

const chance = new Chance();

describe('Highsnobiety | Raffle Tests', () => {
  beforeEach(() => {
    cy.authVisit('/shop/raffle/huarache/');
    cy.get('[class^="productSelector"] > [class^="product"]').should('have.length', 2);
    cy.get('[class*="thumbnail"]').should('be.visible');
    cy.get('[class^="productSelector"] > [class^="product"]')
      .eq(1)
      .click();
    cy.get('[class*="imageButton"]')
      .first()
      .should('have.attr', 'class')
      .and('not.match', /isActive/);
    cy.get('[class*="imageButton"]')
      .eq(1)
      .should('have.attr', 'class')
      .and('match', /isActive/);
    cy.get('[name="dropdown"]').select('IT 38.5');
    cy.get('[name="dropdown"]')
      .invoke('val')
      .should('equal', '38.5');
    cy.get('[name="email"]').type(`${chance.guid()}Raffle@highsnobiety.com`);
    cy.fillInAddressForm({ formName: 'shippingAddress', country: 'Germany' });
  });
  it('Raffle | Happy Path Purchase | no 3D Secure', () => {
    cy.fillInCreditCardDetails({ cardNumber: Cypress.env('cardGeneric') });
    cy.get('[form="credit-card-form"]').click();
    cy.get('img').should('be.visible');
    cy.contains('€350.00 EUR')
      .should('be.visible')
      .and('not.be.empty');
    cy.url().should('contain', '/thanks/');
    cy.get('[class*="productAttribute"]')
      .should('not.be.empty')
      .and('have.length', 2);
    cy.get('[class*="productInfo"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.contains('Good luck.').should('be.visible');
  });
  it('Raffle | Happy Path Purchase | WITH 3D Secure', () => {
    cy.fillInCreditCardDetails({ cardNumber: Cypress.env('card3DRequired') });
    cy.get('[form="credit-card-form"]').click();
    cy.authorize3DSecure({ succeed: true, expectedPrivateStripeIFrameCount: 4 });
    cy.url().should('contain', '/thanks/');
    cy.get('img').should('be.visible');
    cy.contains('€350.00 EUR')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="productAttribute"]')
      .should('not.be.empty')
      .and('have.length', 2);
    cy.get('[class*="productInfo"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.contains('Good luck.').should('be.visible');
  });
});
