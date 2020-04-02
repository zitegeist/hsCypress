// eslint-disable id-match
describe('Highsnobiety | All Products Page Tests', () => {
  before(() => {
    cy.setCookie('ec_country_new', 'DE');
    cy.authVisit('/shop/in-stock/');
  });
  /*eslint-disable */
  it('All Products | Loads with Data', () => {
    cy.get('body').then($element => {
      if ($element.find('[class*="productCard"]').is(':visible')) {
        cy.get('[class*="headline"]')
          .should('be.visible')
          .and('not.be.empty');
        cy.get('[class*="details"]')
          .should('be.visible')
          .and('not.be.empty');
        cy.get('[class*="title"]')
          .should('be.visible')
          .and('not.be.empty');
        cy.get('[class*="productPrice"]')
          .should('be.visible')
          .and('contain', 'EUR');
        cy.contains('View Drop')
          .should('be.visible')
          .and('not.be.empty');
        cy.get('[class*="newsletterSignUp"]')
          .should('be.visible')
          .and('not.be.empty');
        cy.get('[name="email"]')
          .should('be.visible')
          .and('be.empty');
      }
    });
  });
  /* eslint-enable */
});
