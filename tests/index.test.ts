import assert from 'node:assert'
import { describe, it } from 'node:test'
import { add } from '../src'

describe('index.ts', () => {
  it('Add function', () => {
    const result = add(1, 2)
    assert.equal(result, 3)
  })
})
