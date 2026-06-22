import * as fs from 'fs'
import { getToken } from '@context'
import { Orders } from '@controllers/orders'
import { appData } from '@fixtures/appData'
import { ORDER_FILE } from '../../src/globalSetup'
import type { OrderData } from '@interfaces/orders'

describe('Submit Order', () => {
  let status: number
  let data: OrderData

  beforeAll(async () => {
    const response = await new Orders(getToken()).submitOrder()
    status = response.status
    data = response.body.data as OrderData
    fs.writeFileSync(ORDER_FILE, JSON.stringify({ status, body: response.body }))
  })

  it('Should return status 200', () => {
    expect(status).toBe(200)
  })

  it('Should create 6 eSIMs for the correct package', () => {
    expect(data.package_id).toBe(appData.packageId)
    expect(Number(data.quantity)).toBe(appData.esimQuantity)
    expect(data.sims.length).toBe(appData.esimQuantity)
  })

  it('Each eSIM has required properties: iccid, lpa, qrcode, qrcode_url', () => {
    data.sims.forEach((sim) => {
      expect(typeof sim.iccid).toBe('string')
      expect(sim.iccid.length).toBeGreaterThan(0)
      expect(typeof sim.lpa).toBe('string')
      expect(typeof sim.qrcode).toBe('string')
      expect(typeof sim.qrcode_url).toBe('string')
    })
  })
})
