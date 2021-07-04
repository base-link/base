
module.exports = mintMake

function mintMake(base) {
  const name = findName(base)

  const zone = {
    form: `mill-make`,
    name,
    bind: [],
    zone: []
  }

  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case `bind`:
        const bind = mintBind(base)
        zone.bind.push(bind)
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
