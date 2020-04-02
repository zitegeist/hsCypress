describe('Highsnobiety | Bag Gift Tests | EC-1562', () => {
  beforeEach(() => {
    cy.authVisit('/shop/cart/');
    cy.addToCartStub('en', 'DE', 'MSMOODJA01');
    cy.reload();
  });
  it('Gift | Gift Auto-added', () => {
    cy.get('[class*="gifts"]')
      .should('be.visible')
      .and('contain', 'Luxury');
    cy.get('[class*="free"]')
      .should('be.visible')
      .and('not.be.empty');
  });
  it('Gift | Gift Removal', () => {
    cy.get('[class*="gifts"]').should('be.visible');
    cy.get('[class*="removeButton"]')
      .eq(1)
      .click();
    cy.get('[class*="gifts"]').should('not.be.visible');
  });
  it('Gift | Gift Removed after Product Removal', () => {
    cy.get('[class*="regularItems"]').should('be.visible');
    cy.get('[class*="gifts"]').should('be.visible');
    cy.get('[class*="removeButton"]')
      .first()
      .click();
    cy.get('[class*="regularItems"]').should('not.be.visible');
    cy.get('[class*="gifts"]').should('not.be.visible');
  });
  it('Gift | Gift gift not added after removal', () => {
    cy.get('[class*="regularItems"]').should('be.visible');
    cy.get('[class*="gifts"]').should('be.visible');
    cy.get('[class*="removeButton"]')
      .eq(1)
      .click();
    cy.get('[class*="gifts"]').should('not.be.visible');
    cy.addToCartStub('en', 'DE', 'MSMOODJA01');
    cy.reload();
    cy.get('[class*="gifts"]').should('not.be.visible');
    cy.get('[class*="regularItems"]').should('be.visible');
    cy.get('[class*="quantity"]').should('contain', 2);
  });
  it('Gift | Gift added again with new cart after removal', () => {
    cy.get('[class*="regularItems"]').should('be.visible');
    cy.get('[class*="gifts"]').should('be.visible');
    cy.get('[class*="removeButton"]')
      .first()
      .click();
    cy.get('[class*="gifts"]').should('not.be.visible');
    cy.get('[class*="regularItems"]').should('not.be.visible');
    cy.addToCartStub('en', 'DE', 'MSMOODJA01');
    cy.reload();
    cy.get('[class*="gifts"]').should('be.visible');
    cy.get('[class*="regularItems"]').should('be.visible');
    cy.get('[class*="quantity"]').should('contain', 1);
  });
});
