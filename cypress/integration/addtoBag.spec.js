describe('Highsnobiety | Add to Bag Tests', () => {
  it('Bag | Add to Bag | Happy Path', () => {
    cy.authVisit('/shop/product/MSMOODJA01/');
    cy.get('[class*="header"]').invoke('attr', 'style', 'display: none');
    cy.get('[name="shipping.country"]')
      .invoke('val')
      .should('eq', 'DE');
    cy.get('[name="shipping.country"]')
      .find(':selected')
      .contains('Germany');
    cy.get('[class*="regularPrice"]').should('contain', 'EUR');
    cy.get('[name="dropdown"]').select('EU  35');
    cy.get('[name="dropdown"]')
      .find(':selected')
      .contains('EU 35');
    cy.get('.addToCart').should('not.be.disabled');
    cy.get('.addToCart')
      .first()
      .click();
    cy.get('[class*="header"]').invoke('attr', 'style', 'display: block');
    cy.contains('checkout').should('be.visible');
    cy.get('[href="/shop/cart/"]').should('contain', 2);
    cy.get('[href="/shop/cart/"]').click();
    cy.get('[name="shipping.country"]')
      .invoke('val')
      .should('eq', 'DE');
  });
});

// cy.authVisit('/shop/product/MSMOODJA01/');
// cy.get('[class*="header"]').invoke('attr', 'style', 'display: none');
// cy.get('[name="shipping.country"]')
//   .invoke('val')
//   .should('eq', 'DE');
// cy.get('[name="dropdown"]').select('EU  35', { force: true });
// cy.get('.addToCart').should('not.be.disabled');
// cy.get('[class*="sizeInformation"]').should('not.have.class', '[class*="noselection"]');
// cy.get('[class*="header"]').invoke('attr', 'style', 'display: block');
// cy.get('.addToCart')
//   .first()
//   .click();
// cy.contains('checkout').should('be.visible');
// cy.get('[href="/shop/cart/"]').should('contain', 1);
// cy.get('[href="/shop/cart/"]').click();
// cy.get('[name="shipping.country"]')
//   .invoke('val')
//   .should('eq', 'DE');
