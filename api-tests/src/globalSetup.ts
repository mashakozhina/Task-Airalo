import * as fs from 'fs'
import * as path from 'path'
import axios from 'axios'
import * as dotenv from 'dotenv'

dotenv.config({ path: path.resolve(__dirname, '../.env') })

import { tokenData, appData } from '../fixtures/appData'

export const TOKEN_FILE = '/tmp/airalo-token.json'
export const ORDER_FILE = '/tmp/airalo-order.json'

export default async function globalSetup(): Promise<void> {
  const tokenResponse = await axios.post(
    `${appData.baseUrl}/token`,
    new URLSearchParams(tokenData),
  )
  fs.writeFileSync(TOKEN_FILE, JSON.stringify({
    status: tokenResponse.status,
    body: tokenResponse.data,
    expiresAt: Date.now() + (tokenResponse.data.data.expires_in - 60) * 1000,
  }))
}
