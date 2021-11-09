
const fs = require('fs')
const pathResolver = require('path')
const HEAD = fs.readFileSync('./make/head/index.js', 'utf-8')

module.exports = make

function make(file, deck) {
  const text = []
  const list = [file]
  const last = []
  const knit = {}
  while (list.length) {
    const base = list.shift()
    text.push(``)
    if (knit[base.road]) {
      continue
    }
    knit[base.road] = true
    makeFile(base, last).forEach(line => {
      text.push(line)
    })
    const roadList = makeRoad(base)
    roadList.forEach(load => {
      list.push(deck[load.road])
    })
  }
  text.forEach((line, i) => {
    if (line.trim()) {
      text[i] = line
    } else {
      text[i] = line.trim()
    }
  })
  return HEAD + text.join('\n').trim() + '\n\n' + last.join('\n') + '\n'
}

function makeFile(file, last) {
  const text = []
  const calls = []
  const roadList = makeRoad(file)
  text.push(`base.bind('${file.road}', file => {`)
  let code
  switch (file.mint) {
    case `task-file`:
      code = makeTaskFile(file, roadList)
      break
    case `dock-task-file`:
      code = makeDockTaskFile(file, roadList)
      break
    case `form-file`:
      code = makeFormFile(file, roadList, calls)
      break
    case `mine-file`:
      code = makeMineFile(file)
      break
    case `mill-file`:
      code = makeMillFile(file)
      break
    case `call-file`:
      code = makeCallFile(file)
      break
    case `feed-file`:
      code = makeFeedFile(file)
      break
    case `test-file`:
      code = makeTestFile(file, calls)
      break
    case `view-file`:
      code = makeViewFile(file, calls)
      break
    default:
      throw file.mint
      break
  }
  code.forEach(line => {
    text.push(`${line}`)
  })
  text.push(`})`)
  if (calls.length) {
    last.push(`base.link('${file.road}')`)
  }
  return text
}

function makeTaskFile(file) {
  const text = []
  const code = []
  const formKnit = {}
  const roadList = makeRoad(file)
  roadList.forEach((load, i) => {
    code.push(...makeLoad(load, i, formKnit))
  })
  if (roadList.length) {
    code.push(``)
  }
  code.push(...makeTaskHead())
  file.task.forEach(task => {
    code.push(...makeTask(task, formKnit))
  })
  code.forEach(line => {
    text.push(`  ${line}`)
  })
  return text
}

function makeFormFile(file, roadList, calls) {
  const text = []
  const code = []
  const knit = {}
  roadList.forEach((load, i) => {
    code.push(...makeLoad(load, i, knit))
  })
  if (file.load.length) {
    code.push(``)
  }
  code.push(...makeFormHead())
  calls.push(true)
  file.form.forEach(form => {
    code.push(``)
    code.push(...makeForm(form, knit))
  })
  const binds = []
  file.form.forEach(form => {
    binds.push(...takeForm(form, knit))
  })
  if (binds.length) {
    if (file.form.length) {
      code.push(``)
    }
    code.push(`file.bind(function(){`)
    code.push(...binds)
    code.push(`})`)
  }
  code.forEach(line => {
    text.push(`  ${line}`)
  })
  return text
}

function takeView(view, formKnit) {
  const text = []
  let path = []
  view.zone.forEach((zone, i) => {
    if (zone.form === 'mesh') {
      const childPath = path.concat(i).map(x => `[${x}]`).join('')
      const name = toMethodName(zone.name)
      const bind = formKnit[name] ? formKnit[name] : `file.view.${name}`
      text.push(`  file.view.${toMethodName(view.name)}.zone${childPath}.case = ${bind}`)
    }
  })
  return text
}

function takeForm(form, formKnit) {
  const text = []
  if (form.base) {
    Object.keys(form.base).forEach(name => {
      const base = form.base[name]
      if (base.case) {
        switch (base.case.form) {
          case 'form':
          case 'list':
            const name = toMethodName(base.case.name)
            const bind = formKnit[name] ? formKnit[name] : `file.form.${name}`
            text.push(`  file.form.${toMethodName(form.name)}.base['${base.name}'].case.bind = ${bind}`)
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
            const bind = formKnit[name] ? formKnit[name] : `file.form.${name}`
            text.push(`  file.form.${toMethodName(form.name)}.case['${base.name}'].case.bind = ${bind}`)
            break
        }
      }
    })
  }
  return text
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

function makeViewFile(file, calls) {
  const text = []
  const code = []
  const knit = {}
  const roadList = makeRoad(file)
  roadList.forEach((load, i) => {
    code.push(...makeLoad(load, i, knit))
  })
  if (roadList.length) {
    code.push(``)
  }
  code.push(`file.view = {}`)
  file.view.forEach(view => {
    code.push(``)
    makeView(view, knit).forEach(line => {
      code.push(`${line}`)
    })
  })
  const binds = []
  calls.push(true)
  file.view.forEach(form => {
    binds.push(...takeView(form, knit))
  })
  if (binds.length) {
    if (file.view.length) {
      code.push(``)
    }
    code.push(`file.bind(function(){`)
    code.push(...binds)
    code.push(`})`)
  }
  code.forEach(line => {
    text.push(`  ${line}`)
  })
  return text
}

function makeTestFile(file, calls) {
  const text = []
  const code = []
  const roadList = makeRoad(file)
  const formKnit = {}
  roadList.forEach((load, i) => {
    code.push(...makeLoad(load, i, formKnit))
  })
  if (file.load.length) {
    code.push(``)
  }
  code.push(`file.bind(function(){`)
  calls.push(true)
  file.test.forEach(test => {
    makeTest(test, formKnit).forEach(line => {
      code.push(`  ${line}`)
    })
  })
  code.push(`})`)
  code.forEach(line => {
    text.push(`  ${line}`)
  })
  return text
}

function makeTaskHead() {
  return makeHead(`task`)
}

function makeFormHead() {
  return makeHead(`form`)
}

function makeTestHead() {
  return makeHead(`test`)
}

function makeHead(name) {
  return [`file.${name} = {}`]
}

function makeLoad(load, i, formKnit = {}) {
  // how to handle the load structure, what even is the load structure?
  const text = []

  load.take.forEach(({ take, save }) => {
    const form = toMethodName(take.name)
    const name = toMethodName(take.link[0].name)
    const savedName = save ? toMethodName(save.link[0].name) : name
    formKnit[savedName] = `x${i + 1}.${form}.${name}`
  })

  text.push(`const x${i + 1} = base.load('${load.road}')`)
  return text
}

function makeForm(form, formKnit) {
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

function makeView(view, formKnit) {
  const text = []
  const name = formKnit[toMethodName(view.name)]
  const json = customJSONStringify(view)
  json.forEach((line, i) => {
    if (i === 0) {
      json[i] = line
    } else {
      json[i] = `  ${line}`
    }
  })
  text.push(`file.view.${toMethodName(view.name)} = ${json.join('\n')}`)
  return text
}

function makeTest(test, formKnit) {
  const text = []
  text.push(`${formKnit[toMethodName(test.name)]}()`)
  return text
}

/**
 * This is a higher-level function.
 */

function makeTask(task, formKnit) {
  const text = []
  const params = []
  const initializers = []
  const wait = !!task.wait
  task.base.forEach(base => {
    if (base.sift) {
      initializers.push(base)
    }
    params.push(`${toMethodName(base.name)}`)
  })
  formKnit[toMethodName(task.name)] = `file.task.${toMethodName(task.name)}`
  text.push(``)
  const prefix = wait ? `async ` : ``
  text.push(`file.task.${toMethodName(task.name)} = ${prefix}function(${params.join(', ')}){`)
  initializers.forEach(base => {
    text.push(`  if (${toMethodName(base.name)} == null) {`)
    if (base.sift.form === 'text') {
      text.push(`    ${toMethodName(base.name)} = '${makeSift(base.sift)}'`)
    } else {
      text.push(`    ${toMethodName(base.name)} = ${makeSift(base.sift)}`)
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
        makeCall(zone, formKnit).forEach(line => {
          text.push(`  ${line}`)
        })
        break
    }
  })
  text.push('}')
  return text
}

function makeInlineTask(task, formKnit) {
  const text = []
  const params = []
  const initializers = []
  task.base.forEach(base => {
    if (base.sift) {
      initializers.push(base)
    }
    params.push(`${toMethodName(base.name)}`)
  })
  text.push(``)
  text.push(`function ${toMethodName(task.name)}(${params.join(', ')}){`)
  initializers.forEach(base => {
    text.push(`  if (${toMethodName(base.name)} == null) {`)
    if (base.sift.form === 'text') {
      text.push(`    ${toMethodName(base.name)} = '${makeSift(base.sift)}'`)
    } else {
      text.push(`    ${toMethodName(base.name)} = ${makeSift(base.sift)}`)
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
        makeCall(zone, formKnit).forEach(line => {
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

function makeCall(call, formKnit) {
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
    mean = `${makeNest(save.nest)} = `
  }
  if (wait) {
    mean = `${mean}await `
  }
  const methodName = formKnit[toMethodName(call.name)] || toMethodName(call.name)
  text.push(`${mean}${methodName}(`)
  call.bind.forEach(b => {
    const sift = b.sift.form === 'task' ? makeInlineTask(b.sift, formKnit).join('\n  ').trim() : makeSift(b.sift)
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
          makeCall(zone, formKnit).forEach(line => {
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

function makeNest(nest) {
  return nest.stem.map((stem, i) => {
    switch (stem.form) {
      case 'term':
        if (i === 0) {
          return toMethodName(stem.name)
        } else {
          return `.${toMethodName(stem.name)}`
        }
        break
    }
  }).join('')
}

function makeSift(sift) {
  switch (sift.form) {
    case `sift-text`: return `'${sift.text}'`
    case `text`: return `'${sift.text}'`
    case `size`: return `${sift.size}`
    case `sift-mark`: return `${sift.mark}`
    case `link`: return makeNest(sift.nest)
  }
}

function makeDockTaskFile(file) {
  const text = []
  const code = []
  file.load.forEach((load, i) => {
    code.push(...makeLoad(load, i))
  })
  if (file.load.length) {
    code.push(``)
  }
  code.push(...makeTaskHead())
  file.task.forEach(task => {
    code.push(...makeDockTask(task))
  })
  code.forEach(line => {
    text.push(`  ${line}`)
  })
  return text
}

/**
 * This is a native JavaScript function.
 */

function makeDockTask(task) {
  const text = []
  const params = []
  const initializers = []
  task.base.forEach(base => {
    if (base.base) {
      initializers.push(base)
    } else {
      params.push(`${toMethodName(base.name)}`)
    }
  })
  text.push(``)
  text.push(`file.task.${toMethodName(task.name)} = function(${params.join(', ')}){`)
  initializers.forEach(base => {
    text.push(`  if (${toMethodName(base.name)} == null) {`)
    if (base.base.form === 'text') {
      text.push(`    ${toMethodName(base.name)} = '${base.base.sift}'`)
    } else {
      text.push(`    ${toMethodName(base.name)} = ${base.base.sift}`)
    }
    text.push(`  }`)
    text.push(``)
  })
  task.zone.forEach(zone => {
    switch (zone.form) {
      case `call`:
        makeDockCall(zone).forEach(line => {
          text.push(`  ${line}`)
        })
        break
    }
  })
  text.push('}')
  return text
}

function makeDockCall(call) {
  const turn = call.zone.filter(zone => zone.form === 'call-turn')[0]
  const text = []
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
      base = makeDockCallTest(call)
      break
    case `test-fall`:
      base = makeDockCallTestFall(call)
      break
    case `look`: // debugger
      base = makeDockCallLook(call)
      break
    case `call-base`: // method
      base = makeDockCallCallBase(call)
      break
    case `call-function`: // function
      base = makeDockCallCallFunction(call)
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

function makeDockCallCallBase(call) {
  const text = []
  const object = call.bind[0]
  const method = call.bind[1]
  const factor = call.bind.slice(2)
  const bind = []
  factor.forEach(factor => {
    bind.push(`${makeNest(factor.sift.nest)}`)
  })
  if (object.sift.form === 'link') {
    text.push(`${makeNest(object.sift.nest)}.${method.sift.text}(${bind.join(', ')})`)
  } else {
    text.push(`${object.sift.text}.${method.sift.text}(${bind.join(', ')})`)
  }
  return text.join('\n')
}

function makeDockCallCallFunction(call) {
  const text = []
  const func = call.bind[0]
  const factor = call.bind.slice(1)
  const bind = []
  factor.forEach(factor => {
    bind.push(`${makeNest(factor.sift.nest)}`)
  })
  text.push(`${func.sift.text}(${bind.join(', ')})`)
  return text.join('\n')
}

function makeDockCallTest(call) {
  const text = []
  const test = call.bind[0]
  const make = call.bind[1]
  text.push(`if (${makeNest(test.sift.nest)}()) {`)
  text.push(`  return ${makeNest(make.sift.nest)}()`)
  text.push(`}`)
  return text.join('\n')
}

function makeDockCallLook() {
  return `debugger`
}

function makeRoad(file, list = []) {
  file.load.forEach(load => {
    makeLoadRoad(file.road, load, list)
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

function toMethodName(term) {
  return term.replace(/\-/g, '_')
}

function customJSONStringify(o) {
  return JSON.stringify(o, null, 2)
    .split(/\n/)
    .map(line => {
      if (line.match(/^ +"([^-"]+)": "([^"]+)"/)) {
        return line.replace(/^( +)"([^"]+)": "([^"]+)"/, "$1$2: '$3'")
      } else if (line.match(/^ +"([^-"]+)"/)) {
        return line.replace(/^( +)"([^"]+)"/, "$1$2")
      } else if (line.match(/^ +"([^"]+)"/)) {
        return line.replace(/^( +)"([^"]+)"/, "$1'$2'")
      } else {
        return line
      }
    })
}
