
// https://stackoverflow.com/questions/68850952/how-can-you-reverse-this-pseudo-prng-to-get-back-the-original-number

const fs = require('fs')
const pathResolver = require('path')
const HEAD = fs.readFileSync('./make/head/index.js', 'utf-8')

module.exports = make

function createFileBind(file) {
  return {
    file,
    variableIndex: 1,
    names: {},
    links: {},
    requires: [],
    commands: [],
    bindings: [],
  }
}

function getFileBindName(bind) {
  const name = `x${bind.variableIndex++}`
  bind.names[name] = false
  return name
}

function addFileBindTake(bind, requireKey, path) {
  let links = bind.links
  let search = path.concat()
  let variableKey

  reference(bind, requireKey)

  while (search.length) {
    variableKey = getFileBindName(bind)
    let pathNode = search.shift()
    let ref = links[pathNode] = links[pathNode] || {
      key: variableKey,
      links: {}
    }
    links = ref.links
  }

  bind.bindings.push({
    form: 'read',
    name: variableKey,
    requireKey,
    path
  })
}

function resolveFileBind(fileBind) {
  const newFileBind = createFileBind(fileBind.file)
  const nameMap = {}
  let i = 1
  Object.keys(fileBind.names).forEach(name => {
    const isUsed = fileBind.names[name]
    if (isUsed) {
      const newName = `x${i++}`
      nameMap[name] = newName
      newFileBind.names[newName] = true
    }
  })
  fileBind.requires.forEach(req => {
    const isUsed = fileBind.names[req.name]
    if (isUsed) {
      newFileBind.requires.push({
        ...req,
        name: nameMap[req.name]
      })
    }
  })
  fileBind.bindings.forEach(req => {
    newFileBind.bindings.push({
      ...req,
      name: nameMap[req.name]
    })
  })
  fileBind.commands.forEach(command => {
    switch (command.form) {
      case 'fork':
        const isUsed = fileBind.names[command.variableKey]
        const variableKey = isUsed ? nameMap[command.variableKey] : null
        newFileBind.commands.push({
          ...command,
          variableKey
        })
        break
      default:
        newFileBind.commands.push(command)
        break
    }
  })
  return newFileBind
}

function make(file, deck) {
  const list = [file]
  const roadKnit = {}
  const fileBindList = []
  while (list.length) {
    const base = list.shift()
    if (roadKnit[base.road]) {
      continue
    }
    roadKnit[base.road] = true
    const fileBind = makeFile(base)
    fileBindList.push(fileBind)
    const roadList = makeRoad({ file: base })
    roadList.forEach(load => {
      list.push(deck[load.road])
    })
  }

  const text = makeText(fileBindList)
  return text.join('\n').trim() + '\n'
}

function makeText(oldBinds) {
  const fileBindList = oldBinds.map(resolveFileBind)
  const link = fileBindList.filter(x => x.link)

  const text = [HEAD]

  fileBindList.forEach(bind => {
    text.push(``)

    text.push(`base.bind('${bind.file.road}', file => {`)

    bind.requires.forEach(req => {
      text.push(`  const ${req.name} = base.load('${req.road}')`)
    })

    if (bind.requires.length) {
      text.push(``)
    }

    bind.bindings.forEach(binding => {
      text.push(`  let ${binding.name}`)
    })

    if (bind.bindings.length) {
      text.push(``)
    }

    bind.commands.forEach(command => {
      switch (command.form) {
        case 'string':
          text.push(`  ${command.host}.save('${command.name}', '${command.blob}')`)
          break
        case 'number':
        case 'boolean':
        case 'null':
          text.push(`  ${command.host}.save('${command.name}', ${command.blob})`)
          break
        case 'fork':
          if (command.variableKey) {
            text.push(`  const ${command.variableKey} = ${command.host}.fork('${command.name}')`)
          } else {
            text.push(`  ${command.host}.fork('${command.name}')`)
          }
          break
      }
    })

    if (bind.bindings.length) {
      text.push(`  file.bind(() => {`)
      bind.bindings.forEach(binding => {
        switch (binding.form) {
          case 'read':

            break
          case 'call':
            text.push(`    ${binding.name}()`)
            break
        }
      })
      text.push(`    `)
      text.push(`  })`)
    }

    text.push(`})`)
  })

  if (link.length) {
    text.push(``)
    link
      .reverse()
      .map(x => text.push(`file.link('${x.road}')`))
  }

  text.forEach((line, i) => {
    if (line.trim()) {
      text[i] = line
    } else {
      text[i] = line.trim()
    }
  })

  return text
}

function makeFile(file, last) {
  const bind = createFileBind(file)
  switch (file.mint) {
    case `task-file`:
      makeTaskFile(bind)
      break
    case `dock-task-file`:
      makeDockTaskFile(bind)
      break
    case `form-file`:
      makeFormFile(bind)
      break
    case `mine-file`:
      makeMineFile(bind)
      break
    case `mill-file`:
      makeMillFile(bind)
      break
    case `call-file`:
      makeCallFile(bind)
      break
    case `feed-file`:
      makeFeedFile(bind)
      break
    case `test-file`:
      makeTestFile(bind)
      break
    case `view-file`:
      makeViewFile(bind)
      break
    default:
      throw file.mint
      break
  }
  return bind
}

function makeTaskFile(bind) {
  const roadList = makeRoad(bind)
  roadList.forEach(load => {
    makeLoad(bind, load)
  })
  makeFork(bind, 'file', { task: {} })
  bind.file.task.forEach(task => {
    makeTask(bind, task)
  })
  bind.file.call.forEach(call => {
    makeFileCall(bind, call)
  })
}

function makeFileCall(bind, call) {
  return makeCall(call, bind)
}

function makeFormFile(file, roadList, calls) {
  const text = []
  const code = []
  const loadState = {
    forkCount: 1,
    forkKeys: {},
    requires: [],
    variables: [],
    bindings: [],
    names: {}
  }
  roadList.forEach((load, i) => {
    makeLoad(load, i, loadState)
  })
  code.push(...makeInitialLoadState(loadState))
  if (file.load.length) {
    code.push(``)
  }
  code.push(...makeFormHead())
  calls.push(true)
  file.form.forEach(form => {
    code.push(``)
    code.push(...makeForm(form, knit))
  })
  file.form.forEach(form => {
    loadState.bindings.push(...takeForm(form, knit))
  })
  code.push(...makeBindingState(loadState))
  code.forEach(line => {
    text.push(`  ${line}`)
  })
  return text
}

function takeView(view, { names }) {
  const bindings = []
  let path = []
  view.zone.forEach((zone, i) => {
    if (zone.form === 'mesh') {
      const childPath = path.concat(i).map(x => `[${x}]`).join('')
      const name = toMethodName(zone.name)
      const bind = names[name] ? names[name] : `file.view.${name}`
      bindings.push({
        name: `file.view.${toMethodName(view.name)}.zone${childPath}.case`,
        value: `${bind}`
      })
    }
  })
  return bindings
}

function takeForm(form, formKnit) {
  const bindings = []
  if (form.base) {
    Object.keys(form.base).forEach(name => {
      const base = form.base[name]
      if (base.case) {
        switch (base.case.form) {
          case 'form':
          case 'list':
            const name = toMethodName(base.case.name)
            const bind = formKnit.names[`form/${name}`] ? formKnit.names[`form/${name}`] : `file.form.${name}`
            bindings.push({
              name: `file.form.${toMethodName(form.name)}.base['${base.name}'].case.bind`,
              value: `${bind}`
            })
            break
        }
      }
    })
  } else if (form.case) {
    Object.keys(form.case).forEach(name => {
      const base = form.case[name]
      if (base.case) {
        switch (base.case.form) {
          case 'form':
          case 'list':
            const name = toMethodName(base.case.name)
            const bind = formKnit[`form/${name}`] ? formKnit[`form/${name}`] : `file.form.${name}`
            bindings.push({
              name: `file.form.${toMethodName(form.name)}.case['${base.name}'].case.bind`,
              value: `${bind}`
            })
            break
        }
      }
    })
  }
  return bindings
}

function makeMineFile(file) {

}

function makeMillFile(file) {

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
  const roadList = makeRoad(bind)
  roadList.forEach(load => {
    makeLoad(bind, load)
  })
  makeFork(bind, 'file', { view: {} })
  bind.file.view.forEach(view => {
    makeView(bind, view)
  })
}

function makeTestFile(bind) {
  const roadList = makeRoad(bind)
  roadList.forEach(load => {
    makeLoad(bind, load)
  })
  bind.file.test.forEach(test => {
    makeTest(bind, test)
  })
}

function makeLoad(bind, load) {
  const requireName = getFileBindName(bind)
  bind.requires.push({
    name: requireName,
    road: load.road
  })

  load.take.forEach(({ take, save }) => {
    const form = take.name
    const name = take.link[0].name
    const savedName = save ? save.link[0].name : name
    addFileBindTake(bind, requireName, [form, savedName])
  })
}

function makeForm(form) {
  const text = []
  const json = customJSONStringify(form)
  json.forEach((line, i) => {
    if (i === 0) {
      json[i] = line
    } else {
      json[i] = `  ${line}`
    }
  })
  text.push(`file.form.${toMethodName(form.name)} = ${json.join('\n')}`)
  return text
}

function makeView(bind, view) {
  makeFork(bind, 'file/view', {
    [view.name]: view
  })
}

function makeTest(bind, test) {
  const key = bind.links.task.links[test.name].key
  reference(bind, key)
  bind.bindings.push({
    form: 'call',
    name: key
  })
}

/**
 * This is a higher-level function.
 */

function makeTask(bind, task) {
  const params = []
  const initializers = []
  const wait = !!task.wait
  task.base.forEach(base => {
    if (base.sift) {
      initializers.push(base)
    }
    params.push(`${base.name}`)
  })
  const prefix = wait ? `async ` : ``
  const t = [`return function(){`]
  t.push(`return ${prefix}function(${params.join(', ')}){`)

  initializers.forEach(base => {
    t.push(`  if (${base.name} == null) {`)
    if (base.sift.form === 'text') {
      t.push(`    ${base.name} = '${makeSift(base.sift)}'`)
    } else {
      t.push(`    ${base.name} = ${makeSift(base.sift)}`)
    }
    t.push(`  }`)
    t.push(``)
  })

  task.zone.forEach(zone => {
    switch (zone.form) {
      case `host`:
        makeHost(zone).forEach(line => {
          t.push(`  ${line}`)
        })
        break
      case `save`:
        // x[y] = a.b
        // x = a
        // x = 10
        makeSave(zone).forEach(line => {
          t.push(`  ${line}`)
        })
        break
      case `turn`:
        makeTurn(zone).forEach(line => {
          t.push(`  ${line}`)
        })
        break
      case `call`:
        makeCall(zone, bind).forEach(line => {
          t.push(`  ${line}`)
        })
        break
    }
  })
  t.push(`}`)
  t.push('}')
  console.log(t.join('\n'))
  const func = new Function(t.join('\n'))()
  makeFork(bind, `file/task`, {
    [task.name]: {
      base: task,
      call: func
    }
  })
}

function makeInlineTask(task, loadState) {
  const text = []
  const params = []
  const initializers = []
  task.base.forEach(base => {
    if (base.sift) {
      initializers.push(base)
    }
    params.push(`${base.name}`)
  })
  text.push(``)
  text.push(`function ${task.name}(${params.join(', ')}){`)
  initializers.forEach(base => {
    text.push(`  if (${base.name} == null) {`)
    if (base.sift.form === 'text') {
      text.push(`    ${base.name} = '${makeSift(base.sift)}'`)
    } else {
      text.push(`    ${base.name} = ${makeSift(base.sift)}`)
    }
    text.push(`  }`)
    text.push(``)
  })
  task.zone.forEach(zone => {
    switch (zone.form) {
      case `host`:
        makeHost(zone).forEach(line => {
          text.push(`  ${line}`)
        })
        break
      case `save`:
        // x[y] = a.b
        // x = a
        // x = 10
        makeSave(zone).forEach(line => {
          text.push(`  ${line}`)
        })
        break
      case `turn`:
        makeTurn(zone).forEach(line => {
          text.push(`  ${line}`)
        })
        break
      case `call`:
        makeCall(zone, loadState).forEach(line => {
          text.push(`  ${line}`)
        })
        break
    }
  })
  text.push('}')
  return text
}

function makeSave(zone) {
  const left = makeNest(zone.base)
  const right = makeSift(zone.head)
  const text = [`${left} = ${right}`]
  return text
}

function makeSave2(zone) {
  const left = makeNest(zone.nest)
  const right = makeSift(zone.sift)
  const text = [`${left} = ${right}`]
  return text
}

function makeHost(zone) {
  const left = zone.name
  const right = zone.sift && makeSift(zone.sift)
  if (typeof right === 'undefined') {
    return [`let ${left}`]
  } else {
    return [`let ${left} = ${right}`]
  }
}

function makeTurn(zone) {
  const right = makeSift(zone.sift)
  const text = [`return ${right}`]
  return text
}

function makeCallTurn(zone) {

}

function makeCall(call, loadState) {
  // how to resolve all the various scenarios with the call?
  const turn = call.zone.filter(zone => zone.form === 'call-turn')[0]
  const save = call.zone.filter(zone => zone.form === 'call-save')[0]
  const wait = !!call.wait
  const text = []
  const bind = []
  let mean = ''
  if (turn) {
    mean = `return `
  } else if (save) {
    mean = `${makeNest(save.nest, loadState)} = `
  }
  if (wait) {
    mean = `${mean}await `
  }
  // require modules have to be explicit for webpack to parse them.
  const methodName = call.name === 'require'
    ? 'require'
    : loadState.names[`task/${call.name}`]
  text.push(`${mean}${methodName}(`)
  call.bind.forEach(b => {
    const sift = b.sift.form === 'task'
      ? makeInlineTask(b.sift, loadState).join('\n  ').trim()
      : makeSift(b.sift, loadState)
    bind.push(`  ${sift}`)
  })
  const hooks = []
  call.hook.forEach(h => {
    const hook = []
    hook.push(`  function(){`)
    h.zone.forEach(zone => {
      switch (zone.form) {
        case `host`:
          makeHost(zone).forEach(line => {
            hook.push(`    ${line}`)
          })
          break
        case `save`:
          // x[y] = a.b
          // x = a
          // x = 10
          makeSave2(zone).forEach(line => {
            hook.push(`    ${line}`)
          })
          break
        case `turn`:
          makeTurn(zone).forEach(line => {
            hook.push(`    ${line}`)
          })
          break
        case `call`:
          makeCall(zone, loadState).forEach(line => {
            hook.push(`    ${line}`)
          })
          break
      }
    })
    hook.push(`  }`)
    hooks.push(hook.join('\n'))
  })
  text.push(...[...bind, ...hooks].join(',\n').split('\n'))
  text.push(`)`)
  return text
}

function makeNest(nest, loadState = {}) {
  const path = nest.stem.map((stem, i) => {
    switch (stem.form) {
      case 'term':
        if (i === 0) {
          return stem.name
        } else {
          return `[${stem.name}]`
        }
        break
    }
  }).join('')
  const slashedPath = path.replace(/\./g, '/')
  if (loadState.names[slashedPath]) {
    return loadState.names[slashedPath]
  } else {
    return path
  }
}

function makeSift(sift, loadState = {}) {
  switch (sift.form) {
    case `sift-text`: return `'${sift.text}'`
    case `text`: return `'${sift.text}'`
    case `size`: return `${sift.size}`
    case `sift-mark`: return `${sift.mark}`
    case `link`: return makeNest(sift.nest, loadState)
  }
}

function makeDockTaskFile(bind) {
  bind.file.load.forEach(load => {
    makeLoad(bind, load)
  })
  makeFork(bind, `file`, {
    task: {}
  })
  bind.file.task.forEach(task => {
    makeDockTask(bind, task)
  })
  bind.file.call.forEach(call => {
    makeFileCall(bind, call)
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

function makeDockCall(call, loadState) {
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
      base = makeDockCallTest(call, loadState)
      break
    case `test-fall`:
      base = makeDockCallTestFall(call)
      break
    case `look`: // debugger
      base = makeDockCallLook(call)
      break
    case `call-base`: // method
      base = makeDockCallCallBase(call, loadState)
      break
    case `call-function`: // function
      base = makeDockCallCallFunction(call, loadState)
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

function makeDockCallCallBase(call, loadState) {
  const text = []
  const object = call.bind[0]
  const method = call.bind[1]
  const factor = call.bind.slice(2)
  const bind = []
  factor.forEach(factor => {
    bind.push(`${makeNest(factor.sift.nest, loadState)}`)
  })
  if (object.sift.form === 'link') {
    text.push(`${makeNest(object.sift.nest, loadState)}.${method.sift.text}(${bind.join(', ')})`)
  } else {
    text.push(`${object.sift.text}.${method.sift.text}(${bind.join(', ')})`)
  }
  return text.join('\n')
}

function makeDockCallCallFunction(call, loadState) {
  const text = []
  const func = call.bind[0]
  const factor = call.bind.slice(1)
  const bind = []
  factor.forEach(factor => {
    bind.push(`${makeNest(factor.sift.nest, loadState)}`)
  })
  text.push(`${func.sift.text}(${bind.join(', ')})`)
  return text.join('\n')
}

function makeDockCallTest(call, loadState) {
  const text = []
  const test = call.bind[0]
  const make = call.bind[1]
  text.push(`if (${makeNest(test.sift.nest, loadState)}()) {`)
  text.push(`  return ${makeNest(make.sift.nest, loadState)}()`)
  text.push(`}`)
  return text.join('\n')
}

function makeDockCallLook() {
  return `debugger`
}

function makeRoad(bind, list = []) {
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
      makeForkObject(bind, node, value)
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
