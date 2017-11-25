const { createPatch, applyPatch } = require('./index.js')

describe('text-diff-adapter', () => {
  it('can generate the patch v1 => v2', () => {
    const text1 = 'some dog'
    const text2 = text1.slice(5, text1.length) + 'shit'

    const patch = createPatch(text1, text2)
    expect(patch).toBeDefined()
  })

  it('can patch v1 => v2 using a genereated diff', () => {
    const text1 = 'Ich bin eine Beschreibung.'
    const text2 = 'Er war eine Beschreibungasfduoadshfnuasd - siehst du?'

    const patch = createPatch(text1, text2)
    expect(applyPatch(text1, patch)).toEqual(text2)
  })

  it('throws a merge error trying to merge with a changed master', () => {
    const base = 'Ich bin schlau.'
    const head = 'Ich dumm'

    const branch = 'Ich bin sehr schlau!'
    const patch = createPatch(base, branch)
    expect(() => applyPatch(head, patch)).toThrow()
  })

  it('returns false trying to generate a patch for an unchanged text', () => {
    const text = 'I am some sample text xD'

    expect(createPatch(text, text)).toEqual(false)
  })
})
