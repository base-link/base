
const fs = require('fs')
const pathResolver = require('path')
const HEAD = fs.readFileSync('./make/head/index.js', 'utf-8')

module.exports = make

function make(file, deck) {
  const text = []
  const list = [file]
  while (list.length) {
    const base = list.shift()
    text.push(``)
    makeFile(base).forEach(line => {
      text.push(line)
    })
    const roadList = makeRoad(base)
    roadList.forEach(load => {
      list.push(deck[load.road])
    })
  }
  return HEAD + text.join('\n')
}

function makeFile(file) {
  const text = []
  text.push(`base.load('${file.road}', file => {`)
  let code
  switch (file.mint) {
    case `task-file`:
      code = makeTaskFile(file)
      break
    case `dock-task-file`:
      code = makeDockTaskFile(file)
      break
    case `form-file`:
      code = makeFormFile(file)
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
      code = makeTestFile(file)
      break
  }
  code.forEach(line => {
    text.push(`  ${line}`)
  })
  text.push(`})`)
  return text
}

function makeTaskFile(file) {
  const text = []
  const code = []
  code.push(...makeTaskHead())
  file.load.forEach(load => {
    code.push(...makeLoad(load))
  })
  file.task.forEach(task => {
    code.push(...makeTask(task))
  })
  code.forEach(line => {
    text.push(`  ${line}`)
  })
  return text
}

function makeFormFile(file) {
  const text = []
  const code = []
  code.push(...makeFormHead())
  file.load.forEach(load => {
    code.push(...makeLoad(load))
  })
  file.form.forEach(form => {
    code.push(...makeForm(form))
  })
  code.forEach(line => {
    text.push(`  ${line}`)
  })
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
  file.load.forEach(load => {
    code.push(...makeLoad(load))
  })
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

function makeTestFile(file) {
  const text = []
  const code = []
  const roadList = makeRoad(file)
  roadList.forEach(load => {
    code.push(...makeLoad(load))
  })
  file.test.forEach(test => {
    code.push(...makeTest(test))
  })
  code.forEach(line => {
    text.push(line)
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
  return [`file.${name} = file.${name} || {}`]
}

function makeLoad(load) {
  // how to handle the load structure, what even is the load structure?
  const text = []
  load.take.forEach(take => {
    text.push(JSON.stringify(take) + ` = base.link('${load.road}')`)
  })
  return text
}

function makeTest(test) {
  const text = []
  text.push(`${toMethodName(test.name)}()`)
  return text
}

/**
 * This is a higher-level function.
 */

function makeTask(task) {
  const text = []
  const params = []
  const initializers = []
  task.base.forEach(base => {
    if (base.base) {
      initializers.push(base)
    } else {
      params.push(`${base.name}`)
    }
  })
  if (params.length > 1) {
    text.push(`file.${task.name} = function(`)
    text.push(...params.map(x => `  ${x}`).join(',\n').split('\n'))
    text.push('){')
  } else {
    text.push(`file.${task.name} = function(${params.join(', ')}){`)
  }
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
        makeCall(zone).forEach(line => {
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

function makeTurn(zone) {
  const right = makeSift(zone.sift)
  const text = [`return ${right}`]
  return text
}

function makeCallTurn(zone) {

}

function makeCall(call) {
  // how to resolve all the various scenarios with the call?
  const turn = call.zone.filter(zone => zone.form === 'call-turn')[0]
  const save = call.zone.filter(zone => zone.form === 'call-save')[0]
  const text = []
  const bind = []
  let mean
  if (turn) {
    mean = `return `
  } else if (save) {
    mean = `${makeNest(save.nest)} = `
  }
  text.push(`${mean}${call.name}(`)
  call.bind.forEach(b => {
    const sift = makeSift(b.sift)
    bind.push(sift)
  })
  text.push(...bind.join(',\n').split('\n'))
  text.push(`)`)
  return text
}

function makeNest(nest) {
  return nest.stem.map((stem, i) => {
    switch (stem.form) {
      case 'term':
        if (i === 0) {
          return stem.name
        } else {
          return `.${stem.name}`
        }
        break
    }
  }).join('')
}

function makeSift(sift) {
  switch (sift.form) {
    case `text`: return `'${sift.text}'`
    case `size`: return `${sift.size}`
    case `link`: return makeNest(sift.nest)
  }
}

function makeDockTaskFile(file) {
  const text = []
  const code = []
  code.push(...makeTaskHead())
  file.load.forEach(load => {
    code.push(...makeLoad(load))
  })
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
      params.push(`${base.name}`)
    }
  })
  text.push(`file.task.${toMethodName(task.name)} = function(${params.join(', ')}){`)
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
  let head
  if (turn) {
    head = `return `
  }
  let base
  switch (call.name) {
    case `make`:
      base = makeDockCallMake(call);
      break
    case `test`:
      base = makeDockCallTest(call);
      break
    case `test-fall`:
      base = makeDockCallTestFall(call);
      break
    case `look`: // debugger
      base = makeDockCallLook(call);
      break
    case `call-base`: // method
      base = makeDockCallCallBase(call);
      break
    case `call-head`: // unary operation
      base = makeDockCallCallHead(call);
      break
    case `call-twin`: // unary operation
      base = makeDockCallCallTwin(call);
      break
  }
  return `${head}${base}`.split('\n')
}

function makeDockCallCallHead(call) {
  const text = []
  const value = call.bind.filter(bind => bind.name === 'value')[0]
  const operation = call.bind.filter(bind => bind.name === 'operation')[0]
  text.push(`${makeNest(value.sift.nest)}${operation.sift.text}`)
  return text.join('\n')
}

function makeDockCallCallTwin(call) {
  const text = []
  const left = call.bind.filter(bind => bind.name === 'left')[0]
  const right = call.bind.filter(bind => bind.name === 'right')[0]
  const operation = call.bind.filter(bind => bind.name === 'operation')[0]
  text.push(`${makeNest(left.sift.nest)} ${operation.sift.text} ${makeNest(right.sift.nest)}`)
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
  text.push(`${object.sift.text}.${method.sift.text}(${bind.join(', ')})`)
  return text.join('\n')
}

function makeDockCallTest(call) {
  const text = []
  const test = call.bind[0]
  const make = call.bind[1]
  text.push(`if (${test.name}) {`)
  text.push(`  return ${make}()`)
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
