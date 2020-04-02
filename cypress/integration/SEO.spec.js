describe('Highsnobiety | SEO Tests', () => {
  it('SEO | Basic Properties | Shop', () => {
    cy.authVisit('/shop/product/MSMOODJA01/');
    cy.document()
      .its('contentType')
      .should('eq', 'text/html');
    cy.window().then(win => {
      assert.isDefined(win.dataLayer, 'Data Layer is defined');
    });
    cy.document()
      .its('title')
      .should('eq', 'Prada Test | Single Variant - Highsnobiety');
  });
  it('SEO | Basic Properties | Article', () => {
    cy.authVisit('/p/best-summer-sneakers/');
    cy.document()
      .its('contentType')
      .should('eq', 'text/html');
    cy.window().then(win => {
      assert.isDefined(win.dataLayer, 'Data Layer is defined');
      assert.equal(win.dataLayer[0].post_id, 1607635, 'Post ID is correct');
      assert.equal(
        Cypress.$('[class*="headline"]')
          .first()
          .text()
          .trim(),
        win.dataLayer[0].post_title,
        'Page Name is correct',
      );
    });
    cy.document()
      .its('title')
      .should('eq', '11 of The Best Summer-Ready Kicks for Under $200');
    cy.get('head meta[name="description"]').should(
      'have.attr',
      'content',
      'We rounded up some must-cop sneakers for summer, including classics from Nike and Vans, as well as more daring options for the warm weather.',
    );
  });
});
