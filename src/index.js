const jsDiff = require('diff')

const createPatch = (oldStr, newStr) => {
  if (oldStr === newStr) {
    return false
  }

  return jsDiff.createPatch('', oldStr, newStr)
}

const applyPatch = (oldStr, patch) => {
  const result = jsDiff.applyPatch(oldStr, patch)

  if (result === false) {
    throw new Error('Error applying patch to source!')
  }

  return result && result.slice(0, -1)
}

module.exports = {
  createPatch,
  applyPatch
}
