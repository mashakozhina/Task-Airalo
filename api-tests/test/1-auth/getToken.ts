import * as fs from 'fs'
import { TOKEN_FILE } from '../../src/globalSetup'

describe('Authentication', () => {
  const cached = JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf8'))

  it('Should return status 200', () => {
    expect(cached.status).toBe(200)
  })

  it('Response contains a valid Bearer access_token', () => {
    expect(cached.body.data.token_type).toBe('Bearer')
    expect(typeof cached.body.data.access_token).toBe('string')
    expect(cached.body.data.access_token.length).toBeGreaterThan(0)
  })
})
