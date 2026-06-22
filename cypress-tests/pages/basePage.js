export default class BasePage {
  constructor() {}

  visit(path = '/') {
    cy.visit(`${Cypress.config('baseUrl')}${path}`)
  }
}
