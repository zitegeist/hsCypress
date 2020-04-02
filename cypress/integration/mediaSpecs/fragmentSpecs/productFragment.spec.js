describe('Highsnobiety | Fragments | Product Module', () => {
  it('Fragments | Product Module', () => {
    cy.visit('https://fragments.hsnb.io/fragments/preview/productModule?slug=horizn-studios-cabin-luggage-black');
    cy.get('img').should('be.visible');
    cy.percySnapshot('Fragments | Product Module', {
      requestHeaders: {
        Authorization: 'Basic staging:hsnb',
      },
    });
  });
  it('Fragments | Product Module | Gallery', () => {
    cy.visit('https://fragments.hsnb.io/fragments/preview/productModule?slug=horizn-studios-cabin-luggage-black');
    cy.get('[alt="Cabin Luggage"]')
      .first()
      .should('be.visible');
    cy.get('[class*="right"]')
      .first()
      .click();
    cy.get('[alt="Cabin Luggage"]')
      .eq(1)
      .should('be.visible');
    cy.get('[class*="right"]')
      .first()
      .click();
    cy.get('[alt="Cabin Luggage"]')
      .eq(2)
      .should('be.visible');
    cy.get('[class*="left"]')
      .first()
      .click();
    cy.get('[alt="Cabin Luggage"]')
      .eq(1)
      .should('be.visible');
    cy.get('[class*="left"]')
      .first()
      .click();
    cy.get('[alt="Cabin Luggage"]')
      .eq(0)
      .should('be.visible');
  });
  it('Fragments | Product Module | No Gallery', () => {
    cy.visit(
      'https://fragments.hsnb.io/fragments/preview/productModule?slug=snow-peak-new-balance-extreme-spec-r_c4-mid-black-black-navy',
      {
        auth: {
          username: Cypress.env('authUsername'),
          password: Cypress.env('authPassword'),
        },
      },
    );
    cy.get('img').should('be.visible');
    cy.get('[class*="right"]').should('not.exist');
    cy.percySnapshot('Fragments | Product Module | No Gallery');
  });
  it('Fragments | Product Module | 404', () => {
    cy.visit('https://fragments.hsnb.io/fragments/preview/productModule?slug=non-existing');
    cy.percySnapshot('Fragments | Product Module | 404');
  });
  it('Fragments | Product Module | Multi-Retailers', () => {
    cy.visit('https://fragments.hsnb.io/fragments/preview/productModule?slug=nike-mid-77-sneakers-white-grey-red');
    cy.get('img').should('be.visible');
    cy.percySnapshot('Fragments | Product Module | Multi-Retailers');
  });
  it('Fragments | Product Module | Multi-Retailers | Dropdown', () => {
    cy.visit('https://fragments.hsnb.io/fragments/preview/productModule?slug=nike-mid-77-sneakers-white-grey-red');
    cy.get('[class*="buyBadge"]').click();
    cy.get('[class*="productModulePopup"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="productModulePopup"]').should('contain', '$');
    cy.percySnapshot('Fragments | Product Module | Multi-Retailers | Shop Selector');
  });
  it('Fragments | Product Module | Multi-Retailers + NOT SOLD OUT + Exclusive Retailer Selected', () => {
    cy.visit(
      'https://fragments.hsnb.io/fragments/preview/productModule?slug=vans-sk8-hi-reissue-cap-sneaker-pink-grey-white&sponsor=foot-locker-us',
      {
        auth: {
          username: Cypress.env('authUsername'),
          password: Cypress.env('authPassword'),
        },
      },
    );
    cy.get('img').should('be.visible');
    cy.get('[rel="noopener noreferrer"]').should('be.visible');
    cy.get('[rel="noopener noreferrer"]').contains('Buy at Foot Locker');
    cy.percySnapshot('Fragments | Product Module | Multi-Retailers + NOT SOLD OUT');
  });
  it('Fragments | Product Module | Multi-Retailers + Exclusive Retailer Selected and is SOLD OUT', () => {
    cy.visit(
      'https://fragments.hsnb.io/fragments/preview/productModule?slug=nike-mid-77-sneakers-white-grey-red&sponsor=ssense',
      {
        auth: {
          username: Cypress.env('authUsername'),
          password: Cypress.env('authPassword'),
        },
      },
    );
    cy.get('img').should('be.visible');
    cy.get('[rel="noopener noreferrer"]').contains('Sold Out at ssense');
    cy.percySnapshot('Fragments | Product Module | Multi-Retailers + SOLD OUT');
  });
  it('Fragments | Product Module | Foreign Currency', () => {
    cy.visit(
      'https://fragments.hsnb.io/fragments/preview/productModule?slug=aventus-cologne-uk&displayOriginalCurrency=1',
      {
        auth: {
          username: Cypress.env('authUsername'),
          password: Cypress.env('authPassword'),
        },
      },
    );
    cy.get('img').should('be.visible');
    cy.percySnapshot('Fragments | Product Module | Foreign Currency');
  });
});
