// Fragment ArticleContentAndFooter is disabled
describe.skip('Highsnobiety | Article | Fragment Fallback Tests', () => {
  it('Article | Fallback | Intact Article Content', () => {
    cy.authVisit('/p/best-summer-sneakers/?articleContentAndFooter=0');
    cy.get('[data-fragment-name="articleContentAndFooter"]').should('not.exist');
    cy.get('[class*="footer"]')
      .first()
      .scrollIntoView();
    cy.get('[class*="footer"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[id*="adventive_html"]').should('exist');
    cy.get('.post__sidebar-stickable')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('.header')
      .should('be.visible')
      .and('not.be.empty');
  });
  it('Article | Fallback | Mobile | Intact Article Content', () => {
    cy.viewport('iphone-6');
    cy.authVisit('/p/best-summer-sneakers/?articleContentAndFooter=0');
    cy.get('[data-fragment-name="articleContentAndFooter"]').should('not.exist');
    cy.get('[class*="footer"]')
      .first()
      .scrollIntoView();
    cy.get('[class*="footer"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[id*="adventive_html"]').should('exist');
    cy.get('.post__sidebar-stickable').should('not.be.visible');
    cy.get('.header')
      .should('be.visible')
      .and('not.be.empty');
  });
  it('Article | Fallback | ArticleContentAndFooter', () => {
    cy.authVisit('/p/virgil-abloh-biography/?articleContentAndFooter=0');
    cy.get('[data-fragment-name="articleContentAndFooter"]').should('not.exist');
    cy.get('[class*="content__screenContent"]')
      .should('be.visible')
      .and('not.be.empty');
  });
  it('Article | Fallback | productModule', () => {
    cy.authVisit('/p/best-summer-sneakers/?productModule=0');
    cy.get('[data-fragment-name="articleContentAndFooter"]').should('exist');
    cy.get('[class*="productModule"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[data-fragment-name="productModule"]').should('not.exist');
  });
  it('Article | Fallback | footer', () => {
    cy.authVisit('/p/best-summer-sneakers/?footer=0');
    cy.get('[data-fragment-name="articleContentAndFooter"]').should('exist');
    cy.get('[class*="productModule"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[data-fragment-name="productModule"]').should('not.exist');
    cy.get('[data-fragment-name="footer"]').should('not.exist');
    cy.get('footer')
      .should('exist')
      .and('not.be.empty');
  });
});
