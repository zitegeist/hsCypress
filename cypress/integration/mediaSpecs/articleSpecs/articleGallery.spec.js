describe('Highsnobiety | Article | Gallery Tests', () => {
  Cypress.env('RETRIES', 2);
  beforeEach(() => {
    cy.authVisit('/p/balmain-new-sneaker-collection-film-vitali-gelwich/?perf_test=1');
    cy.get('img')
      .eq(1)
      .scrollIntoView();
    cy.get('img')
      .eq(1)
      .should('have.attr', 'src');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get('img')
      .first()
      .click();
    cy.get('[class*="isOpen"]').should('be.visible');
  });
  it('Article | Gallery | Close Gallery', () => {
    cy.get('[class*="close"]')
      .first()
      .click();
  });
  it('Article | Gallery | Gallery Numbers', () => {
    cy.get('[class*="numeric-counter"]').should('contain', 1);
    cy.get('[class*="nav-right"]')
      .first()
      .click();
    cy.get('[class*="numeric-counter"]').should('contain', 2);
    cy.get('[class*="nav-right"]')
      .first()
      .click();
    cy.get('[class*="numeric-counter"]').should('contain', 3);
    cy.get('[class*="nav-left"]')
      .first()
      .click();
    cy.get('[class*="numeric-counter"]').should('contain', 2);
  });
});
describe('Article | Gallery | Navigation', () => {
  Cypress.env('RETRIES', 2);
  before(() => {
    cy.authVisit('/p/balmain-new-sneaker-collection-film-vitali-gelwich/?perf_test=1');
    cy.get('img')
      .eq(1)
      .scrollIntoView();
    cy.get('img')
      .eq(1)
      .should('have.attr', 'src');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get('img')
      .first()
      .click();
    cy.get('[class*="isOpen"]').should('be.visible');
  });
  it('Article | Gallery | Navigate Forward by BUTTON', () => {
    cy.get('[class*="nav-right"]')
      .first()
      .click();
    cy.get('[class*="gallery-item"]')
      .eq(1)
      .should('be.visible');
  });
  it('Article | Gallery | Navigate Backward by BUTTON', () => {
    cy.get('[class*="nav-left"]')
      .first()
      .click();
    cy.get('[class*="gallery-item"]')
      .eq(0)
      .should('be.visible');
  });
  it('Article | Gallery | Navigate Forward by KEYS', () => {
    cy.get('body').type('{rightarrow}');
    cy.get('[class*="gallery-item"]')
      .eq(1)
      .should('be.visible');
  });
  it('Article | Gallery | Navigate Backward by KEYS', () => {
    cy.get('body').type('{leftarrow}');
    cy.get('[class*="gallery-item"]')
      .eq(0)
      .should('be.visible');
  });
});
