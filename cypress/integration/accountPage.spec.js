import activateUserHelper from '../helpers/activateUserHelper';
const Chance = require('chance');

const chance = new Chance();

const guid = chance.guid();
const emailGood = `${chance.guid()}@highsnobiety.com`;
const emailBad = `${chance.guid()}highsnobiety.com`;
const passwordGood = `${chance.guid()}!123JAY[^~`;
const passwordBad = chance.guid();
const captchaEmail = `${chance.guid()}@highsnobiety.com`;
const captchaPassword = `${chance.guid()}!123JAY[^~`;

describe('Highsnobiety | Account Tests', () => {
  it('Account | Registration | Good Data', () => {
    cy.authVisit('/account/signup/');
    cy.get('[name="email"]').type(emailGood);
    cy.get('[name="password"]').type(passwordGood);
    cy.get('[type="submit"]').click();
    cy.contains('Personal information').should('be.visible');
    cy.url().should('contain', '/account/details/');
  });
  it('Account | Registration | Bad Password', () => {
    cy.authVisit('/account/signup/');
    cy.get('[name="email"]').type(emailGood);
    cy.get('[name="password"]').type(passwordBad);
    cy.get('[type="submit"]').click();
    cy.contains('Personal information').should('not.be.visible');
    cy.url().should('not.contain', '/account/details/');
    cy.get('.message')
      .should('be.visible')
      .and('contain', 'Use 8 or more');
  });
  it('Account | Registration | Bad Email', () => {
    cy.authVisit('/account/signup/');
    cy.get('[name="email"]').type(emailBad);
    cy.get('[name="password"]').type(passwordGood);
    cy.get('[type="submit"]').click();
    cy.contains('Personal information').should('not.be.visible');
    cy.url().should('not.contain', '/account/details/');
    cy.get('.message')
      .should('be.visible')
      .and('contain', 'valid email');
  });
  it('Account | Registration | Bad Email, Bad Password', () => {
    cy.authVisit('/account/signup/');
    cy.get('[name="email"]').type(emailBad);
    cy.get('[name="password"]').type(passwordBad);
    cy.get('[type="submit"]').click();
    cy.contains('Personal information').should('not.be.visible');
    cy.url().should('not.contain', '/account/details/');
    cy.get('.message').should('have.length', 2);
    cy.get('.message')
      .first()
      .should('be.visible')
      .and('contain', 'valid email');
    cy.get('.message')
      .eq(1)
      .should('be.visible')
      .and('contain', 'Use 8 or more');
  });
  it('Account | Registration | Confirm Creation', () => {
    const testMail = `${chance.guid()}@highsnobiety.com`;
    const testPass = `${chance.guid()}!123JAY[^~`;

    cy.authVisit('/account/signup/');
    cy.get('[name="email"]').type(testMail);
    cy.get('[name="password"]').type(testPass);
    cy.get('[name="marketingConsent"]').should('not.be.checked');
    cy.get('[type="submit"]').click();
    cy.contains('Personal information').should('be.visible');
    cy.url().should('contain', '/account/details/');
    cy.get('[class*="loggedInAs"]').should('contain', testMail);
    cy.contains('Log out').click();
    cy.get('[name="email"]').should('be.visible');
    cy.get('[href="/shop/"]').click();
    cy.get('[class*="campaignCarouselItem"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[href="/account/details/"]').click();
    cy.get('[name="email"]').should('be.visible');
    cy.get('[name="email"]').type(testMail);
    cy.get('[name="password"]').type(testPass);
    cy.get('[type="submit"]').click();
    cy.get('[class*="loggedInAs"]').should('contain', testMail);
    cy.contains('Log out').should('be.visible');
  });
  it('Account | Change Names', () => {
    cy.authVisit('/account/login');
    cy.login();
    cy.get('[name="firstName"]').clear();
    cy.get('[name="firstName"]').type(guid);
    cy.get('[name="lastName"]').clear();
    cy.get('[name="lastName"]').type(guid);
    cy.contains('Save changes').click();
    cy.get('[class*="notification"]')
      .should('be.visible')
      .and('contain', 'updated');
    cy.contains('Log out').click();
    cy.get('[class*="signInForm"').should('be.visible');
    cy.login();
    cy.get('[name="firstName"]').should('have.attr', 'value', guid);
    cy.get('[name="lastName"]').should('have.attr', 'value', guid);
  });
  it('Account | Customer Care Form ', () => {
    cy.authVisit('/account/login');
    cy.login();
    cy.get('[href="/customer-service/"]').click();
    cy.get('.headline-element')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[class*="wufoo"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('iframe').should('be.visible');
    cy.get('[type="email"]')
      .should('exist')
      .and('be.empty');
  });
  it('Account | Login | Trigger Captcha', () => {
    cy.authVisit('/account/signup/');
    cy.get('[name="email"]').type(captchaEmail);
    cy.get('[name="password"]').type(captchaPassword);
    cy.get('[name="marketingConsent"]').should('not.be.checked');
    cy.get('[type="submit"]').click();
    cy.contains('Personal information').should('be.visible');
    cy.url().should('contain', '/account/details/');
    cy.get('[class*="loggedInAs"]').should('contain', captchaEmail);
    cy.contains('Log out').click();
    cy.get('[name="email"]').should('be.visible');
    cy.get('[href="/shop/"]').click();
    cy.get('[class*="campaignCarouselItem"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[href="/account/details/"]').click();
    cy.get('[name="email"]').should('be.visible');
    cy.get('[name="email"]').type(captchaEmail);
    cy.get('[name="password"]')
      .clear()
      .type('wrongPassword');
    cy.get('button')
      .contains('Log in')
      .click();
    cy.get('[class*="formError"]')
      .should('be.visible')
      .and('contain', 'Invalid email');
    cy.get('[name="email"]')
      .clear()
      .type(captchaEmail);
    cy.get('[name="password"]')
      .clear()
      .type('wrongPassword');
    cy.get('button')
      .contains('Log in')
      .click();
    cy.get('[name="email"]')
      .clear()
      .type(captchaPassword);
    cy.get('[name="password"]')
      .clear()
      .type('wrongPassword]');
    cy.get('button')
      .contains('Log in')
      .click();
    cy.get('[name="email"]')
      .clear()
      .type(captchaEmail);
    cy.get('[name="password"]')
      .clear()
      .type('wrongPassword!');
    cy.get('button')
      .contains('Log in')
      .click();
    cy.get('[name="email"]')
      .clear()
      .type(captchaEmail);
    cy.get('[name="password"]')
      .clear()
      .type('wrongPassword1');
    cy.get('button')
      .contains('Log in')
      .click();
    cy.get('[name="email"]')
      .clear()
      .type(captchaEmail);
    cy.get('[name="password"]')
      .clear()
      .type('wrongPassword');
    cy.get('button')
      .contains('Log in')
      .click();
    cy.get('div > iframe').should('have.length.above', 3);
    cy.get('button')
      .contains('Log in')
      .should('be.disabled');
  });
  it('Account | Login | Confirm Logout', () => {
    cy.authVisit('/account/login');
    cy.get('[name="email"]').type(Cypress.env('testEmail'));
    cy.get('[name="password"]').type(Cypress.env('testPassword'));
    cy.get('button')
      .contains('Log in')
      .click();
    cy.get('[class*="loggedInAs"]').should('contain', Cypress.env('testEmail'));
    cy.get('[href="/shop/"]').click();
    cy.get('[class*="campaignCarouselItem"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[href="/account/details/"]').click();
    cy.get('[class*="loggedInAs"]').should('contain', Cypress.env('testEmail'));
    cy.contains('Log out').click();
    cy.get('[name="email"]').should('be.visible');
    cy.get('[href="/shop/"]').click();
    cy.get('[class*="campaignCarouselItem"]')
      .should('be.visible')
      .and('not.be.empty');
    cy.get('[href="/account/details/"]').click();
    cy.get('[name="email"]').should('be.visible');
  });
  it('Account | Forget Password | Registered Email', () => {
    cy.authVisit('/account/login');
    cy.get('[href="/account/forgot-password/"]').click();
    cy.get('[name="email"]').type(Cypress.env('testEmail'));
    cy.contains('Reset password').click();
    cy.get('[class*="notification"]')
      .should('be.visible')
      .and('contain', 'password reset link');
    cy.get('[class*="paragraph"]')
      .should('be.visible')
      .and('contain', Cypress.env('testEmail'));
    cy.get('[class*="button"]')
      .should('be.visible')
      .and('contain', 'Return to log in');
  });
  it('Account | Forget Password | Unregistered Email', () => {
    const testMail = `${chance.guid()}@highsnobiety.com`;
    cy.authVisit('/account/forgot-password/');
    cy.get('[name="email"]').type(testMail);
    cy.contains('Reset password').click();
    cy.get('[class*="notification"]')
      .should('be.visible')
      .and('contain', 'password reset link');
    cy.get('[class*="paragraph"]')
      .should('be.visible')
      .and('contain', testMail);
    cy.get('[class*="button"]')
      .should('be.visible')
      .and('contain', 'Return to log in');
  });
  it('Account | Forget Password | Invalid Email', () => {
    cy.authVisit('/account/forgot-password/');
    cy.get('[name="email"]').type('fakeEmail@hs');
    cy.contains('Reset password').click();
    cy.get('[class*="error"]')
      .should('be.visible')
      .and('contain', 'valid email');
    cy.get('[class*="notification"]').should('not.exist');
    cy.get('[name="email"]')
      .clear()
      .type('fakeEmailhs.com');
    cy.contains('Reset password').click();
    cy.get('[class*="error"]')
      .should('be.visible')
      .and('contain', 'valid email');
    cy.get('[class*="notification"]').should('not.exist');
  });
  it('Account | Activation | un-Activated Experience', () => {
    const email = `${chance.guid()}@highsnobiety.com`;
    cy.authVisit('/account/signup/');
    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type(passwordGood);
    cy.get('[type="submit"]').click();
    cy.contains('Personal information').should('be.visible');
    cy.url().should('contain', '/account/details/');
    cy.contains('First name').click();
    cy.get('[class*="verifyEmailPopup"]')
      .should('be.visible')
      .and('contain', 'send a new activation link');
    cy.get('[class*="verifyEmailPopup"] > button')
      .should('be.visible')
      .and('contain', 'activation link');
  });
  it('Account | Email Preferences | Saves Correctly', () => {
    const email = `${chance.guid()}@highsnobiety.com`;
    const password = `${chance.guid()}!123JAY[^~`;

    cy.authVisit('/account/signup/');
    cy.get('[name="email"]').type(email);
    cy.get('[name="password"]').type(password);
    cy.get('[type="submit"]').click();
    cy.get('.close').click({ force: true });
    cy.get('[href="/account/addresses/"]')
      .should('be.visible')
      .then(() => {
        cy.wrap(activateUserHelper(email));
      });
    cy.contains('Personal information').should('be.visible');
    cy.url().should('contain', '/account/details/');
    cy.reload();
    cy.get('[href="/account/preferences/"]').click();
    cy.get('[class*="toggle"] [class*="ball"]')
      .first()
      .click();
    cy.get('[class*="checked"]').should('have.length', 1);
    cy.get('[class*="notification"]')
      .should('be.visible')
      .and('contain', 'updated');
    cy.reload();
    cy.get('[class*="checked"]').should('have.length', 1);
    cy.get('[class*="toggle"] [class*="ball"]')
      .eq(1)
      .click();
    cy.get('[class*="checked"]').should('have.length', 2);
    cy.reload();
    cy.get('[class*="checked"]').should('have.length', 2);
    cy.get('[class*="toggle"] [class*="ball"]')
      .first()
      .click();
    cy.reload();
    cy.get('[class*="checked"]').should('have.length', 1);
  });
});
