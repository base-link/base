
const {
  kill: removeNativeElement,
} = require('./element')

module.exports = {
  load,
  prepareUpdates,
  applyUpdates
}

function load(home, view) {

}

function parseView(view) {

}

function update(view) {

}

function createEnvironment() {
  return {
    meshes: {}
  }
}

function applyUpdates({ trie, meshes }) {
  let stack = [trie]

  while (stack.length) {
    let level = stack.shift()
    switch (level.action) {
      case 'none':
        continueDown(level)
        break
      case 'remove':
        remove(level.id)
        break
      case 'set':
        setValue(level)
        continueDown(level)
        break
      case 'push':
        push(level)
        continueDown(level)
        break
    }
  }

  function push({ id, property, value }) {

  }

  function setValue({ id, property, value }) {
    const mesh = meshes[id]
    if (mesh.props[property] !== value) {
      mesh.props[property] = value
      setNativeValue(mesh.nativeElement, property, value)
    }
  }

  function remove(meshId) {
    const mesh = meshes[meshId]
    removeEachVirtualElement(mesh, store)
    removeNativeElement(mesh.nativeElement)
  }

  function continueDown() {
    for (const childKey in level.children) {
      const child = level.children[childKey]
      stack.push(child)
    }
  }
}

function removeEachVirtualElement(mesh, base) {
  const stack = [mesh]
  while (stack.length) {
    const node = stack.shift()
    delete base.mesh[node.id]
    node.children.forEach(child => {
      stack.push(child)
    })
  }
}

function prepareUpdates({ store, updates, meshDependencies, meshes }) {
  const trie = {
    action: 'none',
    children: {}
  }
  for (const nodeId in updates) {
    const nodeUpdate = updates[nodeId]
    const node = store.props[nodeId]
    const meshDependency = meshDependencies[nodeId]
    for (const property in nodeUpdate) {
      const meshMap = meshDependency[property]
      const propertyUpdate = nodeUpdate[property]
      for (const meshId in meshMap) {
        const meshBinding = meshMap[meshId]
        const mesh = meshes[meshId]
        let trieNode = trie
        mesh.path.forEach(pathNode => {
          trieNode = trieNode.children[pathNode] = trieNode.children[pathNode] || {
            action: 'none',
            children: {}
          }
        })
        trieNode.id = meshId
        trieNode.action = propertyUpdate.action
        trieNode.value = propertyUpdate.value
      }
    }
  }
  return trie
}
