// Fragment ArticleContentAndFooter is disabled
describe.skip('Highsnobiety | Article | Article Fragment Tests', () => {
  it('Article | Fallback | Intact Article Content', () => {
    cy.authVisit('/p/best-summer-sneakers/');
    cy.get('[data-fragment-name="articleContentAndFooter"]')
      .should('exist')
      .and('be.visible');
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
    cy.authVisit('/p/best-summer-sneakers/');
    cy.get('[data-fragment-name="articleContentAndFooter"]')
      .should('exist')
      .and('be.visible');
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
  it('Article | Fragments | articleContentandFooter', () => {
    cy.authVisit('/p/best-summer-sneakers/');
    cy.get('[data-fragment-name="articleContentAndFooter"]')
      .should('exist')
      .and('contain', 'img');
    cy.get('[data-fragment-name="productModule"]').should('not.exist');
  });
  it('Article | Fragments | Product Module', () => {
    cy.authVisit('/p/best-summer-sneakers/?articleContentAndFooter=0');
    cy.get('[data-fragment-name="productModule"]')
      .should('exist')
      .and('contain', 'img');
    cy.get('[data-fragment-name="articleContentAndFooter"]').should('not.exist');
  });
  it('Article | Fragments | Footer Module', () => {
    cy.authVisit('/p/best-summer-sneakers/');
    cy.get('[data-fragment-name="footer"]')
      .should('exist')
      .and('contain', 'a');
  });
});
