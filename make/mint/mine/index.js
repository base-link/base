
module.exports = mintMine

function mintMine(base) {
  const name = findName(base)
  const mine = {
    form: 'mine',
    name,
    base: [],
    zone: [],
  }
  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case 'base':
        const b = mintBase(base)
        mine.base.push(b)
        break
      case 'mine':
        const f = mintZone(base)
        mine.zone.push(f)
        break
      case 'call':
        const call = mintCall(base)
        mine.zone.push(call)
        break
    }
  })
  return mine
}

function mintCall(base) {
  const name = findName(base)

  const mine = {
    form: `mine-call`,
    name,
    bind: [],
    hook: []
  }

  const out = [mine]

  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case `bind`:
        const bind = mintBind(base)
        mine.bind.push(bind)
        break
      case `save`:
        const save = mintCallSave(base)
        mine.zone.push(save)
        break
      case `hook`:
        const hook = mintCallHook(base)
        mine.hook.push(hook)
        break
    }
  })

  return out
}

function mintCallSave(base) {
  const road = findRoad(base)
  const save = {
    form: `mine-call-save`,
    road
  }
  return save
}

function mintCallHook(base) {
  const name = findName(base)
  const zone = {
    form: `mine-call-hook`,
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
      case 'save':
        const save = mintSave(base)
        zone.zone.push(save)
        break
      case 'mine':
        const f = mintZone(base)
        zone.zone.push(f)
        break
    }
  })
  return zone
}

function mintSave(base) {
  const road = makeRoad(base.link[0])
  const sift = makeSift(base.link[1])
  const zone = {
    form: `mint-save`,
    road,
    sift
  }
  return zone
}

function makeRoad(base) {
  return base
}

function makeSift(base) {
  switch (base.name) {
    case `text`:
      return {
        form: `sift-text`,
        text: base.text
      }
    case `mark`:
      return {
        form: `sift-mark`,
        mark: base.mark
      }
    case `code`:
      return {
        form: `sift-code`,
        code: base.code
      }
    case `form`:
      return {
        form: `form-link`,
        name: findName(base)
      }
  }
}

function mintBase(base) {
  const name = findName(base)
  // just mint it into complete mine tree just in case.
  const b = {
    form: 'base',
    name,
    base: null,
    baseForm: null,
  }

  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case `form`:
        b.baseForm = findName(base)
        break
      case `base`:
        mine.base = makeSift(base.link[1])
        // mine.site = mintText(base)
        break
    }
  })

  return b
}

function mintZone(base) {
  const name = findName(base)
  // just mint it into complete mine tree just in case.
  switch (name) {
    case `form`: return mintMineForm(base)
    case `list`: return mintMineList(base)
    case `test`: return mintMineTest(base)
    case `case`: return mintMineCase(base)
    case `term`: return mintMineTerm(base)
    case `room`: return mintMineRoom(base)
    case `size`: return mintMineSize(base)
    default: throw new Error(`oops: ${name}`)
  }
}

function mintMineForm(base) {
  const mine = {
    form: `mine-form`,
    name: null,
    take: null
  }

  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case `form`:
        mine.name = findName(base)
        break
      case `take`:
        mine.take = findName(base)
        break
    }
  })

  return mine
}

function mintMineList(base) {
  const mine = {
    form: `mine-list`,
    bind: [],
    zone: []
  }

  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case `bind`:
        const bind = mintBind(base)
        mine.bind.push(bind)
        break
      case `mine`:
        const f = mintZone(base)
        mine.zone.push(f)
        break
    }
  })

  return mine
}

function mintMineTest(base) {
  const name = findName(base)
  const mine = {
    form: `mine-test`,
    name,
    bind: [],
    zone: [],
    hook: []
  }

  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case `bind`:
        mine.bind.push(mintBind(base))
        break
      case `mine`:
        mine.zone.push(mintZone(base))
        break
      case `hook`:
        mine.hook.push(mintCallHook(base))
        break
    }
  })

  return mine
}

function mintMineCase(base) {
  const mine = {
    form: `mine-case`,
    zone: []
  }

  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case `mine`:
        const f = mintZone(base)
        mine.zone.push(f)
        break
    }
  })

  return mine
}

function mintMineTerm(base) {
  const mine = {
    form: `mine-term`,
    name: null,
    take: null,
    zone: []
  }

  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case `term`:
        mine.name = findName(base)
        break
      case `mine`:
        const f = mintZone(base)
        mine.zone.push(f)
        break
      case `take`:
        mine.take = findName(base)
        break
    }
  })

  return mine
}

function mintMineRoom(base) {
  const mine = {
    form: `mine-room`,
    zone: []
  }

  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case `mine`:
        const f = mintZone(base)
        mine.zone.push(f)
        break
    }
  })

  return mine
}

function mintMineSize(base) {
  const mine = {
    form: `mine-size`,
    bind: [],
    zone: []
  }

  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case `bind`:
        const bind = mintBind(base)
        mine.bind.push(bind)
        break
      case `mine`:
        const f = mintZone(base)
        mine.zone.push(f)
        break
    }
  })

  return mine
}

function mintBind(base) {
  const b = findName(base)
  const sift = makeSift(base.link[1])
  const bind = {
    form: `bind`,
    name: b,
    sift
  }
  return bind
}

function findName(base) {
  return base.link[0].name.trim()
}
