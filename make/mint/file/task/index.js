
const mintTask = require('../../task')
const mintLoad = require('../../load')

module.exports = mintFile

function mintFile(road, base) {
  const task = []
  const load = []
  const call = []
  base.link.forEach(link => {
    switch (link.name) {
      case 'load':
        load.push(mintLoad(link))
        break
      case 'call':
        call.push(mintTask.mintCall(link))
        break
      case 'task':
        task.push(mintTask(link))
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
