
// set the appropriate variable names throughout the AST
// get rid of unused variable declarations

function createFileScope(file) {
  return {
    file,
    index: 1,
    requires: [],
    bindings: [],
    names: {},
    links: {}
  }
}

function reference(bind, name) {
  bind.names[name] = true
}

function addFileScopeBinding(fileScope, requireKey, path) {
  let links = fileScope.links
  let search = path.concat()
  let variableKey

  reference(fileScope, requireKey)

  while (search.length) {
    let pathNode = search.shift()
    let ref = links[pathNode] = links[pathNode] || {
      key: getFileBindName(fileScope),
      links: {}
    }
    links = ref.links
    variableKey = ref.key
  }

  fileScope.bindings.push({
    name: variableKey,
    requireKey,
    path
  })
}

function getNextNameFromScope(scope) {
  const name = `x${scope.index++}`
  scope.names[name] = false
  return name
}

function createFunctionScope(parent) {
  return {
    index: parent.index,
    names: {
      ...parent.names
    }
  }
}

function makeFork(bind, path, object) {
  const parts = path.split('/')
  let node = bind
  while (parts.length) {
    let part = parts.shift()
    node = node.links[part] = node.links[part] || {
      key: getFileBindName(bind),
      links: {}
    }
  }
  makeForkObject(bind, node, object)
}

function makeForkObject(bind, parentNode, object) {
  for (const name in object) {
    const value = object[name]
    const type = typeof value
    if (type === 'string') {
      reference(bind, parentNode.key)
      bind.commands.push({
        form: 'save',
        sort: 'string',
        host: parentNode.key,
        name,
        blob: value
      })
    } else if (type === 'number') {
      reference(bind, parentNode.key)
      bind.commands.push({
        form: 'save',
        sort: 'number',
        host: parentNode.key,
        name,
        blob: value
      })
    } else if (type === 'boolean') {
      reference(bind, parentNode.key)
      bind.commands.push({
        form: 'save',
        sort: 'boolean',
        host: parentNode.key,
        name,
        blob: value
      })
    } else if (type === 'function') {
      reference(bind, parentNode.key)
      bind.commands.push({
        form: 'save',
        sort: 'function',
        host: parentNode.key,
        name,
        blob: value
      })
    } else if (type === 'object' && value) {
      reference(bind, parentNode.key)
      const variableKey = getFileBindName(bind)
      bind.commands.push({
        form: 'fork',
        host: parentNode.key,
        name,
        variableKey,
      })
      const node = parentNode.links[name] = {
        key: variableKey,
        links: {}
      }
      if (Array.isArray(value)) {
        let obj = value.reduce((m, x, i) => {
          m[i] = x
          return m
        }, {})
        makeForkObject(bind, node, obj)
      } else {
        makeForkObject(bind, node, value)
      }
    } else if (value === null) {
      reference(bind, parentNode.key)
      bind.commands.push({
        form: 'save',
        sort: 'null',
        host: parentNode.key,
        name,
        blob: value
      })
    }
  }
}
