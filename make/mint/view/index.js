
const { findName } = require('../name')
const mintNest = require('../nest')
const mintSift = require('../sift')
const mintTask = require('../task')

module.exports = mintView

function mintView(base) {
  const name = base[0].link[0].term
  const view = {
    form: 'view',
    name,
    base: [],
    bond: [],
    hook: [],
    zone: [],
    task: [],
  }
  base.slice(1).forEach(base => {
    const term = base.link[0]
    switch (term.term) {
      case 'base':
        view.base.push(mintBase(base.link.slice(1)))
        break
      case 'host':
        view.zone.push(mintHost(base.link.slice(1)))
        break
      case 'call':
        view.zone.push(mintCall(base.link.slice(1)))
        break
      case 'task':
        view.task.push(mintTask(base.link.slice(1)))
        break
      case 'test':
        view.zone.push(mintTest(base.link.slice(1)))
        break
      case 'walk':
        view.zone.push(mintWalk(base.link.slice(1)))
        break
      case 'mesh':
        view.zone.push(mintMesh(base.link.slice(1)))
        break
    }
  })
  return view
}

function mintMesh(base) {
  const name = base[0].link[0].term

  const mesh = {
    form: 'mesh',
    name,
    bind: [],
    vibe: [],
    zone: [],
    hook: []
  }

  base.slice(1).forEach(base => {
    const term = base.link[0]
    switch (term.term) {
      case 'bind':
        mesh.bind.push(mintBind(base.link.slice(1)))
        break
      case 'vibe':
        mesh.vibe.push(mintVibe(base.link.slice(1)))
        break
      case 'hook':
        mesh.hook.push(mintHook(base.link.slice(1)))
        break
      case 'mesh':
        mesh.zone.push(mintMesh(base.link.slice(1)))
        break
      case 'task':
        mesh.task.push(mintTask(base.link.slice(1)))
        break
      case 'test':
        mesh.zone.push(mintTest(base.link.slice(1)))
        break
      case 'walk':
        mesh.zone.push(mintWalk(base.link.slice(1)))
        break
    }
  })

  return mesh
}

function mintVibe(base) {
  const name = base[0].link[0].term

  const vibe = {
    form: 'vibe',
    name,
    bind: [],
    hook: []
  }

  base.slice(1).forEach(base => {
    const term = base.link[0]
    switch (term.term) {
      case 'bind':
        vibe.bind.push(mintBind(base.link.slice(1)))
        break
      case 'hook':
        vibe.hook.push(mintHook(base.link.slice(1)))
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
  const name = base[0].link[0].term
  const zone = {
    form: `hook`,
    name,
    base: [],
    zone: []
  }
  base.slice(1).forEach(base => {
    const term = base.link[0]
    switch (term.term) {
      case 'base':
        const b = mintBase(base.link.slice(1))
        zone.base.push(b)
        break
      case 'call':
        const call = mintCall(base.link.slice(1))
        zone.zone.push(call)
        break
      case 'save':
        const save = mintSave(base.link.slice(1))
        zone.zone.push(save)
        break
      case 'turn':
        const turn = mintTurn(base.link.slice(1))
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
