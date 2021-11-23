
const mintTask = require('../../task')
const mintLoad = require('../../load')

module.exports = mintFile

function mintFile(road, base) {
  const task = []
  const load = []
  const call = []
  base.forEach(base => {
    const term = base.link[0]
    switch (term.term) {
      case 'load':
        load.push(mintLoad(base.link.slice(1)))
        break
      case 'call':
        call.push(mintTask.mintCall(base.link.slice(1)))
        break
      case 'task':
        task.push(mintTask(base.link.slice(1)))
        break
    }
  })
  return {
    road,
    tree: base,
    load,
    call,
    task
  }
}
