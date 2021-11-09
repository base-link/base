
const { findName } = require('../name')
const mintSift = require('../sift')

module.exports = mintForm

function mintForm(base) {
  const name = findName(base)
  const isBase = !!base.link.slice(1).find(x => x.name === 'base')
  const isCase = !!base.link.slice(1).find(x => x.name === 'case')

  if (isBase) {
    const form = {
      name,
      base: {},
    }
    base.link.slice(1).forEach(base => {
      switch (base.name) {
        case 'base':
          const b = mintBase(base)
          form.base[b.name] = b
          break
      }
    })
    return form
  } else if (isCase) {
    const form = {
      name,
      case: {},
    }
    base.link.slice(1).forEach(base => {
      switch (base.name) {
        case 'case':
          const c = mintBase(base, 'case')
          form.case[c.name] = c
          break
      }
    })
    return form
  } else {
    const form = {
      name
    }
    return form
  }
}

function mintBase(base, form = 'base') {
  const name = findName(base)
  // const sift = base.link[1] && mintSift(base.link[1])
  // just mint it into complete match tree just in case.
  const b = {
    form,
    name,
    case: undefined,
    sift: undefined,
  }
  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case 'list':
        b.case = {
          form: 'list',
          name: findName(base)
        }
        break
      case 'form':
        b.case = {
          form: 'form',
          name: findName(base)
        }
        break
    }
  })
  return b
}

function makeRoad(base) {
  return base
}
