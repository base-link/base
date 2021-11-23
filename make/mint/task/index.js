
const { findName } = require('../name')
const mintNest = require('../nest')
const mintSift = require('../sift')

module.exports = mintTask
mintTask.mintCall = mintCall

function mintTask(base) {
  const name = base[0].link[0].term
  const task = {
    form: 'task',
    name,
    base: [],
    zone: [],
    wait: false,
  }
  base.slice(1).forEach(base => {
    const term = base.link[0]
    switch (term.term) {
      case 'base':
        task.base.push(mintBase(base.link.slice(1)))
        break
      case 'host':
        task.zone.push(mintHost(base.link.slice(1)))
        break
      case 'turn':
        task.zone.push(mintTurn(base.link.slice(1)))
        break
      case 'call':
        task.zone.push(mintCall(base.link.slice(1)))
        break
      case 'wait':
        task.wait = true
        break
    }
  })
  return task
}

function mintCall(base) {
  const name = base[0].link[0].term

  const call = {
    form: `call`,
    name,
    wait: false,
    bind: [],
    zone: [],
    hook: [],
  }

  base.slice(1).forEach(base => {
    const term = base.link[0]
    switch (term.term) {
      case `bind`:
        const bind = mintBind(base.link.slice(1))
        call.bind.push(bind)
        break
      case `hook`:
        const hook = mintHook(base.link.slice(1))
        call.hook.push(hook)
        break
      case `save`:
        const save = mintCallSave(base.link.slice(1))
        call.zone.push(save)
        break
      case `turn`:
        const turn = mintCallTurn(base.link.slice(1))
        call.zone.push(turn)
        break
      case `wait`:
        call.wait = true
        break
    }
  })

  return call
}

function mintBase(base) {
  const name = base[0].link[0].term
  const sift = base[1]
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
  const name = b[0].link[0].term
  const sift = b[1]
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
  const name = base[0].link[0].term
  return {
    form: `call-turn`,
    name
  }
}

function mintCallSave(base) {
  const nest = base[0].link[0]
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
