const Chance = require('chance');
const chance = new Chance();
const password = `${chance.guid()}!123JAY[^~`;

describe('Highsnobiety | Checkout | Bugs', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.setCookie('ec_country_new', 'DE');
    cy.setCookie('hs-gdpr-optin15022019v2', '1');
    cy.addToCart();
    cy.contains('checkout').click();
  });
  it('Checkout | Bug | Shipping Field Error when Merging Carts', () => {
    const email = `${chance.guid()}@highsnobiety.com`;
    cy.get('[href="/shop/checkout/account/signup/"]')
      .first()
      .click();
    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type(password);
    cy.get('[type="submit"]').click();
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.get('.close').click({ force: true });
    cy.fillInAddressForm({ formName: 'shippingAddress', country: 'Germany' });
    cy.authVisit('/account/details/');
    cy.get('[name="firstName"]').should('be.visible');
    cy.contains('Log out').click();
    cy.get('[name="email"]').should('be.visible');
    cy.authVisit('/shop/product/MSMOODJA01/');
    cy.get('[name="shipping.country"]')
      .invoke('val')
      .should('eq', 'DE');
    cy.get('[name="dropdown"]').select('EU  35');
    cy.get('.addToCart')
      .first()
      .click();
    cy.contains('checkout').click();
    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type(password);
    cy.get('[type="submit"]').click();
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.get('[class*="shippingOption"]')
      .should('be.visible')
      .and('contain', 'Standard');
    cy.get('[class*="quantity"]')
      .should('be.visible')
      .and('contain', '1');
    cy.authVisit('/account/details/');
    cy.get('[name="firstName"]').should('be.visible');
    cy.contains('Log out').click();
  });
  it('Checkout | Bug | Shipping Field Error when Merging Carts | Different Currencies', () => {
    const email = `${chance.guid()}@highsnobiety.com`;
    cy.get('[href="/shop/checkout/account/signup/"]')
      .first()
      .click();
    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type(password);
    cy.get('[type="submit"]').click();
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.get('.close').click({ force: true });
    cy.fillInAddressForm({ formName: 'shippingAddress', country: 'Germany' });
    cy.authVisit('/account/details/');
    cy.get('[name="firstName"]').should('be.visible');
    cy.contains('Log out').click();
    cy.get('[name="email"]').should('be.visible');
    cy.authVisit('/shop/product/MSMOODJA01/');
    cy.get('[name="shipping.country"]')
      .invoke('val')
      .should('eq', 'DE');
    cy.get('[name="shipping.country"]').select('United States');
    cy.contains('Confirm country change').click();
    cy.get('[name="shipping.country"]')
      .invoke('val')
      .should('eq', 'US');
    cy.get('[class*="regularPrice"]').should('contain', '$');
    cy.get('[name="dropdown"]').select('EU  35');
    cy.get('.addToCart')
      .first()
      .click();
    cy.contains('checkout').click();
    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type(password);
    cy.get('[type="submit"]').click();
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.get('[class*="shippingOption"]')
      .should('be.visible')
      .and('contain', 'Standard');
    cy.get('[class*="quantity"]')
      .should('be.visible')
      .and('contain', '1');
  });
  it.skip('Checkout | Bug | EC-1498 | Bag to Checkout failure', () => {
    cy.authVisit('/shop/');
    cy.get('.shop-frontpage-new-button')
      .first()
      .click();
    cy.get('[class*="productCard"]')
      .first()
      .click();
    cy.get('select[name="dropdown"]').selectNth(1);
    cy.get('.addToCart').should('not.be.disabled');
    cy.get('.addToCart')
      .first()
      .click();
    cy.contains('checkout').should('be.visible');
    cy.get('[href="/shop/cart/"]').should('contain', 2);
    cy.get('[href="/shop/cart/"]').click();
    cy.get('[name="shipping.country"]')
      .invoke('val')
      .should('eq', 'DE');
    cy.contains('checkout').click();
    cy.get('[class*="signInForm"]').should('be.visible');
  });
  it('Checkout | Bug | EC-1110 | Clicking Checkout button multiple times', () => {
    const email = `${chance.guid()}@highsnobiety.com`;
    cy.get('[href="/shop/checkout/account/signup/"]')
      .first()
      .click();
    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type(password);
    cy.get('[type="submit"]').click();
    cy.get('button > [class*="icon"]').click();
    cy.fillInAddressForm({ formName: 'shippingAddress', country: 'Germany' });
    cy.contains('Proceed to secure payment').click();
    cy.get('[type="submit"]').should('be.disabled');
    cy.contains('Credit Card').should('be.visible');
  });
  it('Checkout | Bug | EC-1813 | Credit card selected by default', () => {
    const email = `${chance.guid()}@highsnobiety.com`;
    cy.get('[href="/shop/checkout/account/signup/"]')
      .first()
      .click();
    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type(password);
    cy.get('[type="submit"]').click();
    cy.get('button > [class*="icon"]').click();
    cy.fillInAddressForm({ formName: 'shippingAddress', country: 'Germany' });
    cy.contains('Proceed to secure payment').click();
    cy.get('[value="creditcard"]').should('be.checked');
  });
});
