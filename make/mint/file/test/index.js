
const mintTest = require('../../test')
const mintLoad = require('../../load')

module.exports = mintFile

function mintFile(road, base) {
  const test = []
  const load = []
  base.link.forEach(base => {
    switch (base.name) {
      case 'load':
        load.push(mintLoad(base))
        break
      case 'test':
        test.push(mintTest(base))
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
