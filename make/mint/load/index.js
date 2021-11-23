
module.exports = mintLoad

function mintLoad(base) {
  const road = base[0].text
  const load = {
    road,
    load: [],
    take: []
  }
  base.slice(1).forEach(base => {
    const term = base.link[0]
    switch (term.term) {
      case `load`:
        load.load.push(mintLoad(base.link.slice(1)))
        break
      case `take`:
        load.take.push(mintTake(base.link.slice(1)))
        break
    }
  })
  return load
}

function mintTake(base) {
  const take = base[0]
  let save
  // if (base.link[1]) {
  //   save = base.link[1].link[0]
  // }
  return { take, save }
}
