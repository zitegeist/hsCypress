describe('Highsnobiety | Bag Page Tests | Stubbed', () => {
  beforeEach(() => {
    cy.authVisit('/shop/cart/');
    cy.addToCartStub('en', 'DE', 'MSMOODJA01');
    cy.reload();
  });
  it('Bag Page | Check Data', () => {
    cy.get('[class*="isDesktop"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="header"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.contains('Order summary')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="productSize"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="quantity"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="removeButton"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="regularPrice"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('img').should('be.visible');
    cy.get('[class*="description"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get(':nth-child(1) > [class*="price"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="total"] > [class*="description"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="total"] > [class*="price"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="checkoutButtonWrapper"] > [class*="button"]')
      .should('be.visible')
      .and('not.be.empty');
  });
  it('Bag Page | Change Quantities', () => {
    cy.get('[class*="plusMinusButton"]').should('be.visible');
    cy.get('[class*="plusMinusButton"]').should('have.attr', 'disabled');
    cy.get('[class*="quantity"]').should('contain', 1);
    cy.get('[class*="quantityPanel"]  > :nth-child(3)').click();
    cy.get('[class*="quantity"]').should('contain', 2);
    cy.get('[class*="plusMinusButton"]').should('not.have.attr', 'disabled');
    cy.get('[class*="plusMinusButton"]')
      .first()
      .click();
    cy.get('[class*="quantity"]').should('contain', 1);
    cy.get('[class*="plusMinusButton"]').should('have.attr', 'disabled');
  });
  it('Bag Page | Price Calculations', () => {
    cy.get(':nth-child(1) > [class*="price"]').should('contain', 520);
    cy.get('[class*="total"] > [class*="price"]').should('contain', 520);
    cy.get('[class*="plusMinusButton"]')
      .eq(1)
      .click();
    cy.get(':nth-child(1) > [class*="price"]').should('contain', '1,040');
    cy.get('[class*="total"] > [class*="price"]').should('contain', '1,040');
    cy.get('[class*="plusMinusButton"]')
      .eq(1)
      .click();
    cy.get(':nth-child(1) > [class*="price"]').should('contain', '1,560');
    cy.get('[class*="total"] > [class*="price"]').should('contain', '1,560');
    cy.get('[class*="plusMinusButton"]')
      .first()
      .click();
    cy.get(':nth-child(1) > [class*="price"]').should('contain', '1,040');
    cy.get('[class*="total"] > [class*="price"]').should('contain', '1,040');
    cy.get('[class*="plusMinusButton"]')
      .first()
      .click();
    cy.get(':nth-child(1) > [class*="price"]').should('contain', 520);
    cy.get('[class*="total"] > [class*="price"]').should('contain', 520);
  });
  it('Bag Page | Price Verification', () => {
    cy.authVisit('/shop/product/MSMOODJA01/');
    cy.get('[name="shipping.country"]')
      .invoke('val')
      .should('eq', 'DE');
    cy.get('[class*="regularPrice"]').should('contain', 520);
    cy.get('[href="/shop/cart/"]').click();
    cy.get(':nth-child(1) > [class*="price"]').should('contain', 520);
    cy.get('[class*="total"] > [class*="price"]').should('contain', 520);
  });
});

describe('Highsnobiety | Bag Page Tests | Non-Stubbed', () => {
  it('Bag Page | Remove Item | EC-1705', () => {
    cy.authVisit('/shop/product/MSMOODJA01/');
    cy.addToCart();
    cy.get('[class*="productName"]').should('be.visible');
    cy.get('[class*="removeButton"]')
      .first()
      .click();
    cy.get('[class*="emptyCart"]')
      .should('be.visible')
      .and('not.be.empty');
  });
});

describe('Bag Page | Currency calculations', () => {
  it('Bag Page | International | GB', () => {
    cy.authVisit('/shop/cart/');
    cy.addToCartStub('en', 'GB', 'MSMOODJA01');
    cy.reload();
    cy.get(':nth-child(1) > [class*="price"]').should('contain', '£', 490);
    cy.get('[class*="total"] > [class*="price"]').should('contain', 490);
    cy.get('[class*="plusMinusButton"]')
      .eq(1)
      .click();
    cy.get(':nth-child(1) > [class*="price"]').should('contain', 980);
    cy.get('[class*="total"] > [class*="price"]').should('contain', 980);
    cy.get('[class*="plusMinusButton"]')
      .eq(1)
      .click();
    cy.get(':nth-child(1) > [class*="price"]').should('contain', '1,470');
    cy.get('[class*="total"] > [class*="price"]').should('contain', '1,470');
    cy.get('[class*="plusMinusButton"]')
      .first()
      .click();
    cy.get(':nth-child(1) > [class*="price"]').should('contain', 980);
    cy.get('[class*="total"] > [class*="price"]').should('contain', 980);
    cy.get('[class*="plusMinusButton"]')
      .first()
      .click();
    cy.get(':nth-child(1) > [class*="price"]').should('contain', 490);
    cy.get('[class*="total"] > [class*="price"]').should('contain', 490);
  });
  it('Bag Page | International | US', () => {
    cy.authVisit('/shop/cart/');
    cy.addToCartStub('en', 'US', 'MSMOODJA01');
    cy.reload();
    cy.get(':nth-child(1) > [class*="price"]').should('contain', '$', 620.0);
    cy.get('[class*="total"] > [class*="price"]').should('contain', 620.0);
    cy.get('[class*="plusMinusButton"]')
      .eq(1)
      .click();
    cy.get(':nth-child(1) > [class*="price"]').should('contain', '1,240.00');
    cy.get('[class*="total"] > [class*="price"]').should('contain', '1,240.00');
    cy.get('[class*="plusMinusButton"]')
      .eq(1)
      .click();
    cy.get(':nth-child(1) > [class*="price"]').should('contain', '1,860');
    cy.get('[class*="total"] > [class*="price"]').should('contain', '1,860');
    cy.get('[class*="plusMinusButton"]')
      .first()
      .click();
    cy.get(':nth-child(1) > [class*="price"]').should('contain', '1,240.00');
    cy.get('[class*="total"] > [class*="price"]').should('contain', '1,240.00');
    cy.get('[class*="plusMinusButton"]')
      .first()
      .click();
    cy.get(':nth-child(1) > [class*="price"]').should('contain', 620.0);
    cy.get('[class*="total"] > [class*="price"]').should('contain', 620.0);
  });
  it('Bag Page | International | JP', () => {
    cy.authVisit('/shop/cart/');
    cy.addToCartStub('en', 'JP', 'MSMOODJA01');
    cy.reload();
    cy.get(':nth-child(1) > [class*="price"]').should('contain', '7,600,000 JPY');
    cy.get('[class*="total"] > [class*="price"]').should('contain', '7,600,000 JPY');
    cy.get('[class*="plusMinusButton"]')
      .eq(1)
      .click();
    cy.get(':nth-child(1) > [class*="price"]').should('contain', '¥15,200,000 JPY');
    cy.get('[class*="total"] > [class*="price"]').should('contain', '¥15,200,000 JPY');
    cy.get('[class*="plusMinusButton"]')
      .eq(1)
      .click();
    cy.get(':nth-child(1) > [class*="price"]').should('contain', '¥22,800,000 JPY');
    cy.get('[class*="total"] > [class*="price"]').should('contain', '¥22,800,000 JPY');
    cy.get('[class*="plusMinusButton"]')
      .first()
      .click();
    cy.get(':nth-child(1) > [class*="price"]').should('contain', '¥15,200,000 JPY');
    cy.get('[class*="total"] > [class*="price"]').should('contain', '¥15,200,000 JPY');
    cy.get('[class*="plusMinusButton"]')
      .first()
      .click();
    cy.get(':nth-child(1) > [class*="price"]').should('contain', '7,600,000 JPY');
    cy.get('[class*="total"] > [class*="price"]').should('contain', '7,600,000 JPY');
  });
  it('Bag Page | International | ROW', () => {
    cy.authVisit('/shop/cart/');
    cy.addToCartStub('en', 'KR', 'MSMOODJA01');
    cy.reload();
    cy.get(':nth-child(1) > [class*="price"]').should('contain', '$', 620.0);
    cy.get('[class*="total"] > [class*="price"]').should('contain', 620.0);
    cy.get('[class*="plusMinusButton"]')
      .eq(1)
      .click();
    cy.get(':nth-child(1) > [class*="price"]').should('contain', '1,240.00');
    cy.get('[class*="total"] > [class*="price"]').should('contain', '1,240.00');
    cy.get('[class*="plusMinusButton"]')
      .eq(1)
      .click();
    cy.get(':nth-child(1) > [class*="price"]').should('contain', '1,860');
    cy.get('[class*="total"] > [class*="price"]').should('contain', '1,860');
    cy.get('[class*="plusMinusButton"]')
      .first()
      .click();
    cy.get(':nth-child(1) > [class*="price"]').should('contain', '1,240.00');
    cy.get('[class*="total"] > [class*="price"]').should('contain', '1,240.00');
    cy.get('[class*="plusMinusButton"]')
      .first()
      .click();
    cy.get(':nth-child(1) > [class*="price"]').should('contain', 620.0);
    cy.get('[class*="total"] > [class*="price"]').should('contain', 620.0);
  });
});
