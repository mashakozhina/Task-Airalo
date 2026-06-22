import BasePage from './basePage'

export default class PackagePage extends BasePage {
  constructor() {
    super()
  }

  header = '[data-testid="header_top-bar"]'
  locationOperatorDetails = '[data-testid="store-location_operator-details-container"]'
  packagesContainer = '[data-testid="store-location_packages-container"]'
  packageTypeUnlimited = '[data-testid="segmented-control_tab-unlimited"]'
  packageTypeClassic = '[data-testid="segmented-control_tab-classic"]'
  packageDurationOption = '[data-testid="package-grouped-packages_package-button"]'
  packagePrice = '[data-testid="card-package_prices-container"]'
  cartNavigationContainer = '[data-testid="cart-navigation_container"]'
  totalPriceAmount = '[data-testid="price_amount"]'

  assertPackagesPage() {
    cy.waitForPageLoad()
    cy.get(this.header).should('be.visible')
    cy.get(this.locationOperatorDetails).should('be.visible')
    cy.get(this.packagesContainer).should('be.visible')
  }

  selectPackageType(type) {
    switch (type) {
      case 'Unlimited':
        cy.get(this.packageTypeUnlimited).click()
        break
      case 'Classic':
        cy.get(this.packageTypeClassic).click()
        break
      default:
        cy.get(this.packageTypeClassic).click()
        break
    }
  }

  selectPackageDuration(duration) {
    switch (duration) {
      case '7 Days':
        cy.get(this.packageDurationOption).eq(2).click()
        break
      case '30 Days':
        cy.get(this.packageDurationOption).eq(5).click()
        break
      default:
        cy.get(this.packageDurationOption).eq(2).click()
    }
  }

  getSelectedPackagePrice(duration) {
    switch (duration) {
      case '7 Days':
        return cy.get(this.packagePrice).eq(2).invoke('text')
      case '30 Days':
        return cy.get(this.packagePrice).eq(5).invoke('text')
      default:
        return cy.get(this.packagePrice).eq(2).invoke('text')
    }
  }

  getBuyNowPrice() {
    return cy.get(this.cartNavigationContainer).find(this.totalPriceAmount).invoke('text')
  }

  verifyPackagePrice(duration) {
    this.getSelectedPackagePrice(duration).then((packagePrice) => {
      const priceMatch = packagePrice.match(/[\d.]+/)

      this.getBuyNowPrice().then((buyNowPrice) => {
        expect(buyNowPrice).to.include(
          priceMatch[0],
          `Buy Now price "${buyNowPrice}" should equal package price "${packagePrice}"`,
        )
      })
    })
  }
}
