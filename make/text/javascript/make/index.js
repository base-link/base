
const AST = require('@lancejpollard/normalize-ast.js/create')
const pathResolver = require('path')

module.exports = makeRoad

makeRoad.makeLoadRoad = makeLoadRoad
makeRoad.makeSave = makeSave
makeRoad.makeHost = makeHost
makeRoad.makeTurn = makeTurn
makeRoad.makeCall = makeCall
makeRoad.makeNest = makeNest
makeRoad.makeSift = makeSift

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

function makeSave(file, zone) {
  const left = makeNest(file, zone.base)
  const right = makeSift(file, zone.head)
  return AST.createAssignmentExpression(left, right)
}

function makeHost(file, zone) {
  const left = AST.createIdentifier(zone.name)
  const right = zone.sift && makeSift(file, zone.sift)
  return AST.createVariable(
    'let',
    left,
    right
  )
}

function makeTurn(file, zone) {
  const argument = makeSift(file, zone.sift)
  return AST.createReturnStatement(argument)
}

function makeCall(file, call) {
  const wait = !!call.wait
  const args = []

  call.bind.forEach(b => {
    const arg = b.sift.form === 'task'
      ? makeTask(file, b.sift)
      : makeSift(file, b.sift)
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

    const fxnAST = AST.createFunctionDeclaration(null, params, body)
    args.push(fxnAST)
  })

  return AST.createCallExpression(
    AST.createIdentifier(call.name),
    args,
    { await: wait }
  )
}

function makeNest(file, nest) {
  // const name =
  const member = AST.createMemberExpression(
    AST.createLiteral(nest.nest.name)
  )
  return member
}

function makeSift(file, sift) {
  const form = sift.link[0].term
  switch (form) {
    case `sift-text`: return AST.createLiteral(sift.text)
    case `text`: return AST.createLiteral(sift.text)
    case `size`: return AST.createLiteral(sift.size)
    case `link`: return makeNest(file, sift.link[1])
  }
}
