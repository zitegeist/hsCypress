const Chance = require('chance');
const chance = new Chance();

describe('Highsnobiety | Shop Home Tests', () => {
  before(() => {
    cy.setCookie('hs-gdpr-optin15022019v2', '0');
    cy.authVisit('/shop/');
  });
  it('Shop Home | Homepage Loads with Data', () => {
    cy.get('[class*="products-slider"]').should('not.be.empty');
    cy.get('[class*="campaignCarouselItem"]')
      .should('not.be.empty')
      .and('be.visible');
    cy.get('[class*="products-slider"]').should('not.be.empty');
    cy.get('[class*="campaignCarouselItem"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="campaignCard"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('footer')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="marketingStrip"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="medium"] > img').should('have.length.above', 0);
  });
  /* eslint-disable */
  it('Shop Home | Hero Banner Navigation', () => {
    Cypress.env('RETRIES', 2);
    cy.get('body').then($element => {
      if ($element.find('.flickity-button-icon').is(':visible')) {
        cy.get('.is-selected').should('be.visible');
        cy.get('.flickity-button-icon').should('be.visible');
        cy.get('.flickity-page-dots').should('be.visible');
        cy.get('.is-selected').should('be.visible');
        cy.get('.next > .flickity-button-icon').click();
        cy.get('.dot')
          .first()
          .should('not.have.class', 'is-selected');
        cy.get('.is-selected').as('selected');
        cy.get('.previous > .flickity-button-icon').click();
        cy.get('@selected').should('not.have.class', 'is-selected');
      }
    });
  });
  /* eslint-enable */
  it('Shop Home | EC-1578 | Editors Pick Button', () => {
    cy.contains('view all products')
      .should('not.be.empty')
      .and('be.visible');
    cy.contains('view all products').click();
    cy.url().should('contain', 'in-stock');
  });
  it('Shop Home | EC-1692 | Zendesk Widget Visibility', () => {
    cy.authVisit('/shop/');
    cy.viewport('macbook-11');
    cy.get('#launcher').should('be.visible');
  });
  it('Shop Home | EC-1814 | Newsletter Signup Successful', () => {
    const email = `${chance.guid()}@highsnobiety.com`;
    cy.authVisit('/shop/');
    cy.get('[class*="newsletterSignUp"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[type="email"]').type(email);
    cy.get('#subscribeBtn').click();
    cy.get('.error').should('not.be.visible');
    cy.get('[class*="successMessage"]')
      .should('be.visible')
      .and('not.be.empty');
  });
  it('Shop Home | EC-1856 | Hero Banner Clickable', () => {
    cy.authVisit('/shop/');
    cy.get('[href="https://www.hsnb.io/shop/product/MSMOODJA01/"]')
      .should('exist')
      .and('contain', 'Automation Test');
  });
  it('Shop Home | EC-1832 | Sitewide Marketing Strip', () => {
    cy.authVisit('/shop/');
    cy.get('[class*="marketingStrip"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.authVisit('/');
    cy.get('[class*="marketingStrip"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.authVisit('/c/chinatown-market-highsnobiety/');
    cy.get('[class*="marketingStrip"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.authVisit('/p/best-summer-sneakers/');
    cy.get('[class*="marketingStrip"]')
      .should('be.visible')
      .and('not.be.empty');
  });
});
