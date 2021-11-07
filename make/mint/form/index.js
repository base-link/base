
const { findName } = require('../name')
const mintSift = require('../sift')

module.exports = mintForm

function mintForm(base) {
  const name = findName(base)
  const form = {
    name,
    base: [],
  }
  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case 'base':
        form.base.push(mintBase(base))
        break
    }
  })
  return form
}

function mintBase(base) {
  const name = findName(base)
  const sift = base.link[1] && mintSift(base.link[1])
  // just mint it into complete match tree just in case.
  const b = {
    form: 'base',
    name,
    sift,
  }
  return b
}

function makeRoad(base) {
  return base
}
