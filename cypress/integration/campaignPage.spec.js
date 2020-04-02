describe('Highsnobiety | Lister Tests', () => {
  it('Lister | Standard Campaign Lister | Element Verification', () => {
    cy.authVisit('/c/chinatown-market-highsnobiety/');
    cy.get('.campaign-header__title')
      .should('contain', 'CHINATOWN MARKET')
      .and('not.be.empty');
    cy.get('.campaign-header__backlink__link')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('.campaign-header__subline__text')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[data-fragment-name="newsletterSignUp"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('.post__content')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('.marquee__wrapper')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('.image').should('be.visible');
    cy.get('.img-element__credit')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('.post__content')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="marketingStrip"]')
      .should('be.visible')
      .and('not.be.empty');
  });
});
