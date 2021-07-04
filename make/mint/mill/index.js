
const { findName } = require('../name')

module.exports = mintMill

function mintMill(base) {
  const name = findName(base)

  const mill = {
    form: 'mill',
    name,
    base: [],
    zone: [],
  }

  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case 'base':
        const b = mintBase(base)
        mill.base.push(b)
        break
      case 'host':
        const host = mintHost(base)
        mill.zone.push(host)
        break
      case 'call':
        const call = mintCall(base)
        mill.zone.push(call)
        break
      case 'make':
        const make = mintMake(base)
        mill.zone.push(make)
        break
      case `turn`:
        const turn = mintCallTurn(base)
        mill.zone.push(turn)
        break
      case 'mill':
        const child = mintMillMill(base)
        mill.zone.push(child)
        break
    }
  })
  return mill
}

function mintCall(base) {
  const name = findName(base)

  const zone = {
    form: `mill-call`,
    name,
    bind: [],
    zone: [],
    hook: [],
  }

  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case `bind`:
        const bind = mintBind(base)
        zone.bind.push(bind)
        break
      case `hook`:
        const hook = mintHook(base)
        zone.hook.push(hook)
        break
      case `save`:
        const save = mintCallSave(base)
        zone.zone.push(save)
        break
      case `line`:
        const line = mintCallLine(base)
        zone.zone.push(line)
        break
      case `turn`:
        const turn = mintCallTurn(base)
        zone.zone.push(turn)
        break
    }
  })

  return zone
}

function mintBase(base) {
  const name = findName(base)
  // just mint it into complete match tree just in case.
  const b = {
    form: 'base',
    name,
  }
  return b
}

function mintMillMill(base) {
  const name = findName(base)

  const zone = {
    form: 'mill-mill',
    name,
    base: [],
    millForm: undefined,
    zone: [],
  }

  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case 'bind':
        const bind = mintBind(base)
        zone.bind.push(bind)
        break
      case 'base':
        const b = mintBase(base)
        zone.base.push(b)
        break
      case 'mill':
        const mill = mintMillMill(base)
        zone.zone.push(mill)
        break
      case 'form':
        zone.millForm = findName(base)
        break
      case 'make':
        zone.zone.push(mintMake(base))
        break
      case 'call':
        const call = mintCall(base)
        zone.zone.push(call)
        break
      case 'save':
        const save = mintSave(base)
        zone.zone.push(save)
        break
      case 'line':
        const line = mintLine(base)
        zone.zone.push(line)
        break
      case 'turn':
        const turn = mintCallTurn(base)
        zone.zone.push(turn)
        break
    }
  })
  return zone
}

function mintCallTurn(base) {
  const name = findName(base)
  return {
    form: `mill-turn`,
    name
  }
}

const mintBind = b => {
  const name = findName(b)
  const sift = makeSift(b.link[1])
  const bind = {
    form: `bind`,
    name,
    sift
  }
  return bind
}

function mintCallLine(base) {
  const name = findName(base)
  return {
    form: `mill-call-line`,
    name
  }
}

function mintCallSave(base) {
  const name = findName(base)
  const zone = {
    form: `mill-call-save`,
    name
  }
  return zone
}

function mintHost(base) {
  const name = findName(base)
  const zone = {
    form: 'mill-host',
    name
  }
  return zone
}

function mintHook(base) {
  const name = findName(base)
  const zone = {
    form: `mill-hook`,
    name,
    base: [],
    zone: []
  }
  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case 'base':
        const b = mintBase(base)
        zone.base.push(b)
        break
      case 'call':
        const call = mintCall(base)
        zone.zone.push(call)
        break
      case 'save':
        const save = mintSave(base)
        zone.zone.push(save)
        break
      case 'line':
        const line = mintLine(base)
        zone.zone.push(line)
        break
      case 'fuse':
        const fuse = mintFuse(base)
        zone.zone.push(fuse)
        break
      default:
        throw base.name
    }
  })
  return zone
}

function makeRoad(base) {
  return base
}
