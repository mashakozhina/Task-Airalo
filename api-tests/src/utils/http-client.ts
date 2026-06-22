import axios from 'axios'

export class HttpClient {
  constructor(private baseUrl: string) {}

  async get(path: string, headers: object) {
    try {
      const response = await axios.get(`${this.baseUrl}${path}`, { headers })
      return { status: response.status, body: response.data }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return { status: error.response.status, body: error.response.data }
      }
      throw error
    }
  }

  async postForm(path: string, body: Record<string, string>, headers: object = {}) {
    return this.post(path, new URLSearchParams(body), headers)
  }

  async post(path: string, body: unknown, headers: object = {}) {
    try {
      const response = await axios.post(`${this.baseUrl}${path}`, body, { headers })
      return { status: response.status, body: response.data }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return { status: error.response.status, body: error.response.data }
      }
      throw error
    }
  }

}
