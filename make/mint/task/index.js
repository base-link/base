
const { findName } = require('../name')
const mintNest = require('../nest')
const mintSift = require('../sift')

module.exports = mintTask
mintTask.mintCall = mintCall

function mintTask(base) {
  const name = findName(base)
  const task = {
    name,
    base: [],
    zone: [],
  }
  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case 'base':
        task.base.push(mintBase(base))
        break
      case 'host':
        task.zone.push(mintHost(base))
        break
      case 'turn':
        task.zone.push(mintTurn(base))
        break
      case 'call':
        task.zone.push(mintCall(base))
        break
    }
  })
  return task
}

function mintCall(base) {
  const name = findName(base)

  const call = {
    form: `call`,
    name,
    bind: [],
    zone: [],
    hook: [],
  }

  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case `bind`:
        const bind = mintBind(base)
        call.bind.push(bind)
        break
      case `hook`:
        const hook = mintHook(base)
        call.hook.push(hook)
        break
      case `save`:
        const save = mintCallSave(base)
        call.zone.push(save)
        break
      case `turn`:
        const turn = mintCallTurn(base)
        call.zone.push(turn)
        break
    }
  })

  return call
}

function mintBase(base) {
  const name = findName(base)
  const sift = base.link[1] && mintSift(base.link[1])
  // just mint it into complete match tree just in case.
  const b = {
    form: 'task-base',
    name,
    sift,
  }
  return b
}

function mintHost(base) {
  const name = findName(base)
  const sift = base.link[1] && mintSift(base.link[1])
  const zone = {
    form: 'host',
    name,
    sift
  }
  return zone
}

function mintHook(base) {
  const name = findName(base)
  const zone = {
    form: `hook`,
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
      case 'turn':
        const turn = mintTurn(base)
        zone.zone.push(turn)
        break
      default:
        throw base.name
    }
  })
  return zone
}

const mintBind = b => {
  const name = findName(b)
  const sift = mintSift(b.link[1])
  const bind = {
    form: `bind`,
    name,
    sift
  }
  return bind
}

function mintTurn(base) {
  const name = findName(base)
  const sift = base.link[1] && mintSift(base.link[1])
  return {
    form: `turn`,
    name,
    sift
  }
}

function mintCallTurn(base) {
  const name = findName(base)
  return {
    form: `call-turn`,
    name
  }
}

function mintCallSave(base) {
  const nest = mintNest(base.link[0])
  const zone = {
    form: `call-save`,
    nest
  }
  return zone
}

function mintSave(base) {
  const nest = mintNest(base.link[0])
  const sift = mintSift(base.link[1])
  const zone = {
    form: `save`,
    nest,
    sift
  }
  return zone
}

function makeRoad(base) {
  return base
}
