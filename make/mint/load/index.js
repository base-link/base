
module.exports = mintLoad

function mintLoad(base) {
  const road = base.link[0].text
  const load = {
    road,
    load: [],
    take: []
  }
  base.link.slice(1).forEach(base => {
    switch (base.name) {
      case `load`:
        load.load.push(mintLoad(base))
        break
      case `take`:
        load.take.push(mintTake(base))
        break
    }
  })
  return load
}

function mintTake(base) {
  return base.link[0]
}
