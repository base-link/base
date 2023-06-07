export function printJSAST(ast) {
  const text: Array<string> = []
  const state = { indent: 0 }
  ast.body.forEach(node => {
    text.push(...printBodyNode(node, state))
  })
  return text.join('\n')
}

function printBodyNode(node, state) {
  const text: Array<string> = []

  const printers = {
    ArrayExpression() {
      text.push(...printArrayExpression(node))
    },

    AssignmentExpression() {
      text.push(...printAssignmentExpression(node))
    },

    BinaryExpression() {
      console.log(node)
      const left = printExpression(node.left)
      const right = printExpression(node.right)
      text.push(`${left} ${node.operator} ${right}`)
    },

    BlockStatement() {
      text.push(...printBlockStatement(node))
    },

    BreakStatement() {
      text.push('break')
    },

    CallExpression() {
      const _callee = printExpression(node.callee)
      const args = node.arguments.map(arg => printExpression(arg))
      text.push(`${_callee}(${args.join(', ')})`)
    },

    ClassDeclaration() {
      text.push(...printClassDeclaration(node))
    },

    DebuggerStatement() {
      text.push(`debugger`)
    },

    ExpressionStatement() {
      text.push(...printExpressionStatement(node))
    },

    ForInStatement() {
      text.push(...printForInStatement(node))
    },

    ForOfStatement() {
      text.push(...printForOfStatement(node))
    },

    FunctionDeclaration() {
      text.push(...printFunctionDeclaration(node))
    },

    Identifier() {
      text.push(node.name)
    },

    IfStatement() {
      text.push(...printIfStatement(node))
    },

    LabeledStatement() {
      text.push(...printLabeledStatement(node))
    },

    Literal() {
      text.push(node.raw)
    },

    MemberExpression() {
      const object = printExpression(node.object)
      const property = printExpression(node.property)
      if (node.computed) {
        text.push(`${object}[${property}]`)
      } else {
        text.push(`${object}.${property}`)
      }
    },

    NewExpression() {
      text.push(printNewExpression(node).join('\n'))
    },

    ObjectExpression() {
      text.push(...printObjectExpression(node))
    },

    ReturnStatement() {
      text.push(...printReturnStatement(node))
    },

    SwitchStatement() {
      text.push(printSwitchStatement(node).join('\n'))
    },

    TaggedTemplateExpression() {
      text.push(printTaggedTemplateExpression(node).join('\n'))
    },

    TemplateLiteral() {
      text.push(...printTemplateLiteral(node))
    },

    ThrowStatement() {
      text.push(printThrowStatement(node).join('\n'))
    },

    TryStatement() {
      text.push(printTryStatement(node).join('\n'))
    },

    UnaryExpression() {
      text.push(printUnaryExpression(node).join('\n'))
    },

    UpdateExpression() {
      text.push(...printUpdateExpression(node))
    },

    VariableDeclaration() {
      text.push(...printVariableDeclaration(node))
    },

    WhileStatement() {
      text.push(...printWhileStatement(node))
    },
  }

  call(printers, node.type)

  return text
}

function printSwitchStatement(node) {
  const text: Array<string> = []
  const discriminant = printExpression(node.discriminant)
  text.push(`switch (${discriminant}) {`)
  node.cases.forEach(_case => {
    printSwitchCase(_case).forEach(line => {
      text.push(`  ${line}`)
    })
  })
  text.push('}')
  return text
}

function printSwitchCase(node) {
  const text: Array<string> = []
  const test = printExpression(node.test)
  text.push(`case ${test}:`)
  node.consequent.forEach(consequent => {
    printBodyNode(consequent).forEach(line => {
      text.push(`  ${line}`)
    })
  })
  return text
}

function printTemplateLiteral(node) {
  const text: Array<string> = []
  text.push('`')
  node.quasis.forEach((q, i) => {
    text.push(q.value.raw)
    if (i < node.quasis.length - 1) {
      const expression = printExpression(node.expressions[i])
      text.push(`\$\{${expression}\}`)
    }
  })
  text.push('`')
  return [text.join('')]
}

function printAssignmentExpression(node) {
  const text: Array<string> = []
  const left = printExpression(node.left)
  const right = printExpression(node.right)
  const operator = node.operator
  text.push(`${left} ${operator} ${right}`)
  return text
}

function printUpdateExpression(node) {
  const text: Array<string> = []
  const argument = printExpression(node.argument)
  if (node.prefix) {
    text.push(`${node.operator}${argument}`)
  } else {
    text.push(`${argument}${node.operator}`)
  }
  return text
}

function printBlockStatement(node) {
  const text: Array<string> = []
  text.push('{')
  node.body.forEach(bd => {
    printBodyNode(bd).forEach(line => {
      text.push(`  ${line}`)
    })
  })
  text.push('}')
  return text
}

function printLabeledStatement(node) {
  const label = printExpression(node.label)
  const body = printBodyNode(node.body)
  return [`${label}:`, ...body]
}

function printClassDeclaration(node) {
  const text: Array<string> = []
  const id = printExpression(node.id)
  const superClass = null
  if (superClass) {
  } else {
    text.push(`class ${id} {`)
  }
  printClassBody(node.body).forEach(line => {
    text.push(`  ${line}`)
  })
  text.push('}')
  return text
}

function printClassBody(node) {
  const text: Array<string> = []
  node.body.forEach(bd => {
    text.push(...printMethodDefinition(bd))
  })
  return text
}

function printMethodDefinition(node) {
  const key = printExpression(node.key)
  const value = printFunctionDeclaration(node.value, true)
  const text: Array<string> = (`${key}` + value.join('\n')).split('\n')
  return text
}

function printForInStatement(node) {
  const text: Array<string> = []
  const left = printExpression(node.left)
  const right = printExpression(node.right)
  text.push(`for (${left} in ${right}) {`)
  node.body.body.forEach(bd => {
    printBodyNode(bd).forEach(line => {
      text.push(`  ${line}`)
    })
  })
  text.push('}')
  return text
}

function printWhileStatement(node) {
  const text: Array<string> = []
  const test = printExpression(node.test)
  text.push(`while (${test}) {`)
  node.body.body.forEach(bd => {
    printBodyNode(bd).forEach(line => {
      text.push(`  ${line}`)
    })
  })
  text.push('}')
  return text
}

function printForOfStatement(node) {
  const text: Array<string> = []
  const left = printExpression(node.left)
  const right = printExpression(node.right)
  text.push(`for (${left} of ${right}) {`)
  node.body.body.forEach(bd => {
    printBodyNode(bd).forEach(line => {
      text.push(`  ${line}`)
    })
  })
  text.push('}')
  return text
}

function printObjectExpression(node) {
  const text: Array<string> = []
  if (node.properties.length) {
    text.push('{')
    const props = []
    node.properties.forEach(p => {
      printProperty(p).forEach(line => {
        props.push(`  ${line}`)
      })
    })
    text.push(props.join(',\n'))
    text.push('}')
  } else {
    text.push('{}')
  }
  return text
}

function printArrayExpression(node) {
  const text: Array<string> = []
  if (node.elements.length) {
    text.push('[')
    const els = []
    node.elements.forEach(p => {
      els.push(`  ${printExpression(p)}`)
    })
    text.push(els.join(',\n'))
    text.push(']')
  } else {
    text.push('[]')
  }
  return text
}

function printProperty(node) {
  if (node.type === 'SpreadElement') {
    return printSpreadElement(node)
  }
  const key = printExpression(node.key)
  const value = printExpression(node.value)
  return [`${key}: ${value}`]
}

function printRestElement(node) {
  const argument = printExpression(node.argument)
  return [`...${argument}`]
}

function printSpreadElement(node) {
  const argument = printExpression(node.argument)
  return [`...${argument}`]
}

function printIfStatement(node) {
  const text: Array<string> = []
  const test = printExpression(node.test)
  text.push(`if (${test}) {`)
  node.consequent.body.forEach(ds => {
    printBodyNode(ds).forEach(line => {
      text.push(`  ${line}`)
    })
  })
  if (node.alternate) {
    if (node.alternate.type === 'BlockStatement') {
      text.push(`} else {`)
      node.alternate.body.forEach(ds => {
        printBodyNode(ds).forEach(line => {
          text.push(`  ${line}`)
        })
      })
      text.push(`}`)
    } else {
      const elseif = printIfStatement(node.alternate)
      text.push(`} else ${elseif[0]}`)
      text.push(...elseif.slice(1))
    }
  } else {
    text.push(`}`)
  }
  return text
}

function printReturnStatement(node) {
  const argument = printExpression(node.argument)
  return [`return ${argument}`]
}

function printArrowFunctionExpression(node) {
  const printers = {
    ArrayExpression() {
      return ['return ' + printArrayExpression(node.body).join('\n')]
    },

    BlockStatement() {
      return node.body.body.map(x => printBodyNode(x).join('\n'))
    },

    CallExpression() {
      return [printExpression(node.body)]
    },

    Identifier() {
      return [node.body.name]
    },

    ObjectExpression() {
      return ['return ' + printObjectExpression(node.body).join('\n')]
    },
  }
  const text: Array<string> = []
  const params = node.params.map(param => printExpression(param))
  const body = call(printers, node.body.type).map(line => `  ${line}`)
  text.push(`(${params.join(', ')}) => {`)
  text.push(...body)
  text.push(`}`)
  return text
}

function printFunctionDeclaration(node, omitKeyword) {
  const text: Array<string> = []
  const id = node.id ? ` ${printExpression(node.id)}` : ''
  const params = node.params.map(param => printExpression(param))
  // console.log(JSON.stringify(node, null, 2))
  const body = node.body.body
    .map(x => printBodyNode(x).join('\n'))
    .join('\n')
    .split(/\n/)
    .map(line => `  ${line}`)
  const keyword = omitKeyword ? '' : 'function'
  text.push(`${keyword}${id}(${params.join(', ')}) {`)
  text.push(...body)
  text.push(`}`)
  return text
}

function printVariableDeclaration(node) {
  const text: Array<string> = []

  const printers = {
    VariableDeclarator(dec) {
      text.push(...printVariableDeclarator(node, dec))
    },
  }

  node.declarations.forEach(dec => {
    call(printers, dec.type, dec)
  })

  return text
}

function printVariableDeclarator(parent, node) {
  const text: Array<string> = []

  const printersId = {
    Identifier() {
      text.push(parent.kind)
      text.push(` `)
      text.push(node.id.name)
    },

    ObjectPattern() {
      text.push(parent.kind)
      text.push(` `)
      text.push(`{ `)
      const props = []
      node.id.properties.forEach(p => {
        const prop = printProperty(p).join('\n')
        props.push(prop)
      })
      text.push(props.join(', '))
      text.push(` }`)
    },

    // Property() {
    //   text.push(printProperty(p).join('\n'))
    // }
  }

  const printersInit = {
    ArrayExpression() {
      text.push(printArrayExpression(node.init).join('\n'))
    },

    ArrowFunctionExpression() {
      text.push(printArrowFunctionExpression(node.init).join('\n'))
    },

    AssignmentExpression() {
      text.push(printAssignmentExpression(node.init).join('\n'))
    },

    BinaryExpression() {
      const left = printExpression(node.init.left)
      const right = printExpression(node.init.right)
      text.push(`${left} ${node.init.operator} ${right}`)
    },

    CallExpression() {
      const _callee = printExpression(node.init.callee)
      const args = node.init.arguments.map(arg => printExpression(arg))
      text.push(`${_callee}(${args.join(', ')})`)
    },

    ConditionalExpression() {
      const test = printExpression(node.init.test)
      const consequent = printExpression(node.init.consequent)
      const alternate = printExpression(node.init.alternate)
      text.push(`${test} ? ${consequent} : ${alternate}`)
    },

    FunctionExpression() {
      text.push(printFunctionDeclaration(node.init).join('\n'))
    },

    Identifier() {
      text.push(node.init.name)
    },

    Literal() {
      const value = node.init.raw
      text.push(value)
    },

    LogicalExpression() {
      const left = printExpression(node.init.left)
      const right = printExpression(node.init.right)
      text.push(`${left} ${node.init.operator} ${right}`)
    },

    MemberExpression() {
      const object = printExpression(node.init.object)
      const property = printExpression(node.init.property)
      if (node.init.computed) {
        text.push(`${object}[${property}]`)
      } else {
        text.push(`${object}.${property}`)
      }
    },

    NewExpression() {
      text.push(printNewExpression(node.init).join('\n'))
    },

    ObjectExpression() {
      text.push(printObjectExpression(node.init).join('\n'))
    },

    ReturnStatement() {
      text.push(...printReturnStatement(node.init))
    },

    TaggedTemplateExpression() {
      text.push(printTaggedTemplateExpression(node.init).join('\n'))
    },

    TemplateLiteral() {
      text.push(printTemplateLiteral(node.init).join('\n'))
    },

    UnaryExpression() {
      text.push(printUnaryExpression(node.init).join('\n'))
    },

    UpdateExpression() {
      text.push(printUpdateExpression(node.init).join('\n'))
    },
  }

  call(printersId, node.id.type)

  if (node.init) {
    text.push(` = `)
    call(printersInit, node.init.type)
  }

  return [text.join('')]
}

function printTaggedTemplateExpression(node) {
  const tag = printExpression(node.tag)
  const template = printTemplateLiteral(node.quasi)
  return [`${tag}${template.join('\n')}`]
}

function printNewExpression(node) {
  const text: Array<string> = []
  const ctor = printExpression(node.callee)
  const args = node.arguments.map(arg => printExpression(arg))
  text.push(`new ${ctor}(${args.join(', ')})`)
  return text
}

function printExpressionStatement(node) {
  const text: Array<string> = []
  const printers = {
    AssignmentExpression() {
      const left = printExpression(node.expression.left)
      const right = printExpression(node.expression.right)
      text.push(`${left} ${node.expression.operator} ${right}`)
    },

    CallExpression() {
      const _callee = printExpression(node.expression.callee)
      const args = node.expression.arguments.map(arg =>
        printExpression(arg),
      )
      text.push(`${_callee}(${args.join(', ')})`)
    },

    Identifier() {
      text.push(node.expression.name)
    },

    MemberExpression() {
      const object = printExpression(node.expression.object)
      const property = printExpression(node.expression.property)
      if (node.expression.computed) {
        text.push(`${object}[${property}]`)
      } else {
        text.push(`${object}.${property}`)
      }
    },

    NewExpression() {
      text.push(printNewExpression(node.expression).join('\n'))
    },

    TaggedTemplateExpression() {
      text.push(
        printTaggedTemplateExpression(node.expression).join('\n'),
      )
    },

    ThrowStatement() {
      text.push(printThrowStatement(node.expression).join('\n'))
    },
  }

  call(printers, node.expression.type)

  return text
}

function printThrowStatement(node) {
  const argument = printExpression(node.argument)
  return [`throw ${argument}`]
}

function printTryStatement(node) {
  return [
    `try {`,
    `  ${node.block.callee.name}()`,
    `} catch (e) {`,
    `  ${node.handler.callee.name}(e)`,
    `}`,
  ]
}

function printExpression(node) {
  const printers = {
    ArrayExpression() {
      return printArrayExpression(node).join('\n')
    },

    ArrayPattern() {
      return printArrayPattern(node).join('\n')
    },

    ArrowFunctionExpression() {
      return printArrowFunctionExpression(node).join('\n')
    },

    AssignmentExpression() {
      return printAssignmentExpression(node).join('\n')
    },

    AssignmentPattern() {
      const left = printExpression(node.left)
      const right = printExpression(node.right)
      return `${left} = ${right}`
    },

    BinaryExpression() {
      const left = printExpression(node.left)
      const right = printExpression(node.right)
      return `${left} ${node.operator} ${right}`
    },

    CallExpression() {
      const _callee = printExpression(node.callee)
      const args = node.arguments.map(arg => printExpression(arg))
      return `${_callee}(${args.join(', ')})`
    },

    ClassDeclaration() {
      return printClassDeclaration(node).join('\n')
    },

    ConditionalExpression() {
      const test = printExpression(node.test)
      const consequent = printExpression(node.consequent)
      const alternate = printExpression(node.alternate)
      return `${test} ? ${consequent} : ${alternate}`
    },

    FunctionDeclaration() {
      return printFunctionDeclaration(node).join('\n')
    },

    FunctionExpression() {
      return printFunctionDeclaration(node).join('\n')
    },

    Identifier() {
      return node.name
    },

    Literal() {
      return node.raw
    },

    LogicalExpression() {
      const left = printExpression(node.left)
      const right = printExpression(node.right)
      return `${left} ${node.operator} ${right}`
    },

    MemberExpression() {
      const object = printExpression(node.object)
      const property = printExpression(node.property)
      if (node.computed) {
        return `${object}[${property}]`
      } else {
        return `${object}.${property}`
      }
    },

    NewExpression() {
      return printNewExpression(node).join('\n')
    },

    ObjectExpression() {
      return printObjectExpression(node).join('\n')
    },

    ObjectPattern() {
      return printObjectPattern(node).join('\n')
    },

    Property() {
      return printProperty(node).join('\n')
    },

    RestElement() {
      return printRestElement(node).join('\n')
    },

    ReturnStatement() {
      return printReturnStatement(node).join('\n')
    },

    SpreadElement() {
      return printSpreadElement(node).join('\n')
    },

    ThisExpression() {
      return 'this'
    },

    UnaryExpression() {
      return printUnaryExpression(node).join('\n')
    },

    UpdateExpression() {
      return printUpdateExpression(node).join('\n')
    },

    VariableDeclaration() {
      return printVariableDeclaration(node).join('\n')
    },
  }

  return call(printers, node.type)
}

function printArrayPattern(node) {
  const text: Array<string> = []
  const elems = []
  node.elements.forEach(e => {
    const elem = printExpression(e)
    elems.push(elem)
  })
  text.push(`[ ${elems.join(', ')} ]`)
  return text
}

function printObjectPattern(node) {
  const text: Array<string> = []
  const props = []
  node.properties.forEach(p => {
    const prop = printExpression(p)
    props.push(prop)
  })
  text.push(`{ ${props.join(', ')} }`)
  return text
}

function printUnaryExpression(node) {
  const text: Array<string> = []
  const argument = printExpression(node.argument)
  if (node.prefix) {
    text.push(
      `${
        node.operator.match(/[a-z]/)
          ? `${node.operator} `
          : node.operator
      }${argument}`,
    )
  } else {
    text.push(
      `${argument}${
        node.operator.match(/[a-z]/)
          ? ` ${node.operator}`
          : node.operator
      }`,
    )
  }
  return text
}

function call(obj, method, ...args) {
  if (!obj.hasOwnProperty(method)) {
    throw new Error(`Missing method ${method}`)
  }

  return obj[method](...args)
}
