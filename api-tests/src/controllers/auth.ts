import { HttpClient } from '@utils/http-client'
import { appData, tokenData } from '@fixtures/appData'

export class Auth {
  private httpClient: HttpClient

  constructor() {
    this.httpClient = new HttpClient(appData.baseUrl)
  }

  async getToken() {
    return this.httpClient.postForm('/token', tokenData)
  }
}
