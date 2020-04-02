describe('Highsnobiety | Upcoming Tests', () => {
  it('Upcoming | Data Displaying Correctly', () => {
    cy.authVisit('/shop/upcoming/');
    cy.get('[class*="wrapper"]')
      .should('be.visible')
      .and('contain', 'Feed', 'In Stock', 'Upcoming');
    cy.get('[class*="campaignGroup"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="section-title"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="campaigns"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('#subscribePopupBtn')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="newsletterSignUp"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="campaignGroup"]')
      .eq(1)
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="ctaButton"]')
      .should('be.visible')
      .and('not.be.empty');
  });
  it('Upcoming | Campaign Buttons', () => {
    cy.authVisit('/shop/upcoming/');
    cy.get('#subscribePopupBtn')
      .first()
      .click();
    cy.get('[class*="newsletterSignUp"]')
      .should('be.visible')
      .and('contain', 'Never miss a drop');
    cy.get('[class*="input"]')
      .should('be.visible')
      .and('be.empty');
    cy.get('[class*="closeCta"]').click();
    cy.get('[class*="ctaButton"]')
      .first()
      .click();
    cy.url().should('not.contain', '/upcoming/');
  });
  it('Upcoming | EC-1852 | Stretched campaign images on mobile', () => {
    cy.authVisit('/shop/upcoming/');
    cy.get('[class*="input"]')
      .should('be.visible')
      .and('be.empty');
    cy.percySnapshot('Snapshot | PDP | Upcoming', {
      widths: [414],
      percyCSS: `div[class*="marketingStrip"] { display: none; }`,
    });
  });
});
