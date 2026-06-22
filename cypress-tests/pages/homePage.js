import BasePage from './basePage'

export default class HomePage extends BasePage {
  constructor() {
    super()
  }

  header = '[data-testid="header_top-bar"]'
  headerNavigation = '[data-testid="header_navigation-container"]'
  headerSearchBar = '[data-testid="header_search-bar-container"]'
  searchInput = '[data-testid="search-input_text-field"]'
  searchDropdownOption = '[role="option"]'
  baseCarousel = '[data-testid="base-carousel_slide-container"]'
  footer = '[data-testid="footer_container"]'
  privacyBannerAcceptBtn = '#onetrust-accept-btn-handler'

  openHomePage() {
    cy.visit('/')
    cy.waitForPageLoad()
    this.assertHomePage()
  }

  assertHomePage() {
    cy.get(this.header).should('be.visible')
    cy.get(this.headerNavigation).should('be.visible')
    cy.get(this.headerSearchBar).should('be.visible')
    cy.get(this.baseCarousel).should('be.visible')
    cy.get(this.footer).should('be.visible')
  }

  searchForCountry(term) {
    cy.get(this.searchInput)
      .should('be.visible')
      .click()
      .should('be.focused')
      .type(term, { delay: 50 })
  }

  selectCountryResult(countryName) {
    cy.get(this.searchDropdownOption)
      .should('be.visible')
      .find(`a[href*="/${countryName.toLowerCase()}-esim"]`)
      .should('be.visible')
      .first()
      .click()
  }
}
