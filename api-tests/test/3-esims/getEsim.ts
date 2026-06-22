import { getToken, getOrderSims } from '@context'
import { Esims } from '@controllers/esims'
import { appData } from '@fixtures/appData'
import type { SimItem } from '@interfaces/orders'
import type { EsimData } from '@interfaces/esims'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

describe('Get eSIM Details', () => {
  let sims: SimItem[]
  let esimResponses: Array<{ status: number; body: { data: EsimData; meta?: { message: string } } }>

  beforeAll(async () => {
    sims = getOrderSims()
    const esims = new Esims(getToken())
    esimResponses = []
    for (const sim of sims) {
      await delay(1000)
      esimResponses.push(await esims.getEsim(sim.iccid))
    }
  })

  it('Should retrieve details for all 6 eSIMs with status 200', () => {
    expect(esimResponses).toHaveLength(appData.esimQuantity)
    for (const response of esimResponses) {
      expect(response.status).toBe(200)
    }
  })

  it('Each eSIM response contains correct iccid, lpa, and qrcode', () => {
    sims.forEach((sim, i) => {
      const data: EsimData = esimResponses[i].body.data
      expect(data.iccid).toBe(sim.iccid)
      expect(typeof data.lpa).toBe('string')
      expect(typeof data.qrcode).toBe('string')
    })
  })

  it('Each eSIM has apn_type and is_roaming fields', () => {
    for (const response of esimResponses) {
      const data: EsimData = response.body.data
      expect(data.apn_type).toBeDefined()
      expect(data.is_roaming).toBeDefined()
    }
  })

  it('Should return 404 for an invalid iccid', async () => {
    await delay(1000)
    const response = await new Esims(getToken()).getEsim('0000000000000000000')
    expect(response.status).toBe(404)
  })
})
