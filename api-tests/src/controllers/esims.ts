import { HttpClient } from '@utils/http-client'
import { appData } from '@fixtures/appData'

export class Esims {
  private httpClient: HttpClient
  private headers: object

  constructor(token: string) {
    this.httpClient = new HttpClient(appData.baseUrl)
    this.headers = { ...appData.defaultHeaders, Authorization: `Bearer ${token}` }
  }

  async getEsim(iccid: string) {
    return this.httpClient.get(`/sims/${iccid}`, this.headers)
  }
}
