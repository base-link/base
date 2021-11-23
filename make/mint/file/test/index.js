
const mintTest = require('../../test')
const mintLoad = require('../../load')

module.exports = mintFile

function mintFile(road, base) {
  const test = []
  const load = []
  base.forEach(link => {
    const term = link.link[0]
    switch (term.term) {
      case 'load':
        load.push(mintLoad(link.link.slice(1)))
        break
      case 'test':
        test.push(mintTest(link.link.slice(1)))
        break
    }
  })
  return {
    road,
    tree: base,
    load,
    test
  }
}
