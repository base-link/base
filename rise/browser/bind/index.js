
let watchers = {}

const actions = {
  push,
  set,
}

function watch(action, event) {
  actions[action](event)
}

function push(event) {
  const nodeWatcher = watchers[event.node.id] = watchers[event.node.id] || {}
  nodeWatcher[event.property] = {
    type: 'list',
    value
  }
}

function set(event) {
  const nodeWatcher = watchers[event.node.id] = watchers[event.node.id] || {}
  nodeWatcher[event.property] = {
    type: 'object',
    action: 'set',
    value
  }
}
