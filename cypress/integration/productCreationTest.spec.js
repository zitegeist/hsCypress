describe('Highsnobiety | Product Test', () => {
  const id = `${chance.natural()}`;
  before(() => {
    cy.createStandardProduct(id);
  });
  after(() => {
    cy.deleteProduct(id);
  });
  it('Test | Seeding | Product Seeding', () => {
    cy.authVisit(`/shop/product/${id}`);
  });
});
