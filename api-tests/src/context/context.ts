import * as fs from 'fs'
import { TOKEN_FILE, ORDER_FILE } from '../globalSetup'
import type { SimItem } from '@interfaces/orders'

export function getToken(): string {
  const cached = JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf8'))
  return cached.body.data.access_token
}

export function getOrderSims(): SimItem[] {
  const cached = JSON.parse(fs.readFileSync(ORDER_FILE, 'utf8'))
  return cached.body.data.sims
}
