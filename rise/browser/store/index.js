
function createNode() {
  return {
    id: genUUID(),
    props: {}
  }
}

function createStore() {
  return {
    mesh: {},
    pool: {},
    view: {},
    base: {}
  }
}

function storeNode(store, node) {
  store.props[node.id] = node
}

function push({ node, property, value, callback }) {
  node.props[property].push(value)
  callback('push', { node, property, value })
}

function remove({ node, property, callback }) {
  delete node.props[property]
  callback('remove', { node, property })
}

function set({ node, property, value, callback }) {
  node.props[property] = value
  callback('set', { node, property, value })
}
