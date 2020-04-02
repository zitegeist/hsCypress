describe('Highsnobiety | Mobile Product Page Tests', () => {
  before(() => {
    cy.authVisit('/shop/product/OTSH0031XX/');
  });
  beforeEach(() => {
    cy.viewport('iphone-6');
  });
  it('Product Page | Loads Correctly', () => {
    cy.get('[class*="productDetail"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="headline-display"]')
      .should('be.visible')
      .and('contain', 'New York');
    cy.get('[class*="images"]').should('be.visible');
    cy.get('[class*="info"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('.addToCart > [class*="button"]')
      .should('be.visible')
      .and('contain', 'Add to bag');
    cy.get('[class*="sizeInformation"]').should('contain', 'XXL');
    cy.get('[class*="accordionContent"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="wrapper"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="productCard"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="header"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="footer"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="marketingStrip"]')
      .should('be.visible')
      .and('not.be.empty');
  });
  it('Product Page | Bag Button / Variant Selector Functionality', () => {
    cy.get('.addToCart > [class*="button"]').should('have.attr', 'disabled');
    cy.contains('Select Size').should('have.attr', 'selected');
    cy.get('[name="dropdown"]').select('General Scale Size (Clothing) XXL');
    cy.get('.addToCart > [class*="button"]').should('not.have.attr', 'disabled');
    cy.get('[name="dropdown"]').select('Select Size');
    cy.get('.addToCart > [class*="button"]').should('have.attr', 'disabled');
  });
  it('Product Page | Detail Accordions', () => {
    cy.get('[class*="isSelected"]').should('contain', "Editor's");
    cy.get('[class*="headline"] > [class*="icon"]').should('be.visible');
    cy.contains('This month').should('be.visible');
    cy.contains('Fits to size').should('not.be.visible');
    cy.get('[class*="headline"] > [class*="icon"]')
      .eq(1)
      .click();
    cy.contains('Fits to size').should('be.visible');
    cy.contains('Standard').should('not.be.visible');
    cy.get('[class*="headline"] > [class*="icon"]')
      .eq(2)
      .click();
    cy.contains('Standard').should('be.visible');
  });
});
describe('Product Detail | Gallery', () => {
  beforeEach(() => {
    cy.authVisit('/shop/product/OTSH0031XX/');
    cy.viewport('iphone-6');
    cy.get('#pdp_image_zoom_0').click();
  });
  it('Product Detail | Gallery | Open Gallery', () => {
    cy.get('#pdp_image_zoom-fullscreen_0')
      .should('exist')
      .and('be.visible');
  });
  it('Product Detail | Gallery | Close Gallery', () => {
    cy.get('[class*="closeIcon"]').click();
    cy.get('#pdp_image_zoom-fullscreen_0').should('not.be.visible');
    cy.get('#pdp_image_zoom_0').click();
  });

  it('Product Detail | Gallery | Zoom in', () => {
    cy.get('[class*="zoomedIn"]')
      .should('not.exist')
      .and('not.be.visible');
    cy.get('#pdp_image_zoom-fullscreen_0').click();
    cy.get('[class*="zoomedIn"]')
      .should('exist')
      .and('be.visible');
  });
  it('Product Detail | Gallery | Zoom out', () => {
    cy.get('#pdp_image_zoom-fullscreen_0').click();
    cy.get('[class*="zoomedIn"]')
      .should('exist')
      .and('visible');
    cy.get('[class*="zoomedIn"]')
      .first()
      .click();
    cy.get('[class*="zoomedIn"]')
      .should('not.exist')
      .and('not.be.visible');
  });
});
