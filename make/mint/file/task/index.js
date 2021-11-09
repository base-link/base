
const mintTask = require('../../task')
const mintLoad = require('../../load')

module.exports = mintFile

function mintFile(road, base) {
  const task = []
  const load = []
  const call = []
  base.link.forEach(base => {
    switch (base.name) {
      case 'load':
        load.push(mintLoad(base))
        break
      case 'call':
        call.push(mintTask.mintCall(base))
        break
      case 'task':
        task.push(mintTask(base))
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
