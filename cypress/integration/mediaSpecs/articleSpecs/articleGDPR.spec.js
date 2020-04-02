describe('Highsnobiety | Article | GDPR Tests', () => {
  it('Article | GDPR | Non-EU Country', () => {
    cy.setCookie('ec_country_new', 'US');
    cy.authVisit('/p/beams-ziploc-accessories/?perf_test=1');
    cy.get('.uc-banner-content').should('not.be.visible');
  });
  it('Article | GDPR | Edit Consent', () => {
    Cypress.env('RETRIES', 2);
    cy.setCookie('ec_country_new', 'DE');
    cy.authVisit('/privacy/');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get('[href="#uc-central-modal-show"]').click({ force: true });
    cy.get('.uc-content')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('#category-toggle-marketing')
      .should('be.visible')
      .and('not.be.empty');
  });
});
