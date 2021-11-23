
const AST = require('@lancejpollard/normalize-ast.js/create')
const makeRoad = require('../../make')
const {
  makeLoad,
  makeSave,
  makeHost,
  makeTurn,
  makeCall,
  makeNest,
} = makeRoad;

module.exports = makeDockTaskFile

function makeDockTaskFile(file) {
  file.originalFile.load.forEach(load => {
    makeLoad(file, load)
  })
  file.originalFile.task.forEach(task => {
    makeDockTask(file, task)
  })
  file.originalFile.call.forEach(call => {
    // file.callCalls.push(call)
  })
}

/**
 * This is a native JavaScript function.
 */

function makeDockTask(file, task) {
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

const transforms = {
  make: makeDockCallMake,
  test: makeDockCallTest,
  look: makeDockCallLook,
  'call-base': makeDockCallCallBase,
  'call-function':  makeDockCallCallFunction,
  'call-head': makeDockCallCallHead,
  'call-twin': makeDockCallCallTwin,
  'call-try': makeDockCallCallTry,
  'test-else': makeDockCallTestElse,
  'loop': makeDockCallLoop,
  'debug': makeDockCallDebug,
  'call-keyword':  makeDockCallKeyword,
  'call-keyword-2':  makeDockCallKeyword2,
  'set-dynamic-aspect': makeDockCallSetDynamicAspect,
  'get-dynamic-aspect': makeDockCallGetDynamicAspect,
  'delete': makeDockCallDelete,
  'create-literal': makeDockCallCreateLiteral,
}

function makeDockCall(file, call) {
  const turn = call.zone.filter(zone => zone.form === 'call-turn')[0]
  const base = transforms[call.name](call)
  if (turn) {
    return AST.createReturnStatement(base)
  } else {
    return base
  }
}

function makeDockCallCreateLiteral(call) {
  const literal = call.bind.filter(bind => bind.name === 'literal')[0]
  return AST.createLiteral(literal.sift.text)
}

function makeDockCallDelete(call) {
  const object = call.bind.filter(bind => bind.name === 'object')[0]
  const aspect = call.bind.filter(bind => bind.name === 'aspect')[0]
  return AST.createUnaryExpression(
    AST.createMemberExpression(makeNest(object.sift.nest), makeNest(aspect.sift.nest), true),
    'delete',
    true
  )
}

function makeDockCallGetDynamicAspect(call) {
  const object = call.bind.filter(bind => bind.name === 'object')[0]
  const aspect = call.bind.filter(bind => bind.name === 'aspect')[0]
  return AST.createMemberExpression(makeNest(object.sift.nest), makeNest(aspect.sift.nest), true)
}

function makeDockCallSetDynamicAspect(call) {
  const object = call.bind.filter(bind => bind.name === 'object')[0]
  const aspect = call.bind.filter(bind => bind.name === 'aspect')[0]
  const factor = call.bind.filter(bind => bind.name === 'factor')[0]
  return AST.createAssignmentExpression(
    AST.createMemberExpression(makeNest(object.sift.nest), makeNest(aspect.sift.nest), true),
    makeNest(factor.sift.nest)
  )
}

function makeDockCallKeyword2(call) {
  const left = call.bind.filter(bind => bind.name === 'left')[0]
  const keyword = call.bind.filter(bind => bind.name === 'keyword')[0]
  const right = call.bind.filter(bind => bind.name === 'right')[0]
  return AST.createBinaryExpression(
    makeNest(left.sift.nest),
    keyword.sift.text,
    makeNest(right.sift.nest)
  )
}

function makeDockCallKeyword(call) {
  const keyword = call.bind.filter(bind => bind.name === 'keyword')[0]
  const value = call.bind.filter(bind => bind.name === 'value')[0]
  return AST.createUnaryExpression(
    makeNest(value.sift.nest),
    keyword.sift.text
  )
}

function makeDockCallDebug(call) {
  const keyword = call.bind.filter(bind => bind.name === 'keyword')[0]
  return AST.createDebuggerStatement()
}

function makeDockCallLoop(call) {
  const check = call.bind.filter(bind => bind.name === 'check')[0]
  const block = call.bind.filter(bind => bind.name === 'block')[0]
  return AST.createWhileStatement(
    makeNest(check.sift.nest),
    [makeNest(block.sift.nest)]
  )
}

function makeDockCallTestElse(call) {
  const check = call.bind.filter(bind => bind.name === 'check')[0]
  const block = call.bind.filter(bind => bind.name === 'block')[0]
  const other = call.bind.filter(bind => bind.name === 'else')[0]
  return AST.createIfStatement(
    makeNest(check.sift.nest),
    [makeNest(block.sift.nest)],
    [makeNest(other.sift.nest)]
  )
}

function makeDockCallCallTry(call) {
  const block = call.bind.filter(bind => bind.name === 'block')[0]
  const error = call.bind.filter(bind => bind.name === 'error')[0]
  return AST.createTryStatement(
    makeNest(block.sift.nest),
    makeNest(error.sift.nest)
  )
}

function makeDockCallCallHead(call) {
  const value = call.bind.filter(bind => bind.name === 'value')[0]
  const operation = call.bind.filter(bind => bind.name === 'operation')[0]
  return AST.createUpdateExpression(
    makeNest(value.sift.nest),
    operation.sift.text,
    true
  )
}

function makeDockCallCallTwin(call) {
  const left = call.bind.filter(bind => bind.name === 'left')[0]
  const right = call.bind.filter(bind => bind.name === 'right')[0]
  const operation = call.bind.filter(bind => bind.name === 'operation')[0]
  return AST.createBinaryExpression(
    makeNest(left.sift.nest),
    operation.sift.text,
    makeNest(right.sift.nest)
  )
}

function makeDockCallMake(call) {
  const ctor = call.bind[0]
  const factor = call.bind.slice(1)
  const args = []
  factor.forEach(factor => {
    args.push(makeNest(factor.sift.nest))
  })
  return AST.createNewExpression(
    ctor.sift.text,
    args
  )
}

function makeDockCallCallBase(call, fileScope) {
  const object = call.bind[0]
  const method = call.bind[1]
  const factor = call.bind.slice(2)
  const args = []
  factor.forEach(factor => {
    args.push(makeNest(factor.sift.nest))
  })
  if (object.sift.form === 'link') {
    return AST.createCallExpression(
      AST.createMemberExpression(
        makeNest(object.sift.nest, fileScope),
        method.sift.text
      ),
      args
    )
  }
}

function makeDockCallCallFunction(call, fileScope) {
  const func = call.bind[0]
  const factor = call.bind.slice(1)
  const args = []
  factor.forEach(factor => {
    args.push(makeNest(factor.sift.nest))
  })
  return AST.createCallExpression(
    AST.createLiteral(func.sift.text),
    args
  )
}

function makeDockCallTest(call) {
  const test = call.bind[0]
  const make = call.bind[1]
  return AST.createIfStatement(
    makeNest(test.sift.nest),
    [makeNest(make.sift.nest)]
  )
}

function makeDockCallLook() {
  return `debugger`
}
