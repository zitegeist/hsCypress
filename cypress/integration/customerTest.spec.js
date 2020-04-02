describe('test', () => {
  it('test', () => {
    cy.authVisit('/');
    cy.get('body')
      .should('be.visible')
      .then(() => {
        return cy.getCustomerByEmail('test.automation@highsnobiety.com');
      })
      .then(customer => {
        console.log('customer', customer);
      });
  });
});

// "commerceToolsClientId": "nHF3Zqb5FNRTcKmwzoXunNp_",
// "commerceToolsClientSecret": "dUUG6tAw2YFi0qf3F36wcsxuuuEDPnci",
// commerceToolsHost: 'https://api.sphere.io',
// commerceToolsOAuthUrl: 'https://auth.sphere.io',
// commerceToolsScopes: 'manage_project',
