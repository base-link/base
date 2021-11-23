
// https://stackoverflow.com/questions/68850952/how-can-you-reverse-this-pseudo-prng-to-get-back-the-original-number

const AST = require('@lancejpollard/normalize-ast.js/create')
const makeDockTaskFile = require('./native')
const makeRoad = require('../make')
const {
  makeLoadRoad,
  makeSave,
  makeHost,
  makeTurn,
  makeCall,
  makeLoad,
} = makeRoad;

module.exports = make

function make(file, deck) {
  const list = [file]
  const compiledDeck = {
    originalDeck: deck,
    files: {}
  }
  while (list.length) {
    const base = list.shift()
    if (compiledDeck.files[base.road]) {
      continue
    }
    const compiledFile = compiledDeck.files[base.road] = {
      originalFile: base,
      names: {},
      index: 1,
      imports: getImportPaths(base),
      bindings: {},
      requires: {}
    }
    makeFile(compiledFile)
    compiledFile.imports.forEach(load => {
      list.push(deck[load.road])
    })
  }
}

function makeFile(file) {
  switch (file.originalFile.mint) {
    case `task-file`:
      makeTaskFile(file)
      break
    case `dock-task-file`:
      makeDockTaskFile(file)
      break
    case `form-file`:
      makeFormFile(file)
      break
    case `mine-file`:
      makeMineFile(file)
      break
    case `mill-file`:
      makeMillFile(file)
      break
    case `call-file`:
      makeCallFile(file)
      break
    case `feed-file`:
      makeFeedFile(file)
      break
    case `test-file`:
      makeTestFile(file)
      break
    // case `view-file`:
    //   makeViewFile(file)
    //   break
    // default:
    //   throw file.mint
    //   break
  }
  return file
}

function makeTaskFile(file) {
  file.output = {}
  file.imports.forEach(load => {
    makeLoad(file, load)
  })

  file.output.task = []

  file.originalFile.task.forEach(task => {
    file.output.task.push(makeTask(file, task))
  })

  // file.output.call = []

  // file.originalFile.call.forEach(call => {
  //   file.output.call.push(call)
  // })
}

/**
 * This is a higher-level function.
 */

function makeTask(file, task) {
  const params = []
  const wait = !!task.wait
  task.base.forEach(base => {
    params.push(AST.createIdentifier(base.name))
  })

  const body = []

  task.zone.forEach(zone => {
    switch (zone.form) {
      case `host`:
        body.push(makeHost(file, zone))
        break
      case `save`:
        body.push(makeSave(file, zone))
        break
      case `turn`:
        body.push(makeTurn(file, zone))
        break
      case `call`:
        body.push(makeCall(file, zone))
        break
    }
  })

  const fxnAST = AST.createFunctionDeclaration(
    AST.createIdentifier(task.name),
    params,
    AST.createBlockStatement(body),
    { async: wait }
  )
  return fxnAST
}

function getImportPaths(file, list = []) {
  file.load.forEach(load => {
    makeLoadRoad(file.road, load, list)
  })
  return list
}

function makeTestFile(bind) {
  return
  importPaths.forEach(load => {
    makeLoad(bind, load)
  })
  bind.file.test.forEach(test => {
    makeTest(bind, test)
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
