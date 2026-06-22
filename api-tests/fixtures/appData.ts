import 'dotenv/config'

function getDefaultHeaders() {
  return {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
}

export const tokenData = {
  client_id: process.env.CLIENT_ID || '',
  client_secret: process.env.CLIENT_SECRET || '',
  grant_type: 'client_credentials',
}

export const appData = {
  baseUrl: process.env.API_BASE_URL || 'https://partners-api.airalo.com/v2',
  defaultHeaders: getDefaultHeaders(),
  packageId: process.env.PACKAGE_ID || 'moshi-moshi-7days-1gb',
  esimQuantity: Number.parseInt(process.env.ESIM_QUANTITY || '6'),
}

export const orderBody = {
  package_id: appData.packageId,
  quantity: appData.esimQuantity,
  type: 'sim',
}
