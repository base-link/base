
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
  const take = base.link[0]
  let save
  if (base.link[1]) {
    save = base.link[1].link[0]
  }
  return { take, save }
}
