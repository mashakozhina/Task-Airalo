const Sequencer = require('@jest/test-sequencer').default
import type { Test } from '@jest/test-result'

const ORDER = ['auth', 'orders', 'esims']

module.exports = class CustomSequencer extends Sequencer {
  sort(tests: Test[]): Test[] {
    return [...tests].sort((a, b) => {
      const ai = ORDER.findIndex((name) => a.path.includes(`/${name}/`))
      const bi = ORDER.findIndex((name) => b.path.includes(`/${name}/`))
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi)
    })
  }
}
