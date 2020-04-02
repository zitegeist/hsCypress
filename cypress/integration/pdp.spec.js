describe('Highsnobiety | Product Page Tests', () => {
  before(() => {
    cy.setCookie('ec_country_new', 'DE');
    cy.authVisit('/shop/product/OTSH0031XX/');
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
    cy.get('[class*="regularPrice"]').should('contain', 'EUR');
    cy.get('[class*="details"] > [class*="title"]').should('not.be.empty');
    cy.get('[class*="details"] > [class*="productPrice"]').should('not.be.empty');
    cy.percySnapshot('Snapshot | PDP | Generic', {
      percyCSS: `div[class*="marketingStrip"] { display: none; }`,
    });
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
  it('Product Page | EC1465 | Repeating Related Products', () => {
    cy.get('[class*="productGrid-slider"] > [class*="products"]')
      .should('be.visible')
      .and('not.be.empty');
    // eslint-disable-next-line func-names
    cy.get('[class*="productCard"]').each(function(image) {
      const text = image.text();
      cy.get('[class*="productCard"]')
        .first()
        .click();
      cy.get('[class*="productCard"]')
        .invoke('text')
        .should('not.contain', text);
    });
  });
  it('Product Page | Upcoming Product', () => {
    cy.authVisit('/shop/product/RSMOODJA03/');
    cy.get('[class*=".addToCart"]').should('not.exist');
    cy.get('[class*="regularPrice"]').should('contain', 'EUR');
    cy.percySnapshot('Snapshot | PDP | Upcoming', {
      percyCSS: `div[class*="marketingStrip"] { display: none; }`,
    });
    cy.get('[class*="action"] > [class*="button"]')
      .should('be.visible')
      .and('contain', 'Notify me');
    cy.get('[class*="action"] > [class*="button"]').click();
    cy.get('aside').should('be.visible');
    cy.contains('Never miss a drop')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[name="email"]').should('be.visible');
  });
  it('Product Page | Sold Out Product', () => {
    cy.authVisit('/shop/product/OTSH0061SS/');
    cy.get('[class*="regularPrice"]').should('contain', 'EUR');
    cy.get('[class*="button"]').should('be.disabled');
    cy.percySnapshot('Snapshot | PDP | Sold Out', {
      percyCSS: `div[class*="marketingStrip"] { display: none; }`,
    });
  });
  it('Product Page | Single Inventory Product | EC-1524', () => {
    cy.authVisit('/shop/product/prada-nylonjacket-NJMOODJA01/');
    cy.get('[name="shipping.country"]').should('contain', 'Germany');
    cy.get('[name="dropdown"]').select('44');
    cy.get('.addToCart').should('not.be.disabled');
    cy.get('.addToCart')
      .first()
      .click();
    cy.contains('checkout').should('be.visible');
    cy.get('[class*="closeButton"]')
      .first()
      .click();
    cy.get('.addToCart')
      .first()
      .click();
    cy.get('[class*="error"]')
      .should('be.visible')
      .and('contain', 'The product is not available');
  });
  describe('Product Detail | Gallery', () => {
    Cypress.env('RETRIES', 2);
    before(() => {
      cy.get('[class*="imagesBlock"] > #pdp_image_zoom_0').click();
    });
    it('Product Detail | Gallery | Open Gallery', () => {
      cy.get('#pdp_image_zoom-fullscreen_0')
        .should('exist')
        .and('be.visible');
    });
    it('Product Detail | Gallery | Close Gallery', () => {
      cy.get('#pdp-fullscreen-closeCross').click();
      cy.get('#pdp_image_zoom-fullscreen_0').should('not.be.visible');
      cy.get('[class*="imagesBlock"] > #pdp_image_zoom_0').click();
    });

    it('Product Detail | Gallery | Zoom in', () => {
      cy.get('[class*="zoomedIn"]')
        .should('not.exist')
        .and('not.be.visible');
      cy.get('#pdp_image_zoom-fullscreen_0').click();
      cy.get('[class*="zoomedIn"]')
        .should('exist')
        .and('be.visible');
      cy.get('#pdp_image_zoom-fullscreen_0').click();
    });
    it('Product Detail | Gallery | Zoom out', () => {
      cy.get('#pdp_image_zoom-fullscreen_0').click();
      cy.get('[class*="zoomedIn"]')
        .should('exist')
        .and('visible');
      cy.get('#pdp_image_zoom-fullscreen_0').click();
      cy.get('[class*="zoomedIn"]')
        .should('not.exist')
        .and('not.be.visible');
    });
  });
  describe('Product Detail | Gallery | Navigation', () => {
    Cypress.env('RETRIES', 2);
    before(() => {
      cy.authVisit('/shop/product/MSMOODJA01/');
      cy.get('[class*="imagesBlock"] > #pdp_image_zoom_0').click();
    });
    it('Product Detail | Gallery | Navigate Forward by BUTTON', () => {
      cy.get('[class*="nav-right"]').click();
      cy.get('#pdp_image_zoom-fullscreen_1')
        .should('exist')
        .and('be.visible');
    });
    it('Product Detail | Gallery | Navigate Backward by BUTTON', () => {
      cy.get('[class*="nav-left"]').click();
      cy.get('#pdp_image_zoom-fullscreen_0')
        .should('exist')
        .and('not.be.visible');
      cy.get('#pdp_image_zoom-fullscreen_1')
        .should('exist')
        .and('not.be.visible');
    });
    it('Product Detail | Gallery | Navigate Forward by KEYS', () => {
      cy.get('body').type('{rightarrow}');
      cy.get('#pdp_image_zoom-fullscreen_1')
        .should('exist')
        .and('be.visible');
    });
    it('Product Detail | Gallery | Navigate Backward by KEYS', () => {
      cy.get('body').type('{leftarrow}');
      cy.get('#pdp_image_zoom-fullscreen_0')
        .should('exist')
        .and('not.be.visible');
      cy.get('#pdp_image_zoom-fullscreen_1')
        .should('exist')
        .and('not.be.visible');
    });
    it('Product Detail | Gallery | Navigate Backward Multiple Times', () => {
      cy.authVisit('/shop/product/MSMOODJA01/');
      cy.get('[class*="imagesBlock"] > #pdp_image_zoom_0').click();
      cy.get('#pdp_image_zoom-fullscreen_0')
        .should('exist')
        .and('be.visible');
      cy.get('[class*="nav-left"]').click();
      cy.get('#pdp_image_zoom-fullscreen_3')
        .should('exist')
        .and('not.be.visible');
      cy.get('[class*="nav-left"]').click();
      cy.get('#pdp_image_zoom-fullscreen_2')
        .should('exist')
        .and('not.be.visible');
      cy.get('[class*="nav-left"]').click();
      cy.get('#pdp_image_zoom-fullscreen_1')
        .should('exist')
        .and('not.be.visible');
    });
    it('Product Detail | Gallery | Navigate Forward Multiple Times', () => {
      cy.authVisit('/shop/product/MSMOODJA01/');
      cy.get('[class*="imagesBlock"] > #pdp_image_zoom_0').click();
      cy.get('[class*="nav-right"]').click();
      cy.get('#pdp_image_zoom-fullscreen_1')
        .should('exist')
        .and('be.visible');
      cy.get('[class*="nav-right"]').click();
      cy.get('#pdp_image_zoom-fullscreen_2')
        .should('exist')
        .and('be.visible');
      cy.get('[class*="nav-right"]').click();
      cy.get('#pdp_image_zoom-fullscreen_3')
        .should('exist')
        .and('be.visible');
      cy.get('[class*="nav-right"]').click();
      cy.get('#pdp_image_zoom-fullscreen_4')
        .should('exist')
        .and('be.visible');
      cy.get('[class*="nav-right"]').click();
      cy.get('#pdp_image_zoom-fullscreen_0')
        .should('exist')
        .and('be.visible');
    });
  });
});
