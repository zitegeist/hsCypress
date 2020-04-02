const Chance = require('chance');

const chance = new Chance();

describe('Highsnobiety | Account Tests', () => {
  beforeEach(() => {
    cy.viewport('iphone-xr');
  });
  it('Viewport | Account | Registration | Good Data', () => {
    const testMail = `${chance.guid()}@highsnobiety.com`;
    const testPass = `${chance.guid()}!123JAY[^~`;

    cy.authVisit('/account/signup/');
    cy.get('[name="email"]').type(testMail);
    cy.get('[name="password"]').type(testPass);
    cy.get('[type="submit"]').click();
    cy.contains('Personal information').should('be.visible');
    cy.url().should('contain', '/account/details/');
  });
  it('Account | Forget Password | Registered Email', () => {
    cy.authVisit('/account/login');
    cy.get('[href="/account/forgot-password/"]').click();
    cy.get('[name="email"]').type(Cypress.env('testEmail'));
    cy.contains('Reset password').click();
    cy.get('[class*="notification"]')
      .should('be.visible')
      .and('contain', 'password reset link');
    cy.get('[class*="paragraph"]')
      .should('be.visible')
      .and('contain', Cypress.env('testEmail'));
    cy.get('[class*="button"]')
      .should('be.visible')
      .and('contain', 'Return to log in');
  });
});
