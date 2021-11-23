
const mintTest = require('../../test')
const mintLoad = require('../../load')

module.exports = mintFile

function mintFile(road, base) {
  const test = []
  const load = []
  base.link.forEach(link => {
    switch (link.name) {
      case 'load':
        load.push(mintLoad(link))
        break
      case 'test':
        test.push(mintTest(link))
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
