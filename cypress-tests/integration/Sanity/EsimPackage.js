import HomePage from '../../pages/homePage'
import PackagePage from '../../pages/packagePage'
import { COUNTRIES } from '../../fixtures/countries'
import { PACKAGE_TYPES, PACKAGE_DURATIONS } from '../../fixtures/packages'

const homePage = new HomePage()
const packagePage = new PackagePage()

describe('eSIM Package', () => {
  beforeEach(() => {
    cy.clearSession()
    homePage.openHomePage()
  })

  it('7-day unlimited package price matches Buy Now price', () => {
    homePage.searchForCountry(COUNTRIES.japan)
    homePage.selectCountryResult(COUNTRIES.japan)
    packagePage.assertPackagesPage()
    packagePage.selectPackageType(PACKAGE_TYPES.unlimited)
    packagePage.selectPackageDuration(PACKAGE_DURATIONS.sevenDays)
    packagePage.verifyPackagePrice(PACKAGE_DURATIONS.sevenDays)
  })
})
