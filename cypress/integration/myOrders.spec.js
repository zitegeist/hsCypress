describe('Highsnobiety | My Orders', () => {
  before(() => {
    cy.authVisit('/account/login');
    cy.login();
    cy.get('[href="/account/orders/"]').click();
  });
  it('Account | My Orders | Lister', () => {
    cy.get('[class*="orderHeader"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="orderState"]')
      .should('be.visible')
      .and('contain', 'placed');
    cy.get('[class*="editButton"]').should('be.visible');
    cy.contains('test.automation')
      .should('exist')
      .and('be.visible');
    cy.get('[class*="header"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="footer"]')
      .should('be.visible')
      .and('not.be.empty');
  });
  it('Account | My Orders | Order Detail', () => {
    cy.get('[class*="orderHeader"]')
      .first()
      .click();
    cy.contains('order number').should('be.visible');
    cy.contains('order date').should('be.visible');
    cy.get('[class*="sectionContent"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="headline"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="content"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="description"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="price"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="productName"] > [class*="productName"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="image"]').should('be.visible');
  });
});
