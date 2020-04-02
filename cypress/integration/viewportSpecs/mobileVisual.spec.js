describe('Highsnobiety | Mobile Visual Tests', () => {
  it('Samsung | EC-1623 | Login and Sign Up Alignment', () => {
    cy.authVisit('/account/login');
    cy.get('[name="email"]').should('be.visible');
    cy.percySnapshot('Snapshot | Login | Samsung', {
      widths: [1184, 576],
      percyCSS: `div[class*="marketingStrip"] { display: none; }`,
    });
    cy.authVisit('/account/signup/');
    cy.get('[name="email"]').should('be.visible');
    cy.percySnapshot('Snapshot | Sign Up | Samsung', {
      widths: [1184, 576],
      percyCSS: `div[class*="marketingStrip"] { display: none; }`,
    });
  });
  it('iPhone | EC-1622 | PDP | Select Size', () => {
    cy.authVisit('/shop/product/OTSH0031XX/');
    cy.get('[name="dropdown"]').should('be.visible');
    cy.percySnapshot('Snapshot | Select Size | iPhone', {
      widths: [414],
      percyCSS: `div[class*="marketingStrip"] { display: none; }`,
    });
  });
});
