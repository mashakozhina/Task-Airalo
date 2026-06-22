// Custom command: clear cookies and local storage between tests
Cypress.Commands.add('clearSession', () => {
  cy.clearCookies()
  cy.clearLocalStorage()
})

// Custom command: wait for page network to be idle
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible')
  cy.document().its('readyState').should('eq', 'complete')
  cy.window().its('document.readyState').should('eq', 'complete')
})

