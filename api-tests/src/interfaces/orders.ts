export interface SimItem {
  id: number
  iccid: string
  lpa: string
  matching_id: string
  qrcode: string
  qrcode_url: string
  direct_apple_installation_url: string
  apn_type: 'automatic' | 'manual'
  is_roaming: boolean
  created_at: string
}

export interface OrderData {
  id: number
  code: string
  package_id: string
  quantity: string
  sims: SimItem[]
}
