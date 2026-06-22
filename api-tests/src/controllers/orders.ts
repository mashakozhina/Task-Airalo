import { HttpClient } from '@utils/http-client'
import { appData, orderBody } from '@fixtures/appData'

export class Orders {
  private httpClient: HttpClient
  private headers: object

  constructor(token: string) {
    this.httpClient = new HttpClient(appData.baseUrl)
    this.headers = { ...appData.defaultHeaders, Authorization: `Bearer ${token}` }
  }

  async submitOrder(body = orderBody) {
    return this.httpClient.post('/orders', body, this.headers)
  }
}
