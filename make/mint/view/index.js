
const { findName } = require('../name')
const mintNest = require('../nest')
const mintSift = require('../sift')
const mintTask = require('../task')

module.exports = mintView

function mintView(base) {
  const name = findName(base)
  const view = {
    form: 'view',
    name,
    base: [],
    bond: [],
    hook: [],
    zone: [],
    task: [],
  }
  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case 'base':
        view.base.push(mintBase(base))
        break
      case 'host':
        view.zone.push(mintHost(base))
        break
      case 'call':
        view.zone.push(mintCall(base))
        break
      case 'task':
        view.task.push(mintTask(base))
        break
      case 'test':
        view.zone.push(mintTest(base))
        break
      case 'walk':
        view.zone.push(mintWalk(base))
        break
      case 'mesh':
        view.zone.push(mintMesh(base))
        break
    }
  })
  return view
}

function mintMesh(base) {
  const name = findName(base)

  const mesh = {
    form: 'mesh',
    name,
    bind: [],
    vibe: [],
    zone: [],
    hook: []
  }

  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case 'bind':
        mesh.bind.push(mintBind(base))
        break
      case 'vibe':
        mesh.vibe.push(mintVibe(base))
        break
      case 'hook':
        mesh.hook.push(mintHook(base))
        break
      case 'mesh':
        mesh.zone.push(mintMesh(base))
        break
      case 'task':
        mesh.task.push(mintTask(base))
        break
      case 'test':
        mesh.zone.push(mintTest(base))
        break
      case 'walk':
        mesh.zone.push(mintWalk(base))
        break
    }
  })

  return mesh
}

function mintVibe(base) {
  const name = findName(base)

  const vibe = {
    form: 'vibe',
    name,
    bind: [],
    hook: []
  }

  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case 'bind':
        vibe.bind.push(mintBind(base))
        break
      case 'hook':
        vibe.hook.push(mintHook(base))
        break
    }
  })

  return vibe
}

function mintWalk(base) {
  const road = findName(base)

  const walk = {
    form: 'walk',
    road,
    zone: [],
    hook: []
  }

  return walk
}

function mintTest(base) {
  const road = findName(base)

  const test = {
    form: 'test',
    road,
    zone: [],
    hook: []
  }

  return test
}

function mintCall(base) {
  const name = findName(base)

  const call = {
    form: `call`,
    name,
    wait: false,
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
      case `wait`:
        call.wait = true
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
  const sift = b.link[1].name === 'task' ? mintView(b.link[1]) : mintSift(b.link[1])
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

function mintSave(base) {
  const nest = base.link[0]
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
