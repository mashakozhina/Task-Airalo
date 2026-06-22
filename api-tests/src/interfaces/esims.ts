export interface EsimData {
  id: number
  iccid: string
  lpa: string
  matching_id: string
  qrcode: string
  qrcode_url: string
  apn_type: 'automatic' | 'manual'
  apn_value: string | null
  is_roaming: boolean
  confirmation_code: string
}
