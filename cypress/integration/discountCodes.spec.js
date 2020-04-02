describe('Highsnobiety | Discount Tests', () => {
  beforeEach(() => {
    cy.authVisit('/shop/cart/');
    cy.addToCartStub('en', 'DE', 'MSMOODJA01');
    cy.reload();
  });
  it('Cart | Discounts | Percentage Discount', () => {
    cy.get('[class*="ctaPromoCode"]').click();
    cy.get('[name="code"]').type('JAY43');
    cy.get('[type="submit"]').click();
    cy.contains('Jay Test 43%').should('be.visible');
    cy.contains('–€223.60 EUR').should('be.visible');
    cy.contains('€296.40 EUR').should('be.visible');
  });
  it('Cart | Discounts | 100% Discount', () => {
    cy.get('[class*="ctaPromoCode"]').click();
    cy.get('[name="code"]').type('DISCOUNT100');
    cy.get('[type="submit"]').click();
    cy.contains('100 Percent Discount').should('be.visible');
    cy.contains('–€520.00 EUR').should('be.visible');
    cy.contains('€0.00 EUR').should('be.visible');
  });
  it('Cart | Discounts | 100% Absolute Discount', () => {
    cy.get('[class*="ctaPromoCode"]').click();
    cy.get('[name="code"]').type('JAYABSOLUTE');
    cy.get('[type="submit"]').click();
    cy.contains('Jay Absolute').should('be.visible');
    cy.contains('–€520.00 EUR').should('be.visible');
    cy.contains('€0.00 EUR').should('be.visible');
  });
  it('Cart | Discounts | One Use Discount', () => {
    cy.get('[class*="ctaPromoCode"]').click();
    cy.get('[name="code"]').type('JAY1USE');
    cy.get('[type="submit"]').click();
    cy.contains('Jay 20% One Use Per Customer').should('be.visible');
    cy.contains('–€104.00 EUR').should('be.visible');
    cy.contains('€416.00 EUR').should('be.visible');
  });
  it('Cart | Discounts | €50 Absolute Discount', () => {
    cy.get('[class*="ctaPromoCode"]').click();
    cy.get('[name="code"]').type('ABSOLUTE50');
    cy.get('[type="submit"]').click();
    cy.contains('50 Euro Absolute').should('be.visible');
    cy.contains('–€50.00 EUR').should('be.visible');
    cy.contains('€470.00 EUR').should('be.visible');
  });
  it('Cart | Discounts | Invalid Code', () => {
    cy.get('[class*="ctaPromoCode"]').click();
    cy.get('[name="code"]').type('NOT-A-CODE');
    cy.get('[type="submit"]').click();
    cy.get('[class*="error"]').should('be.visible');
    cy.contains('Please use a valid promo code').should('be.visible');
  });
});
