const Chance = require('chance');

const chance = new Chance();

const password = `${chance.guid()}!123JAY[^~`;

describe('Highsnobiety | Checkout | International Payments', () => {
  it('Checkout | International | UK', () => {
    cy.setCookie('ec_country_new', 'GB');
    cy.addToCart();
    cy.get('[class*="regularPrice"]').should('contain', '£490.00 GBP');
    cy.get('[class*="price"]').should('contain', '£490.00 GBP');
    cy.contains('checkout').click();
    cy.get('[href="/shop/checkout/account/signup/"]')
      .first()
      .click();
    cy.get('[name="email"]').type(`${chance.guid()}@highsnobiety.com`);
    cy.get('[name="password"]').type(password);
    cy.get('[type="submit"]').click();
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.fillInAddressForm({ formName: 'shippingAddress', country: 'United Kingdom' });
    cy.get('.close').click({ force: true });
    cy.get('[class*="shippingOption"]')
      .should('be.visible')
      .and('contain', 'Standard');
    cy.contains('Proceed to secure payment').click();
    cy.contains('Credit Card').click();
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.get('[class*="sidebar"]').contains('GBP');
    cy.get('[class*="sidebar"]').contains('FREE');
    cy.get('[class*="sidebar"]').contains('£490.00');
    cy.get('[class*="sidebar"]').contains('£490.00');
    cy.fillInCreditCardDetails({ cardNumber: Cypress.env('cardGeneric') });
    cy.contains('review and pay').click();
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.contains('Total recap')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="content"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="creditCardMask"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.contains('buy now').click({ force: true });
    cy.contains("We've got your order!")
      .should('be.visible')
      .and('exist');
    cy.contains('Check order status')
      .should('be.visible')
      .and('exist');
    cy.contains('My Orders')
      .should('be.visible')
      .and('exist');
    cy.get('[class*="header"]')
      .should('be.visible')
      .and('exist');
  });
  it('Checkout | International | JP', () => {
    cy.setCookie('ec_country_new', 'JP');
    cy.addToCart();
    cy.get('[class*="regularPrice"]').should('contain', '7,600,000 JPY');
    cy.get('[class*="price"]').should('contain', '7,600,000 JPY');
    cy.contains('checkout').click();
    cy.get('[href="/shop/checkout/account/signup/"]')
      .first()
      .click();
    cy.get('[name="email"]').type(`${chance.guid()}@highsnobiety.com`);
    cy.get('[name="password"]').type(password);
    cy.get('[type="submit"]').click();
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.get('[name="shippingAddress.firstName"]').type('Jay');
    cy.get('[name="shippingAddress.lastName"]').type("O'Neill");
    cy.get('[name="shippingAddress.country"]').select('Japan');
    cy.get('[class*="changeCountryButtons"] > [class*="primary"]').click();
    cy.get('[name="shippingAddress.streetName"]').type('Razteburger Strasse');
    cy.get('[name="shippingAddress.streetNumber"]').type('3', { force: true });
    cy.get('[name="shippingAddress.city"]').type('Berlin');
    cy.get('[name="shippingAddress.region"]').select('Kyoto');
    cy.get('[name="shippingAddress.postalCode"]').type('14050');
    cy.get('[name="shippingAddress.phone"]').type('07578209391');
    cy.get('[class*="input"]').should('be.visible');
    cy.get('[class*="label"]').should('contain', 'Standard');
    cy.get('.close').click({ force: true });
    cy.get('[class*="shippingOption"]')
      .should('be.visible')
      .and('contain', 'Standard');
    cy.contains('Proceed to secure payment').click();
    cy.contains('Credit Card').click();
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.get('[class*="sidebar"]').contains('JPY');
    cy.get('[class*="sidebar"]').contains('¥7,600,000');
    cy.get('[class*="sidebar"]').contains('FREE');
    cy.fillInCreditCardDetails({ cardNumber: Cypress.env('cardGeneric') });
    cy.contains('review and pay').click();
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.contains('Total recap')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="content"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="creditCardMask"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.contains('buy now').click({ force: true });
    cy.contains("We've got your order!")
      .should('be.visible')
      .and('exist');
    cy.contains('Check order status')
      .should('be.visible')
      .and('exist');
    cy.contains('My Orders')
      .should('be.visible')
      .and('exist');
    cy.get('[class*="header"]')
      .should('be.visible')
      .and('exist');
  });
  it('Checkout | International | US', () => {
    cy.setCookie('ec_country_new', 'US');
    cy.addToCart();
    cy.get('[class*="regularPrice"]').should('contain', '$620.00 USD');
    cy.get('[class*="price"]').should('contain', '$620.00 USD');
    cy.contains('checkout').click();
    cy.get('[href="/shop/checkout/account/signup/"]')
      .first()
      .click();
    cy.get('[name="email"]').type(`${chance.guid()}@highsnobiety.com`);
    cy.get('[name="password"]').type(password);
    cy.get('[type="submit"]').click();
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.get('[name="shippingAddress.firstName"]').type('Jay');
    cy.get('[name="shippingAddress.lastName"]').type("O'Neill");
    cy.get('[name="shippingAddress.country"]').select('United States');
    cy.get('[class*="changeCountryButtons"] > [class*="primary"]').click();
    cy.get('[name="shippingAddress.streetName"]').type('Razteburger Strasse');
    cy.get('[name="shippingAddress.streetNumber"]').type('3', { force: true });
    cy.get('[name="shippingAddress.city"]').type('Berlin');
    cy.get('[name="shippingAddress.region"]').select('California');
    cy.get('[name="shippingAddress.postalCode"]').type('90210');
    cy.get('[name="shippingAddress.phone"]').type('07578209391');
    cy.get('[class*="input"]').should('be.visible');
    cy.get('[class*="label"]').should('contain', 'Standard');
    cy.get('.close').click({ force: true });
    cy.get('[class*="shippingOption"]')
      .should('be.visible')
      .and('contain', 'Standard');
    cy.contains('Proceed to secure payment').click();
    cy.contains('Credit Card').click();
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.get('[class*="sidebar"]').contains('USD');
    cy.get('[class*="sidebar"]').contains('$620.00');
    cy.get('[class*="sidebar"]').contains('FREE');
    cy.get('[class*="sidebar"]').contains('$620.00');
    cy.fillInCreditCardDetails({ cardNumber: Cypress.env('cardGeneric') });
    cy.contains('review and pay').click();
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.contains('Total recap')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="content"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="creditCardMask"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.contains('buy now').click({ force: true });
    cy.contains("We've got your order!")
      .should('be.visible')
      .and('exist');
    cy.contains('Check order status')
      .should('be.visible')
      .and('exist');
    cy.contains('My Orders')
      .should('be.visible')
      .and('exist');
    cy.get('[class*="header"]')
      .should('be.visible')
      .and('exist');
  });
  it('Checkout | International | US | EC-1782 | Empty Space as Street Number', () => {
    cy.setCookie('ec_country_new', 'US');
    cy.addToCart();
    cy.get('[class*="regularPrice"]').should('contain', '$620.00 USD');
    cy.get('[class*="price"]').should('contain', '$620.00 USD');
    cy.contains('checkout').click();
    cy.get('[href="/shop/checkout/account/signup/"]')
      .first()
      .click();
    cy.get('[name="email"]').type(`${chance.guid()}@highsnobiety.com`);
    cy.get('[name="password"]').type(password);
    cy.get('[type="submit"]').click();
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.get('[name="shippingAddress.firstName"]').type('Jay');
    cy.get('[name="shippingAddress.lastName"]').type("O'Neill");
    cy.get('[name="shippingAddress.country"]').select('United States');
    cy.get('[class*="changeCountryButtons"] > [class*="primary"]').click();
    cy.get('[name="shippingAddress.streetName"]').type('Razteburger Strasse');
    cy.get('[name="shippingAddress.streetNumber"]').type(' ', { force: true });
    cy.get('[name="shippingAddress.city"]').type('Berlin');
    cy.get('[name="shippingAddress.region"]').select('California');
    cy.get('[class*="streetNumber"] > [class*="container"] > [class*="box"] > .message')
      .should('be.visible')
      .and('contain', 'required');
    cy.get('[name="shippingAddress.postalCode"]').type('90210');
    cy.get('[name="shippingAddress.phone"]').type('07578209391');
    cy.get('[class*="input"]').should('be.visible');
    cy.get('[class*="label"]').should('contain', 'Standard');
    cy.get('.close').click({ force: true });
    cy.get('[class*="shippingOption"]')
      .should('be.visible')
      .and('contain', 'Standard');
    cy.contains('Proceed to secure payment').click();
    cy.contains('Credit Card').should('not.exist');
  });
  it('Checkout | International | US | EC-1130 | Invalid Postcode Error', () => {
    cy.setCookie('ec_country_new', 'US');
    cy.addToCart();
    cy.get('[class*="regularPrice"]').should('contain', '$620.00 USD');
    cy.get('[class*="price"]').should('contain', '$620.00 USD');
    cy.contains('checkout').click();
    cy.get('[href="/shop/checkout/account/signup/"]')
      .first()
      .click();
    cy.get('[name="email"]').type(`${chance.guid()}@highsnobiety.com`);
    cy.get('[name="password"]').type(password);
    cy.get('[type="submit"]').click();
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.get('[name="shippingAddress.firstName"]').type('Jay');
    cy.get('[name="shippingAddress.lastName"]').type("O'Neill");
    cy.get('[name="shippingAddress.country"]').select('United States');
    cy.get('[class*="changeCountryButtons"] > [class*="primary"]').click();
    cy.get('[name="shippingAddress.streetName"]').type('Razteburger Strasse');
    cy.get('[name="shippingAddress.streetNumber"]').type('3', { force: true });
    cy.get('[name="shippingAddress.city"]').type('Berlin');
    cy.get('[name="shippingAddress.region"]').select('California');
    cy.get('[name="shippingAddress.postalCode"]').type('12212310');
    cy.get('[name="shippingAddress.phone"]').type('07578209391');
    cy.get('[class*="input"]').should('be.visible');
    cy.get('[class*="label"]').should('contain', 'Standard');
    cy.get('.close').click({ force: true });
    cy.get('[class*="shippingOption"]')
      .should('be.visible')
      .and('contain', 'Standard');
    cy.contains('Proceed to secure payment').click();
    cy.get('[class*="formError"]')
      .should('be.visible')
      .and('contain', 'ZIP code');
  });
  it('Checkout | International | ROW', () => {
    cy.setCookie('ec_country_new', 'KR');
    cy.addToCart();
    cy.get('[class*="regularPrice"]').should('contain', '$620.00 USD');
    cy.get('[class*="price"]').should('contain', '$620.00 USD');
    cy.contains('checkout').click();
    cy.get('[href="/shop/checkout/account/signup/"]')
      .first()
      .click();
    cy.get('[name="email"]').type(`${chance.guid()}@highsnobiety.com`);
    cy.get('[name="password"]').type(password);
    cy.get('[type="submit"]').click();
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.fillInAddressForm({ formName: 'shippingAddress', country: 'Korea, South (South Korea)' });
    cy.get('.close').click({ force: true });
    cy.get('[class*="shippingOption"]')
      .should('be.visible')
      .and('contain', 'Standard');
    cy.contains('Proceed to secure payment').click();
    cy.contains('Credit Card').click();
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.get('[class*="sidebar"]').contains('USD');
    cy.get('[class*="sidebar"]').contains('$620.00');
    cy.get('[class*="sidebar"]').contains('$25.00');
    cy.get('[class*="sidebar"]').contains('$645.00');
    cy.fillInCreditCardDetails({ cardNumber: Cypress.env('cardGeneric') });
    cy.contains('review and pay').click();
    cy.get('[class*="productName"]')
      .should('be.visible')
      .and('contain', 'Test | Single Variant');
    cy.contains('Total recap')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="content"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="creditCardMask"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.contains('buy now').click({ force: true });
    cy.contains("We've got your order!")
      .should('be.visible')
      .and('exist');
    cy.contains('Check order status')
      .should('be.visible')
      .and('exist');
    cy.contains('My Orders')
      .should('be.visible')
      .and('exist');
    cy.get('[class*="header"]')
      .should('be.visible')
      .and('exist');
  });
});
