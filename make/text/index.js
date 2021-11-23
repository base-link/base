
// https://stackoverflow.com/questions/68850952/how-can-you-reverse-this-pseudo-prng-to-get-back-the-original-number

const fs = require('fs')
const pathResolver = require('path')
const AST = require('@lancejpollard/normalize-ast.js/create')
const HEAD = fs.readFileSync('./make/head/index.js', 'utf-8')

module.exports = make

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

function make(file, deck) {
  const list = [file]
  const encounteredPaths = {}
  const fileScopes = []
  while (list.length) {
    const base = list.shift()
    if (encounteredPaths[base.road]) {
      continue
    }
    encounteredPaths[base.road] = true
    const fileScope = createFileScope(base)
    fileScope.importPaths = getImportPaths(fileScope)
    makeFile(fileScope)
    fileScopes.push(fileScope)
    fileScope.importPaths.forEach(load => {
      list.push(deck[load.road])
    })
  }

  const text = makeText(fileBindList)
  return text.join('\n').trim() + '\n'
}

function makeFile(scope) {
  switch (scope.file.mint) {
    case `task-file`:
      makeTaskFile(scope)
      break
    case `dock-task-file`:
      makeDockTaskFile(scope)
      break
    case `form-file`:
      makeFormFile(scope)
      break
    case `mine-file`:
      makeMineFile(scope)
      break
    case `mill-file`:
      makeMillFile(scope)
      break
    case `call-file`:
      makeCallFile(scope)
      break
    case `feed-file`:
      makeFeedFile(scope)
      break
    case `test-file`:
      makeTestFile(scope)
      break
    case `view-file`:
      makeViewFile(scope)
      break
    default:
      throw file.mint
      break
  }
  return scope
}

function makeTaskFile(fileScope) {
  fileScope.importPaths.forEach(load => {
    makeLoad(fileScope, load)
  })

  fileScope.task = []

  fileScope.file.task.forEach(task => {
    fileScope.task.push(makeTask(fileScope, task))
  })

  fileScope.call = []

  fileScope.file.call.forEach(call => {
    fileScope.call.push(call)
  })
}

function makeCallFile(file) {
  const text = []
  const code = []
  code.push(...makeTaskHead())
  file.load.forEach((load, i) => {
    code.push(...makeLoad(load, i))
  })
  if (file.load.length) {
    code.push(``)
  }
  file.call.forEach(call => {
    code.push(...makeCall(call))
  })
  code.forEach(line => {
    text.push(`  ${line}`)
  })
  return text
}

function makeFeedFile(file) {

}

function makeViewFile(bind) {
  const importPaths = getImportPaths(bind)
  importPaths.forEach(load => {
    makeLoad(bind, load)
  })
  makeFork(bind, 'file', { view: {} })
  bind.file.view.forEach(view => {
    makeView(bind, view)
  })
}

function makeTestFile(bind) {
  const importPaths = getImportPaths(bind)
  importPaths.forEach(load => {
    makeLoad(bind, load)
  })
  bind.file.test.forEach(test => {
    makeTest(bind, test)
  })
}

function makeLoad(fileScope, load) {
  const requireName = getNextNameFromScope(fileScope)
  fileScope.requires.push({
    name: requireName,
    road: load.road
  })

  load.take.forEach(({ take, save }) => {
    const form = take.name
    const name = take.link[0].name
    const savedName = save ? save.link[0].name : name
    addFileScopeBinding(fileScope, requireName, [form, savedName])
  })
}

function makeTest(bind, test) {
  const key = bind.links.task.links[test.name].key
  reference(bind, key)
  bind.calls.push({
    form: 'call',
    name: key
  })
}

/**
 * This is a higher-level function.
 */

function makeTask(fileScope, task) {
  const params = []
  const wait = !!task.wait
  task.base.forEach(base => {
    params.push(AST.createIdentifier(base.name))
  })

  const body = []

  task.zone.forEach(zone => {
    switch (zone.form) {
      case `host`:
        body.push(makeHost(fileScope, zone))
        break
      case `save`:
        body.push(makeSave(fileScope, zone))
        break
      case `turn`:
        body.push(makeTurn(fileScope, zone))
        break
      case `call`:
        body.push(makeCall(fileScope, zone))
        break
    }
  })

  const fxnAST = AST.createFunctionDeclaration(
    AST.createIdentifier(task.name),
    params,
    body,
    { async: wait }
  )
  return fxnAST
}

function makeSave(zone, bind) {
  const left = makeNest(zone.base)
  const right = makeSift(zone.head)
  return AST.createAssignmentExpression(left, right)
}

function makeHost(fileScope, zone) {
  const left = AST.createIdentifier(zone.name)
  const right = zone.sift && makeSift(zone.sift)
  return AST.createVariable(
    'let',
    left,
    right
  )
}

function makeTurn(fileScope, zone) {
  const argument = makeSift(zone.sift)
  return AST.createReturnStatement(argument)
}

function makeCall(fileScope, call) {
  const wait = !!call.wait
  const args = []

  call.bind.forEach(b => {
    const arg = b.sift.form === 'task'
      ? makeTask(fileScope, b.sift)
      : makeSift(fileScope, b.sift)
    args.push(arg)
  })

  call.hook.forEach(h => {
    const params = []
    h.base.forEach(b => {
      params.push(AST.createIdentifier(b.name))
    })
    const body = []
    h.zone.forEach(zone => {
      switch (zone.form) {
        case `host`:
          body.push(makeHost(zone, bind))
          break
        case `save`:
          body.push(makeSave2(zone))
          break
        case `turn`:
          body.push(makeTurn(zone))
          break
        case `call`:
          body.push(makeCall(zone, fileScope))
          break
      }
    })

    const fxnAST = AST.createFunctionDeclaration(null, params, body)
    args.push(fxnAST)
  })

  return AST.createCallExpression(
    AST.createIdentifier(call.name),
    args,
    { await: wait }
  )
}

function makeNest(nest, fileScope) {
  const path = nest.stem.map((stem, i) => {
    switch (stem.form) {
      case 'term':
        if (i === 0) {
          return fileScope ? getName(fileScope, [stem.name]) : stem.name
        } else {
          return `['${stem.name}']`
        }
        break
    }
  }).join('')
  return path
}

function makeSift(sift, fileScope = {}) {
  switch (sift.form) {
    case `sift-text`: return AST.createLiteral(sift.text)
    case `text`: return AST.createLiteral(sift.text)
    case `size`: return AST.createLiteral(sift.size)
    case `link`: return makeNest(fileScope, sift.nest)
  }
}

function makeDockTaskFile(fileScope) {
  fileScope.file.load.forEach(load => {
    makeLoad(fileScope, load)
  })
  fileScope.file.task.forEach(task => {
    makeDockTask(fileScope, task)
  })
  fileScope.file.call.forEach(call => {
    fileScope.callCalls.push(call)
  })
}

/**
 * This is a native JavaScript function.
 */

function makeDockTask(bind, task) {
  const params = []
  const initializers = []
  task.base.forEach(base => {
    if (base.base) {
      initializers.push(base)
    } else {
      params.push(`${base.name}`)
    }
  })
  const text = [`return function(){`]
  text.push(`return function(${params.join(', ')}){`)
  initializers.forEach(base => {
    text.push(`  if (${base.name} == null) {`)
    if (base.base.form === 'text') {
      text.push(`    ${base.name} = '${base.base.sift}'`)
    } else {
      text.push(`    ${base.name} = ${base.base.sift}`)
    }
    text.push(`  }`)
    text.push(``)
  })
  task.zone.forEach(zone => {
    switch (zone.form) {
      case `call`:
        makeDockCall(zone, bind).forEach(line => {
          text.push(`  ${line}`)
        })
        break
    }
  })
  text.push('}')
  text.push('}')
  const func = new Function(text.join('\n'))()
  makeFork(bind, 'file/task', {
    [task.name]: {
      base: task,
      call: func
    }
  })
  return text
}

function makeDockCall(call, fileScope) {
  const turn = call.zone.filter(zone => zone.form === 'call-turn')[0]
  let head = ''
  if (turn) {
    head = `return `
  }
  let base
  switch (call.name) {
    case `make`:
      base = makeDockCallMake(call)
      break
    case `test`:
      base = makeDockCallTest(call, fileScope)
      break
    case `test-fall`:
      base = makeDockCallTestFall(call)
      break
    case `look`: // debugger
      base = makeDockCallLook(call)
      break
    case `call-base`: // method
      base = makeDockCallCallBase(call, fileScope)
      break
    case `call-function`: // function
      base = makeDockCallCallFunction(call, fileScope)
      break
    case `call-head`: // unary operation
      base = makeDockCallCallHead(call)
      break
    case `call-twin`: // binary operation
      base = makeDockCallCallTwin(call)
      break
    case `call-try`: // try/catch
      base = makeDockCallCallTry(call)
      break
    case `test-else`: // if/else
      base = makeDockCallTestElse(call)
      break
    case `loop`: // while loop
      base = makeDockCallLoop(call)
      break
    case `debug`: // debugger
      base = makeDockCallDebug(call)
      break
    case `call-keyword`: // typeof
      base = makeDockCallKeyword(call)
      break
    case `call-keyword-2`: // instanceof
      base = makeDockCallKeyword2(call)
      break
    case `set-dynamic-aspect`:
      base = makeDockCallSetDynamicAspect(call)
      break
    case `get-dynamic-aspect`:
      base = makeDockCallGetDynamicAspect(call)
      break
    case `delete`:
      base = makeDockCallDelete(call)
      break
    case `create-literal`:
      base = makeDockCallCreateLiteral(call)
      break
  }
  return `${head}${base}`.split('\n')
}

function makeDockCallCreateLiteral(call) {
  const text = []
  const literal = call.bind.filter(bind => bind.name === 'literal')[0]
  text.push(literal.sift.text)
  return text.join('\n')
}

function makeDockCallDelete(call) {
  const text = []
  const object = call.bind.filter(bind => bind.name === 'object')[0]
  const aspect = call.bind.filter(bind => bind.name === 'aspect')[0]
  text.push(`delete ${makeNest(object.sift.nest)}[${makeNest(aspect.sift.nest)}]`)
  return text.join('\n')
}

function makeDockCallGetDynamicAspect(call) {
  const text = []
  const object = call.bind.filter(bind => bind.name === 'object')[0]
  const aspect = call.bind.filter(bind => bind.name === 'aspect')[0]
  text.push(`${makeNest(object.sift.nest)}[${makeNest(aspect.sift.nest)}]`)
  return text.join('\n')
}

function makeDockCallSetDynamicAspect(call) {
  const text = []
  const object = call.bind.filter(bind => bind.name === 'object')[0]
  const aspect = call.bind.filter(bind => bind.name === 'aspect')[0]
  const factor = call.bind.filter(bind => bind.name === 'factor')[0]
  text.push(`${makeNest(object.sift.nest)}[${makeNest(aspect.sift.nest)}] = ${makeNest(factor.sift.nest)}`)
  return text.join('\n')
}

function makeDockCallKeyword2(call) {
  const text = []
  const left = call.bind.filter(bind => bind.name === 'left')[0]
  const keyword = call.bind.filter(bind => bind.name === 'keyword')[0]
  const right = call.bind.filter(bind => bind.name === 'right')[0]
  text.push(`${makeNest(left.sift.nest)} ${keyword.sift.text} ${makeNest(right.sift.nest)}`)
  return text.join('\n')
}

function makeDockCallKeyword(call) {
  const text = []
  const keyword = call.bind.filter(bind => bind.name === 'keyword')[0]
  const value = call.bind.filter(bind => bind.name === 'value')[0]
  text.push(`${keyword.sift.text} ${makeNest(value.sift.nest)}`)
  return text.join('\n')
}

function makeDockCallDebug(call) {
  const text = []
  const keyword = call.bind.filter(bind => bind.name === 'keyword')[0]
  text.push(`${keyword.sift.text}`)
  return text.join('\n')
}

function makeDockCallLoop(call) {
  const text = []
  const check = call.bind.filter(bind => bind.name === 'check')[0]
  const block = call.bind.filter(bind => bind.name === 'block')[0]
  text.push(`while (${makeNest(check.sift.nest)}()) {`)
  text.push(`  ${makeNest(block.sift.nest)}()`)
  text.push(`}`)
  return text.join('\n')
}

function makeDockCallTestElse(call) {
  const text = []
  const check = call.bind.filter(bind => bind.name === 'check')[0]
  const block = call.bind.filter(bind => bind.name === 'block')[0]
  const other = call.bind.filter(bind => bind.name === 'else')[0]
  text.push(`if (${makeNest(check.sift.nest)}()) {`)
  text.push(`  return ${makeNest(block.sift.nest)}()`)
  text.push(`} else {`)
  text.push(`  return ${makeNest(other.sift.nest)}()`)
  text.push(`}`)
  return text.join('\n')
}

function makeDockCallCallTry(call) {
  const text = []
  const block = call.bind.filter(bind => bind.name === 'block')[0]
  const error = call.bind.filter(bind => bind.name === 'error')[0]
  text.push(`try {`)
  text.push(`  ${makeNest(block.sift.nest)}()`)
  text.push(`} catch (e) {`)
  text.push(`  ${makeNest(error.sift.nest)}(e)`)
  text.push(`}`)
  return text.join('\n')
}

function makeDockCallCallHead(call) {
  const text = []
  const value = call.bind.filter(bind => bind.name === 'value')[0]
  const operation = call.bind.filter(bind => bind.name === 'operation')[0]
  text.push(`${operation.sift.text}${makeNest(value.sift.nest)}`)
  return text.join('\n')
}

function makeDockCallCallTwin(call) {
  const text = []
  const left = call.bind.filter(bind => bind.name === 'left')[0]
  const right = call.bind.filter(bind => bind.name === 'right')[0]
  const operation = call.bind.filter(bind => bind.name === 'operation')[0]
  text.push(`${makeNest(left.sift.nest)} ${operation.sift.text} ${right.sift.nest ? makeNest(right.sift.nest) : `${right.sift.text}`}`)
  return text.join('\n')
}

function makeDockCallMake(call) {
  const text = []
  const ctor = call.bind[0]
  const factor = call.bind.slice(1)
  const bind = []
  factor.forEach(factor => {
    bind.push(`${makeNest(factor.sift.nest)}`)
  })
  text.push(`new ${ctor.sift.text}(${bind.join(', ')})`)
  return text.join('\n')
}

function makeDockCallCallBase(call, fileScope) {
  const text = []
  const object = call.bind[0]
  const method = call.bind[1]
  const factor = call.bind.slice(2)
  const bind = []
  factor.forEach(factor => {
    bind.push(`${makeNest(factor.sift.nest, fileScope)}`)
  })
  if (object.sift.form === 'link') {
    text.push(`${makeNest(object.sift.nest, fileScope)}.${method.sift.text}(${bind.join(', ')})`)
  } else {
    const obj = getName(fileScope, object.sift.text)
    text.push(`${obj}.${method.sift.text}(${bind.join(', ')})`)
  }
  return text.join('\n')
}

function makeDockCallCallFunction(call, fileScope) {
  const text = []
  const func = call.bind[0]
  const factor = call.bind.slice(1)
  const bind = []
  factor.forEach(factor => {
    bind.push(`${makeNest(factor.sift.nest, fileScope)}`)
  })
  text.push(`${func.sift.text}(${bind.join(', ')})`)
  return text.join('\n')
}

function makeDockCallTest(call, fileScope) {
  const text = []
  const test = call.bind[0]
  const make = call.bind[1]
  text.push(`if (${makeNest(test.sift.nest, fileScope)}()) {`)
  text.push(`  return ${makeNest(make.sift.nest, fileScope)}()`)
  text.push(`}`)
  return text.join('\n')
}

function makeDockCallLook() {
  return `debugger`
}

function getImportPaths(bind, list = []) {
  bind.file.load.forEach(load => {
    makeLoadRoad(bind.file.road, load, list)
  })
  return list
}

function makeLoadRoad(baseRoad, load, list) {
  if (load.road.match(/^@/)) {
    if (load.take.length) {
      list.push({ road: load.road, take: load.take })
    } else {
      const road = load.road
      load.load.forEach(load => {
        makeLoadRoad(road, load, list)
      })
    }
  } else {
    const road = pathResolver.join(baseRoad, load.road)
    if (load.take.length) {
      list.push({ road, take: load.take })
    } else {
      load.load.forEach(load => {
        makeLoadRoad(road, load, list)
      })
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

function reference(bind, name) {
  bind.names[name] = true
}
