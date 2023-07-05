import fs from 'fs'
import _ from 'lodash'
import babel from '@babel/parser'
import {
  ClassDeclaration,
  RestElement,
  TSTypeLiteral,
  VariableDeclaration,
  ExportNamedDeclaration,
  ModuleDeclaration,
  Node,
  MemberExpression,
  TSFunctionType,
  TSDeclareMethod,
  TSTypePredicate,
  TSMappedType,
  TSTypeReference,
  TSIntersectionType,
  TSIndexSignature,
  TSPropertySignature,
  TSMethodSignature,
  TSConstructSignatureDeclaration,
  TSQualifiedName,
  TSInterfaceDeclaration,
  TSModuleDeclaration,
  TSTypeAliasDeclaration,
  TSTypeParameterDeclaration,
  TypeParameterDeclaration,
  FunctionDeclaration,
  TSConditionalType,
  TSDeclareFunction,
  TSUnionType,
  Identifier,
} from '@babel/types'
import { haveText } from '@tunebond/have'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

type Mod = string | null | undefined

type DeclaredValue = {
  OUTPUT_PATH: string
  mod: string | null | undefined
}

type Declared = Record<string, DeclaredValue | undefined>

type Imports = Record<
  string,
  | { fromFile: boolean; value: DeclaredValue | undefined }
  | number
  | Array<string>
  | boolean
> & {
  __ME__?: string
}

type Heads = Record<string, boolean>

type HostsAndTasks = {
  bears: Record<string, string>
  globals: {
    hosts: Array<string>
    tasks: Array<string>
  }
  hosts: Array<string>
  imports: Imports
  tasks: Array<string>
}

const importsPerFile: Record<string, Record<string, string>> = {}

const PATHS = [
  'src/lib/dom.generated.d.ts',
  'src/lib/dom.iterable.d.ts',
  'src/lib/dom.iterable.generated.d.ts',
  'src/lib/es5.d.ts',
  'src/lib/es5.full.d.ts',
  'src/lib/es2015.core.d.ts',
  'src/lib/es2015.collection.d.ts',
  'src/lib/es2015.generator.d.ts',
  'src/lib/es2015.iterable.d.ts',
  'src/lib/es2015.promise.d.ts',
  'src/lib/es2015.proxy.d.ts',
  'src/lib/es2015.reflect.d.ts',
  'src/lib/es2015.symbol.d.ts',
  'src/lib/es2015.symbol.wellknown.d.ts',
  'src/lib/es2015.d.ts',
  'src/lib/es2015.full.d.ts',
  'src/lib/es2016.array.include.d.ts',
  'src/lib/es2016.d.ts',
  'src/lib/es2016.full.d.ts',
  'src/lib/es2017.d.ts',
  'src/lib/es2017.date.d.ts',
  'src/lib/es2017.full.d.ts',
  'src/lib/es2017.intl.d.ts',
  'src/lib/es2017.object.d.ts',
  'src/lib/es2017.sharedmemory.d.ts',
  'src/lib/es2017.string.d.ts',
  'src/lib/es2017.typedarrays.d.ts',
  'src/lib/es2018.asyncgenerator.d.ts',
  'src/lib/es2018.asynciterable.d.ts',
  'src/lib/es2018.d.ts',
  'src/lib/es2018.full.d.ts',
  'src/lib/es2018.intl.d.ts',
  'src/lib/es2018.promise.d.ts',
  'src/lib/es2018.regexp.d.ts',
  'src/lib/es2019.array.d.ts',
  'src/lib/es2019.d.ts',
  'src/lib/es2019.full.d.ts',
  'src/lib/es2019.intl.d.ts',
  'src/lib/es2019.object.d.ts',
  'src/lib/es2019.string.d.ts',
  'src/lib/es2019.symbol.d.ts',
  'src/lib/es2020.bigint.d.ts',
  'src/lib/es2020.d.ts',
  'src/lib/es2020.date.d.ts',
  'src/lib/es2020.full.d.ts',
  'src/lib/es2020.intl.d.ts',
  'src/lib/es2020.number.d.ts',
  'src/lib/es2020.promise.d.ts',
  'src/lib/es2020.sharedmemory.d.ts',
  'src/lib/es2020.string.d.ts',
  'src/lib/es2020.symbol.wellknown.d.ts',
  'src/lib/es2021.d.ts',
  'src/lib/es2021.full.d.ts',
  'src/lib/es2021.intl.d.ts',
  'src/lib/es2021.promise.d.ts',
  'src/lib/es2021.string.d.ts',
  'src/lib/es2021.weakref.d.ts',
  'src/lib/es2022.array.d.ts',
  'src/lib/es2022.d.ts',
  'src/lib/es2022.error.d.ts',
  'src/lib/es2022.full.d.ts',
  'src/lib/es2022.intl.d.ts',
  'src/lib/es2022.object.d.ts',
  'src/lib/es2022.regexp.d.ts',
  'src/lib/es2022.sharedmemory.d.ts',
  'src/lib/es2022.string.d.ts',
  'src/lib/es2023.array.d.ts',
  'src/lib/es2023.collection.d.ts',
  'src/lib/es2023.d.ts',
  'src/lib/es2023.full.d.ts',
  'src/lib/esnext.d.ts',
  'src/lib/esnext.full.d.ts',
  'src/lib/esnext.intl.d.ts',
  'src/lib/header.d.ts',
  'src/lib/scripthost.d.ts',
  'src/lib/webworker.generated.d.ts',
  'src/lib/webworker.importscripts.d.ts',
  'src/lib/webworker.iterable.generated.d.ts',
].map(x => `${__dirname}/TypeScript/${x}`)

let NAME_SUFFIX = ''
let OUTPUT_PATH = ''
let FILE = ''
let defined: Declared = {}
let writes: Record<
  string,
  {
    b: Array<string>
    i: Array<Record<string, Record<string, boolean>>>
    t: Array<string>
  }
> = {}

process()

function process() {
  PATHS.forEach(path => {
    // console.log(path)
    const code = fs.readFileSync(path, 'utf-8')
    const OUTPUT_PATH_ARRAY: Array<string | null> = path
      .replace(`${__dirname}/TypeScript/src/lib/`, '')
      .split('.')
      .map(x =>
        x
          .split('/')
          .map(y => makeName(y))
          .join('/'),
      )
    OUTPUT_PATH_ARRAY.pop()
    OUTPUT_PATH_ARRAY.forEach((x, i) => {
      if (x === 'd') {
        OUTPUT_PATH_ARRAY[i] = null
      }
    })
    OUTPUT_PATH = OUTPUT_PATH_ARRAY.filter(x => x).join('/') + '/suit'

    if (OUTPUT_PATH_ARRAY[0]?.match(/^es/)) {
      NAME_SUFFIX = OUTPUT_PATH_ARRAY[0]
    }

    FILE = OUTPUT_PATH

    // console.log(OUTPUT_PATH)
    // console.log('output', OUTPUT_PATH)

    const ast = babel.parse(code, {
      allowUndeclaredExports: true,
      errorRecovery: true,
      plugins: ['classProperties', 'typescript'],
      sourceType: 'module',
      strictMode: false,
    })

    const declared: Declared = {}

    ast.program.body.forEach(node => {
      handleImports(node, null, declared, true)
    })

    const hostsAndTasks: HostsAndTasks = {
      bears: {},
      globals: {
        hosts: [],
        tasks: [],
      },
      hosts: [],
      imports: {},
      tasks: [],
    }

    ast.program.body.forEach(node => {
      handleBody(node, null, declared, true, false, hostsAndTasks)
      handleBodyNames(node, null, declared, true)
    })

    const finalImportText = getImportText(
      hostsAndTasks.imports,
      declared,
    )

    const path2 = `tmp/${OUTPUT_PATH}`

    const t = [
      ...hostsAndTasks.globals.hosts,
      '',
      ...hostsAndTasks.globals.tasks,
      '',
      ...hostsAndTasks.hosts,
      '',
      ...hostsAndTasks.tasks,
    ]

    const write = (writes[path2] = writes[path2] ?? {
      b: [],
      i: [],
      t: [],
    })
    write.i.push(finalImportText)
    write.t.push('\n', ...t)

    code.replace(
      /\/\/\/\s+<reference\s+lib="([^"]+)"/g,
      (_, $1: string) => {
        write.b.push(
          `bear @tunebond/bolt/code/javascript/${$1.replace(
            /\./g,
            '/',
          )}`,
        )
        return ''
      },
    )
  })

  Object.keys(writes).forEach(path => {
    let parts = path.split('/')
    let name = parts.pop()
    let parentPath = parts.join('/')
    // if (parentPath === 'tmp') throw new Error(path)
    let importPath = path.replace(
      /^tmp/,
      'bear @tunebond/bolt/code/javascript',
    )
    const write = (writes[parentPath] = writes[parentPath] ?? {
      b: [],
      i: [],
      t: [],
    })
    write.b.push(importPath)
  })

  Object.keys(writes).forEach(path => {
    mkdir(path)
    const { i, t, b } = writes[path] ?? { b: [], i: [], t: [] }
    let imports = [] //Object.keys(i.reduce((m, x) => m[x] = true && m, {})).sort()
    let bears = Object.keys(
      b.reduce<Record<string, boolean>>((m, x) => {
        m[x] = true
        return m
      }, {}),
    )

    let importMap: Record<string, Record<string, true>> = {}

    i.forEach(importMap2 => {
      Object.keys(importMap2).forEach(p => {
        const x = (importMap[p] = importMap[p] ?? {})
        Object.keys(importMap2[p]).forEach(t => {
          x[t] = true
        })
      })
    })

    Object.keys(importMap).forEach(p => {
      imports.push('')
      imports.push(`${p}`)
      Object.keys(importMap[p])
        .sort()
        .forEach(t => {
          imports.push(`  ${t.trim()}`)
        })
    })

    imports.push('')

    // if (
    //   path.match('dom') &&
    //   imports.join('\n').match('javascript/') &&
    //   !imports.join('\n').match('javascript/native')
    // ) {
    //   console.log(imports.join('\n'))
    // }

    fs.writeFileSync(
      `${path}/base.link`,
      cleanText(
        bears.join('\n') +
          '\n' +
          imports.join('\n') +
          '\n' +
          t.join('\n'),
      ),
    )
  })
}

function handleImports(
  node: Node,
  mod: Mod,
  declared: Declared,
  isTop = false,
) {
  switch (node.type) {
    case 'TSInterfaceDeclaration':
      makeInterfaceImports(node, mod, declared)
      break
    case 'TSModuleDeclaration':
      makeModuleImports(node, mod, declared, isTop)
      break
    case 'VariableDeclaration':
      break
    case 'TSDeclareFunction':
      // console.log('Function')
      break
    case 'TSTypeAliasDeclaration':
      makeAliasImports(node, mod, declared)
      break
    case 'ImportDeclaration':
      // console.log('ImportDeclaration')
      makeImportImports(node, mod, declared)
      break
    case 'TSImportEqualsDeclaration':
      // console.log('TSImportEqualsDeclaration')
      break
    case 'ClassDeclaration':
      // console.log('Class')
      break
    case 'TSExportAssignment':
      break
    case 'ExportAllDeclaration':
      break
    case 'ExportNamedDeclaration':
      makeExportNamedImports(node, mod, declared)
      break
    case 'ExportDefaultDeclaration':
      // console.log('ExportDefaultDeclaration')
      break
    case 'TSEnumDeclaration':
      console.log('TSEnumDeclaration', node)
      break
    default:
      console.log(node, OUTPUT_PATH)
      throw new Error(`Unknown program type`)
  }
}

function makeExportNamedImports(
  node: ExportNamedDeclaration,
  mod: Mod,
  declared: Declared,
) {
  if (node.specifiers?.length) {
    return
  }
  switch (node.declaration?.type) {
    case 'TSInterfaceDeclaration':
      makeInterfaceImports(node.declaration, mod, declared)
      break
    case 'ClassDeclaration':
      break
    case 'TSModuleDeclaration':
      break
    case 'VariableDeclaration':
      // node.declaration.declarations.forEach(dec => {
      //   const typeName = dec.id.name
      //   const _typeName = makeName(typeName)
      //   const text = [`host ${_typeName}, text <${typeName}>`]
      // })
      break
    case 'TSTypeAliasDeclaration':
    case 'TSDeclareFunction':
      break
    case 'TSEnumDeclaration':
      break
    default:
      if (node.exportKind === 'value') {
        return
      }
      console.log(node)
      throw new Error('Named exports')
  }
}

function makeImportImports(node: Node, mod: Mod, declared: Declared) {
  // const source = node.source.value.split(':').join('/')
  // node.specifiers.forEach(node => {
  //   const imported = node.imported.name
  //   const local = node.local.name
  // })
  // declared[typeName] = { OUTPUT_PATH, mod }
}

function handleBody(
  node: Node,
  mod: Mod,
  declared: Declared,
  isTop = false,
  isGlobal: boolean,
  hostsAndTasks: HostsAndTasks,
) {
  switch (node.type) {
    case 'TSInterfaceDeclaration':
      makeInterface(node, mod, declared, isGlobal)
      break
    case 'TSModuleDeclaration':
      makeModule(node, mod, declared, isTop, isGlobal, hostsAndTasks)
      break
    case 'VariableDeclaration': {
      makeVariable(
        node,
        mod,
        hostsAndTasks.imports,
        declared,
        isGlobal,
        hostsAndTasks,
      )
      break
    }
    case 'ExportDefaultDeclaration':
      // console.log('ExportDefaultDeclaration')
      break
    case 'TSDeclareFunction': {
      makeFunction(
        node,
        mod,
        hostsAndTasks.imports,
        declared,
        isGlobal,
        hostsAndTasks,
      )
      break
    }
    case 'ImportDeclaration':
      // console.log('ImportDeclaration')
      break
    case 'TSTypeAliasDeclaration':
      makeAlias(node, mod, declared, isGlobal)
      break
    case 'TSImportEqualsDeclaration':
      // console.log('TSImportEqualsDeclaration')
      break
    case 'ExportAllDeclaration':
      // console.log('ExportAllDeclaration')
      break
    case 'ClassDeclaration':
      makeClass(node, mod, declared, isGlobal)
      break
    case 'ExportNamedDeclaration': {
      makeExportNamed(node, mod, declared, isGlobal, hostsAndTasks)
      break
    }
    case 'TSExportAssignment':
      break
    case 'TSEnumDeclaration':
      console.log('TSEnumDeclaration')
      break
    default:
      console.log(node)
      throw new Error(`Unknown program type`)
  }
}

function getMemberExpressionName(node: Node): string {
  switch (node.type) {
    case 'MemberExpression':
      const name = []
      name.push(getMemberExpressionName(node.object))
      name.push(getMemberExpressionName(node.property))
      return name.join('-')
    default:
      if ('name' in node && typeof node.name === 'string') {
        return makeName(node.name)
      }
      throw new Error('Oops')
  }
}

function makeClass(
  node: ClassDeclaration,
  mod: Mod,
  declared: Declared,
  isGlobal?: boolean,
) {
  const imports: Imports = {}
  const heads: Heads = {}
  let name = makeName(node.id.name)
  const baseName = name

  if (NAME_SUFFIX) {
    name += `-${NAME_SUFFIX}`
  }

  const f = (importsPerFile[FILE] ??= {})
  f[baseName] = name

  Object.defineProperty(imports, '__ME__', {
    enumerable: false,
    value: name,
  })
  const typeParams =
    node.typeParameters?.type === 'TSTypeParameterDeclaration'
      ? makeTypeParameters('', node.typeParameters, imports, heads)
      : []
  const superclass =
    node.superClass && getMemberExpressionName(node.superClass)
  const superclassTypeParams =
    node.superClass &&
    'typeParameters' in node.superClass &&
    node.superClass?.typeParameters?.type ===
      'TSTypeParameterDeclaration'
      ? makeTypeParameters(
          '',
          node.superClass.typeParameters,
          imports,
          heads,
        )
      : []

  const text = []
  const staticMethods: Array<string> = []
  const instanceMethods: Array<string> = []
  const staticProperties: Array<string> = []
  const instanceProperties: Array<string> = []
  const isConstructor = !!name.match('-constructor')
  if (isConstructor) {
    text.push(`  hook self`)
    name = name.replace('-constructor', '')
    mod = mod ? mod.replace('-constructor', '') : null
  } else {
    if (`suit ${name}, name <${node.id.name}>`.length <= 96) {
      text.push(`suit ${name}, name <${node.id.name}>`)
    } else {
      text.push(`suit ${name}`)
      text.push(`  name <${node.id.name}>`)
    }
  }
  if (isGlobal) {
    text.push(`  home true`)
  }
  typeParams.forEach(line => {
    text.push(`  ${line}`)
  })

  if (typeParams.length) {
    text.push(``)
  }

  if (superclass) {
    text.push(`  base ${superclass}`)
  }
  superclassTypeParams.forEach(line => {
    text.push(`    ${line}`)
  })
  node.body.body.forEach(node => {
    switch (node.type) {
      case 'TSDeclareMethod': {
        const methodHeads = { ...heads }
        const typeParams =
          node.typeParameters?.type === 'TSTypeParameterDeclaration'
            ? makeTypeParameters(
                '',
                node.typeParameters,
                imports,
                methodHeads,
              )
            : []
        const params = makeFunctionParams(
          mod ?? '',
          node,
          imports,
          methodHeads,
        )
        if (node.kind === 'constructor') {
          staticMethods.push(`  hook make`)
          typeParams.forEach(line => {
            staticMethods.push(`    ${line}`)
          })

          if (typeParams.length) {
            staticMethods.push(``)
          }

          params.forEach(line => {
            staticMethods.push(`    ${line}`)
          })
          staticMethods.push(``)
        } else {
          const t = node.static ? staticMethods : instanceMethods

          const indent = isConstructor ? `    ` : '  '
          if (node.computed) {
            const left =
              'object' in node.key &&
              'name' in node.key.object &&
              node.key.object.name

            const right =
              'property' in node.key &&
              'name' in node.key.property &&
              node.key.property.name

            const name = [
              makeName(left || ''),
              makeName(right || ''),
            ].join('/')
            t.push(`  task {${name}}`)
            t.push(`    name <${left}.${left}>`)
          } else {
            const MethodName = 'name' in node.key && node.key.name
            const methodName = makeName(MethodName || '')

            if (
              `${indent}task ${methodName}, name <${MethodName}>`
                .length <= 96
            ) {
              t.push(
                `${indent}task ${methodName}, name <${MethodName}>`,
              )
            } else {
              t.push(`${indent}task ${methodName}`)
              t.push(`${indent}  name <${MethodName}>`)
            }
          }
          const returnType =
            node.returnType?.type === 'TSTypeAnnotation'
              ? makeTypeAnnotation(
                  '',
                  node.returnType.typeAnnotation,
                  `like`,
                  imports,
                  methodHeads,
                )
              : []

          let x: Array<string> = []
          returnType.forEach(line => {
            x.push(`  ${indent}${line}`)
          })
          t.push(...x)
          if (x.length) {
            t.push(``)
          }
          typeParams.forEach(line => {
            t.push(`    ${line}`)
          })
          if (typeParams.length) {
            t.push(``)
          }
          params.forEach(line => {
            t.push(`  ${indent}${line}`)
          })
          if (params.length) {
            t.push(``)
          }
        }

        break
      }
      case 'ClassProperty': {
        const t = node.static ? staticProperties : instanceProperties
        const type =
          node.typeAnnotation?.type === 'TSTypeAnnotation'
            ? makeTypeAnnotation(
                '',
                node.typeAnnotation.typeAnnotation,
                `like`,
                imports,
                heads,
              )
            : []

        const indent = isConstructor ? `    ` : '  '
        if (node.computed) {
          const left =
            'object' in node.key &&
            'name' in node.key.object &&
            node.key.object.name

          const right =
            'property' in node.key &&
            'name' in node.key.property &&
            node.key.property.name

          const name = [
            makeName(left || ''),
            makeName(right || ''),
          ].join('/')

          t.push(`  link {${name}}`)
          type.forEach(line => {
            t.push(`    ${line}`)
          })
        } else {
          const MethodName = 'name' in node.key && node.key.name
          const name = makeName(MethodName || '')
          t.push(`${indent}link ${name}, name <${MethodName}>`)
          if (type.length === 1) {
            t[t.length - 1] += `, ${type[0]}`
          } else {
            type.forEach(line => {
              t.push(`  ${indent}${line}`)
            })
          }
        }
        break
      }
      default:
        console.log(node)
        throw new Error('Oops')
    }
  })

  if (staticMethods.length || staticProperties.length) {
    instanceMethods.push('')
    instanceMethods.push(`  hook self`)
    // classText.push(`form ${name}-constructor`)
    if (staticProperties.length) {
      instanceMethods.push(...staticProperties.map(x => `  ${x}`))
      instanceMethods.push('')
    }
    instanceMethods.push(...staticMethods.map(x => `  ${x}`))
  }

  text.push(...instanceProperties)
  if (instanceProperties.length) {
    text.push('')
  }

  text.push(...instanceMethods)

  // text.push(...classText)

  const finalImportText = getImportText(imports, declared)

  const path = mod
    ? `tmp/${OUTPUT_PATH}/${mod}/${makeName(name)}`
    : `tmp/${OUTPUT_PATH}/${makeName(name)}`

  const write = (writes[path] = writes[path] ?? { b: [], i: [], t: [] })
  write.i.push(finalImportText)
  write.t.push('\n', ...text)
}

function makeExportNamed(
  node: ExportNamedDeclaration,
  mod: Mod,
  declared: Declared,
  isGlobal: boolean,
  hostsAndTasks: HostsAndTasks,
) {
  if (node.specifiers?.length) {
    // console.log(node)
    // throw new Error('specifiers')
  } else {
    switch (node.declaration?.type) {
      case 'TSDeclareFunction':
        makeFunction(
          node.declaration,
          mod,
          hostsAndTasks.imports,
          declared,
          isGlobal,
          hostsAndTasks,
        )
        break
      case 'TSInterfaceDeclaration':
        makeInterface(node.declaration, mod, declared, isGlobal)
        break
      case 'VariableDeclaration':
        makeVariable(
          node.declaration,
          mod,
          hostsAndTasks.imports,
          declared,
          isGlobal,
          hostsAndTasks,
        )
        break
      case 'TSModuleDeclaration':
        makeModule(
          node.declaration,
          mod,
          declared,
          false,
          isGlobal,
          hostsAndTasks,
        )
        break
      case 'ClassDeclaration':
        // console.log('ClassDeclaration')
        makeClass(node.declaration, mod, declared, isGlobal)
        break
      case 'TSTypeAliasDeclaration':
        makeAlias(node.declaration, mod, declared)
        break
      case 'TSEnumDeclaration':
        console.log('TSEnumDeclaration')
        break
      default:
        if (node.exportKind === 'value') {
          return
        }
        console.log(node)
        throw new Error('Named export error')
    }
  }
}

function makeFunction(
  node: TSDeclareFunction,
  mod: Mod,
  imports: Imports,
  declared: Declared,
  isGlobal: boolean,
  hostsAndTasks: HostsAndTasks,
) {
  const heads = {}
  const name = node.id?.name
  if (!name) {
    console.log(node)
    throw new Error()
  }
  const typeParams =
    node.typeParameters?.type === 'TSTypeParameterDeclaration'
      ? makeTypeParameters('', node.typeParameters, imports, heads)
      : []
  const functionParams = makeFunctionParams('', node, imports, heads)
  const returnType =
    node.returnType?.type === 'TSTypeAnnotation'
      ? makeTypeAnnotation(
          '',
          node.returnType.typeAnnotation,
          `like`,
          imports,
          heads,
        )
      : []

  const t: Array<string> = []
  const globalsText: Array<string> = []

  if (`task ${makeName(name)}, name <${name}>`.length <= 96) {
    t.push(`task ${makeName(name)}, name <${name}>`)
  } else {
    t.push(`task ${makeName(name)}`)
    t.push(`  name <${name}>`)
  }
  if (isGlobal) {
    t.push(`  home true`)
  }

  let x: Array<string> = []
  returnType.forEach(line => {
    x.push(`  ${line}`)
  })
  t.push(...x)
  if (x.length) {
    t.push(``)
  }
  typeParams.forEach(line => {
    t.push(`  ${line}`)
  })
  if (typeParams.length) {
    t.push(``)
  }
  functionParams.forEach(line => {
    t.push(`  ${line}`)
  })
  t.push('')

  hostsAndTasks.globals.tasks.push(...globalsText)
  hostsAndTasks.tasks.push(...t)
}

function handleBodyNames(
  node: Node,
  mod: Mod,
  declared: Declared,
  isTop?: boolean,
  isGlobal?: boolean,
) {
  switch (node.type) {
    case 'TSInterfaceDeclaration':
      makeInterfaceNames(node, mod, declared, isGlobal)
      break
    case 'ImportDeclaration':
      // console.log('ImportDeclaration')
      break
    case 'ExportDefaultDeclaration':
      // console.log('ExportDefaultDeclaration')
      break
    case 'ExportNamedDeclaration':
      // console.log('ExportNamedDeclaration')
      break
    case 'TSModuleDeclaration':
      makeModuleNames(node, mod, declared, isTop, isGlobal)
      break
    case 'VariableDeclaration':
      makeVariableNames(node, mod, declared)
      break
    case 'TSExportAssignment':
      // console.log('TSExportAssignment')
      break
    case 'TSImportEqualsDeclaration':
      // console.log('TSImportEqualsDeclaration')
      break
    case 'ExportAllDeclaration':
      // console.log('ExportAllDeclaration')
      break
    case 'TSDeclareFunction':
      makeFunctionNames(node, mod, declared)
      break
    case 'TSTypeAliasDeclaration':
      makeAliasNames(node, mod, declared, isGlobal)
      break
    case 'ClassDeclaration':
      break
    case 'TSEnumDeclaration':
      console.log('TSEnumDeclaration')
      break
    default:
      console.log(node)
      throw new Error(`Unknown program type`)
  }
}

function makeInterfaceNames(
  node: Node,
  mod: Mod,
  declared: Declared,
  isGlobal?: boolean,
) {
  return
  // const typeName = node.id.name
  // const _typeName = makeName(typeName)
  // const text = [`form ${_typeName}, text <${typeName}>`]
  // let hasLink = false

  // let done = {}

  // node.body.body.forEach(node => {
  //   switch (node.type) {
  //     case 'TSPropertySignature': {
  //       if (node.key.type === 'MemberExpression') {
  //         break
  //       }
  //       const name = node.key.name ?? node.key.value
  //       if (done[name]) {
  //         break
  //       }
  //       done[name] = true
  //       text.push(`  link ${makeName(name)}, text <${name}>`)
  //       hasLink = true
  //       break
  //     }
  //   }
  // })

  // if (hasLink) {
  //   text.push('')
  // }

  // node.body.body.forEach(node => {
  //   switch (node.type) {
  //     case 'TSMethodSignature': {
  //       if (node.key.type === 'MemberExpression') {
  //         break
  //       }
  //       const name = node.key.name
  //       // if (done[name]) break
  //       // done[name] = true
  //       text.push(`  task ${makeName(name)}, text <${name}>`)
  //       console.log(node)
  //       // text.push(...makeMethod(name, node, imports, heads))
  //       // text.push(``)
  //       break
  //     }
  //   }
  // })

  // const path = mod
  //   ? `tmp/${OUTPUT_PATH}/${mod}/${makeName(typeName)}/name`
  //   : `tmp/${OUTPUT_PATH}/${makeName(typeName)}/name`

  // fs.mkdirSync(path, { recursive: true })
  // fs.appendFileSync(`${path}/base.link`, cleanText(text.join('\n')))
}

function makeModuleNames(
  node: Node,
  mod: Mod,
  declared: Declared,
  isTop?: boolean,
  isGlobal?: boolean,
) {
  return
  // const name = makeName(node.id.name ?? node.id.value)
  // isGlobal = isGlobal || name === 'global'
  // let n = isGlobal ? null : name
  // const p = isTop ? mod : [mod, n].filter(x => x).join('/')
  // if (node.body.type === 'TSModuleDeclaration') {
  //   makeModuleNames(node.body, p, declared, false, isGlobal)
  // } else {
  //   node.body.body.forEach(node => {
  //     handleBodyNames(node, p, declared, false, isGlobal)
  //   })
  // }
}

function makeFunctionNames(node: Node, mod: Mod, declared: Declared) {
  return
  // const typeName = node.id.name
  // const _typeName = makeName(typeName)
  // const text = [`task ${_typeName}, text <${typeName}>`]

  // const path = mod
  //   ? `tmp/${OUTPUT_PATH}/${mod}/${makeName(typeName)}/name`
  //   : `tmp/${OUTPUT_PATH}/${makeName(typeName)}/name`

  // fs.mkdirSync(path, { recursive: true })
  // fs.appendFileSync(`${path}/base.link`, cleanText(text.join('\n')))
}

function makeVariableNames(node: Node, mod: Mod, declared: Declared) {
  return
  // node.declarations.forEach(dec => {
  //   const typeName = dec.id.name
  //   const _typeName = makeName(typeName)
  //   const text = [`host ${_typeName}, text <${typeName}>`]

  //   const path = mod
  //     ? `tmp/${OUTPUT_PATH}/${mod}/${makeName(typeName)}/name`
  //     : `tmp/${OUTPUT_PATH}/${makeName(typeName)}/name`

  //   fs.mkdirSync(path, { recursive: true })
  //   fs.appendFileSync(`${path}/base.link`, cleanText(text.join('\n')))
  // })
}

function makeAliasNames(
  node: TSTypeAliasDeclaration,
  mod: Mod,
  declared: Declared,
  isGlobal?: boolean,
) {
  return
  // const typeName = node.id.name
  // const _typeName = makeName(typeName)
  // const text = [`form ${_typeName}, text <${typeName}>`]

  // const path = mod
  //   ? `tmp/${OUTPUT_PATH}/${mod}/${makeName(typeName)}/name`
  //   : `tmp/${OUTPUT_PATH}/${makeName(typeName)}/name`

  // fs.mkdirSync(path, { recursive: true })
  // fs.appendFileSync(`${path}/base.link`, cleanText(text.join('\n')))
}

function makeModule(
  node: TSModuleDeclaration,
  mod: Mod,
  declared: Declared,
  isTop: boolean,
  isGlobal: boolean,
  hostsAndTasks: HostsAndTasks,
) {
  const name =
    node.id.type === 'Identifier'
      ? makeName(node.id.name)
      : makeName(node.id.value)

  if (name.match(/^node\-/)) {
    return
  }

  isGlobal = isGlobal || name === 'global'

  let n = isGlobal
    ? null
    : name === OUTPUT_PATH.split('/').pop()
    ? null
    : `${name}`

  if (node.body.type === 'TSModuleDeclaration') {
    makeModule(
      node.body,
      isTop
        ? mod
        : [mod, n]
            .filter(x => x)
            .join('/')
            .replace(/google\/maps\/?/, ''),
      declared,
      false,
      isGlobal,
      hostsAndTasks,
    )
  } else {
    const mods = isTop ? n : [mod, n].filter(x => x).join('/')

    const ht = {
      bears: hostsAndTasks.bears,
      globals: {
        hosts: [],
        tasks: [],
      },
      hosts: [],
      imports: {},
      tasks: [],
    }

    node.body.body.forEach(node => {
      handleBody(node, mods, declared, false, isGlobal, ht)
    })

    const finalImportText = getImportText(ht.imports, declared)

    const path = mods
      ? `tmp/${OUTPUT_PATH}/${mods}`
      : `tmp/${OUTPUT_PATH}`

    const t = [
      ...ht.globals.hosts,
      '',
      ...ht.globals.tasks,
      '',
      ...ht.hosts,
      '',
      ...ht.tasks,
    ]

    const write = (writes[path] = writes[path] ?? {
      b: [],
      i: [],
      t: [],
    })
    write.i.push(finalImportText)
    write.t.push('\n', ...t)
  }
}

function makeModuleImports(
  node: TSModuleDeclaration,
  mod: Mod,
  declared: Declared,
  isTop?: boolean,
  isGlobal?: boolean,
) {
  const name =
    node.id.type === 'Identifier'
      ? makeName(node.id.name)
      : makeName(node.id.value)

  isGlobal = isGlobal || name === 'global'

  let n = isGlobal
    ? null
    : OUTPUT_PATH.split('/').pop() === name
    ? null
    : name

  if (node.body.type === 'TSModuleDeclaration') {
    makeModuleImports(
      node.body,
      isTop
        ? mod
        : [mod, n]
            .filter(x => x)
            .join('/')
            .replace(/google\/maps\/?/, ''),
      declared,
      isGlobal,
    )
  } else {
    node.body.body.forEach(node => {
      handleImports(
        node,
        isTop ? mod : [mod, n].filter(x => x).join('/'),
        declared,
        isGlobal,
      )
    })
  }
}

function makeAliasImports(
  node: TSTypeAliasDeclaration,
  mod: Mod,
  declared: Declared,
) {
  const typeName = makeName(node.id.name)

  declared[typeName] = { OUTPUT_PATH, mod }
}

function makeAlias(
  node: TSTypeAliasDeclaration,
  mod: Mod,
  declared: Declared,
  isGlobal?: boolean,
) {
  const typeName = node.id.name
  const imports = {}
  defined[makeName(typeName)] = { OUTPUT_PATH, mod }
  const heads = { [makeName(typeName)]: true }
  const typeParams = node.typeParameters
    ? makeTypeParameters(typeName, node.typeParameters, imports, heads)
    : []

  const text = []

  let suitName = makeName(typeName)
  const baseName = suitName

  if (NAME_SUFFIX) {
    suitName += `-${NAME_SUFFIX}`
  }

  const f = (importsPerFile[FILE] ??= {})
  f[baseName] = suitName

  if (`suit ${suitName}, name <${typeName}>`.length <= 96) {
    text.push(`suit ${suitName}, name <${typeName}>`)
  } else {
    text.push(`suit ${suitName}`)
    text.push(`  name <${typeName}>`)
  }
  if (isGlobal) {
    text.push(`  home true`)
  }

  typeParams.forEach(line => {
    text.push(`  ${line}`)
  })

  if (typeParams.length) {
    text.push(``)
  }

  makeTypeAnnotation(
    typeName,
    node.typeAnnotation,
    'like',
    imports,
    heads,
  ).forEach(line => {
    text.push(`  ${line}`)
  })

  const finalImportText = getImportText(imports, declared)

  const path = mod
    ? `tmp/${OUTPUT_PATH}/${mod}/${makeName(typeName)}`
    : `tmp/${OUTPUT_PATH}/${makeName(typeName)}`

  const write = (writes[path] = writes[path] ?? { b: [], i: [], t: [] })
  write.i.push(finalImportText)
  write.t.push('\n', ...text)
}

function makeVariable(
  node: VariableDeclaration,
  mod: Mod,
  imports: Imports,
  declared: Declared,
  isGlobal: boolean,
  hostsAndTasks: HostsAndTasks,
) {
  const text: Array<string> = []
  const globalsText: Array<string> = []

  node.declarations.forEach(dec => {
    const name = 'name' in dec.id && dec.id.name

    haveText(name, 'name')

    if (`host ${makeName(name)}, name <${name}>`.length <= 96) {
      text.push(`host ${makeName(name)}, name <${name}>`)
    } else {
      text.push(`host ${makeName(name)}`)
      text.push(`  name <${name}>`)
    }
    if (isGlobal) {
      text.push(`  home true`)
    }

    if (
      'typeAnnotation' in dec.id &&
      dec.id.typeAnnotation?.type === 'TSTypeAnnotation'
    ) {
      const like = makeTypeAnnotation(
        name,
        dec.id.typeAnnotation.typeAnnotation,
        'like',
        imports,
        {},
      )

      like.forEach(line => {
        text.push(`  ${line}`)
      })
      text.push('')
    }
  })

  hostsAndTasks.globals.hosts.push(...globalsText)
  hostsAndTasks.hosts.push(...text)
}

function makeTypeExtends(
  name: string,
  node: TSInterfaceDeclaration,
  imports: Imports,
) {
  const text: Array<string> = []
  node.extends?.forEach(node => {
    switch (node.type) {
      case 'TSExpressionWithTypeArguments':
        switch (node.expression.type) {
          case 'Identifier':
            const n = makeName(node.expression.name)
            if (imports.__ME__ !== n) {
              imports[n] = true
            }
            text.push(`base ${makeName(node.expression.name)}`)
            break
          case 'TSQualifiedName':
            let k = getQualifiedName(node.expression)
            text.push(`base ${k}`)
            break
          default:
            console.log(node)
            throw new Error(`Unknown extends expression on ${name}`)
        }

        break
      default:
        console.log(node)
        throw new Error(`Unknown extends on ${name}`)
    }
  })
  return text
}

function makeInterfaceImports(
  node: TSInterfaceDeclaration,
  mod: Mod,
  declared: Declared,
) {
  const typeName = node.id.name
  const _typeName = makeName(typeName)
  declared[_typeName] = { OUTPUT_PATH, mod }
}

function makeInterface(
  node: TSInterfaceDeclaration,
  mod: Mod = '',
  declared: Declared,
  isGlobal: boolean,
) {
  const typeName = node.id.name
  let _typeName = makeName(typeName)
  const isConstructor = !!_typeName.match('-constructor')
  if (isConstructor) {
    _typeName = _typeName.replace('-constructor', '')
    mod = mod ? mod.replace('-constructor', '') : ''
  }
  const imports: Imports = {}

  Object.defineProperty(imports, '__ME__', {
    enumerable: false,
    value: _typeName,
  })

  if (defined[_typeName]) {
    imports[_typeName] = { fromFile: true, value: defined[_typeName] }
  }
  defined[_typeName] = declared[_typeName]
  const heads = { [_typeName]: true }
  const typeParams = node.typeParameters
    ? makeTypeParameters(typeName, node.typeParameters, imports, heads)
    : []

  let suitName = _typeName
  if (NAME_SUFFIX) {
    suitName += `-${NAME_SUFFIX}`
  }

  const f = (importsPerFile[FILE] ??= {})
  f[_typeName] = suitName

  const text = []

  if (isConstructor) {
    text.push(`suit ${suitName}`)
    text.push(`  hook self`)
  } else {
    if (`suit ${suitName}, name <${typeName}>`.length <= 96) {
      text.push(`suit ${suitName}, name <${typeName}>`)
    } else {
      text.push(`suit ${suitName}`)
      text.push(`  name <${typeName}>`)
    }
  }
  if (isGlobal) {
    text.push(`  home true`)
  }
  let hasLink = false
  let hasTypeParams = !!typeParams.length

  let bases = node.extends
    ? makeTypeExtends(typeName, node, imports)
    : []

  bases.forEach(line => {
    text.push(`  ${line}`)
  })

  if (bases.length) {
    text.push(``)
  }

  typeParams.forEach(line => {
    text.push(`  ${line}`)
  })

  if (hasTypeParams) {
    text.push(``)
  }

  const indent = isConstructor ? '  ' : ''

  node.body.body.forEach(node => {
    switch (node.type) {
      case 'TSPropertySignature':
        text.push(
          ...makeProperty(node, imports, heads).map(
            x => `${indent}${x}`,
          ),
        )
        hasLink = true
        break
      default:
        break
    }
  })

  if (hasLink) {
    text.push('')
  }

  node.body.body.forEach(node => {
    switch (node.type) {
      case 'TSMethodSignature':
        text.push(
          ...makeMethod(typeName, node, imports, heads).map(
            x => `${indent}${x}`,
          ),
        )
        text.push(``)
        break
      default:
        break
    }
  })

  node.body.body.forEach(node => {
    switch (node.type) {
      case 'TSIndexSignature':
        text.push(...makeIndex(typeName, node, imports, heads))
        text.push('')
        break
      case 'TSConstructSignatureDeclaration':
        text.push(...makeConstructor(typeName, node, imports, heads))
        break
      case 'TSCallSignatureDeclaration':
        break
      case 'TSMethodSignature':
      case 'TSPropertySignature':
        break
      default:
        console.log(node)
        throw new Error(`Unknown interface thing on ${typeName}`)
    }
  })

  const finalImportText = getImportText(imports, declared)

  const path = mod
    ? `tmp/${OUTPUT_PATH}/${mod}/${_typeName}`
    : `tmp/${OUTPUT_PATH}/${_typeName}`

  const write = (writes[path] = writes[path] ?? { b: [], i: [], t: [] })
  write.i.push(finalImportText)
  write.t.push('\n', ...text)
}

function getImportText(imports: Imports, declared: Declared) {
  const importMap: Record<string, Array<string>> = {}
  Object.keys(imports).forEach(key => {
    let out
    let mod
    if (key.match(/^native-/)) {
      out = 'native'
      mod = ''
    }
    const x = imports[key]
    let val
    if (x && typeof x === 'object' && 'fromFile' in x && x.fromFile) {
      out = x.value?.OUTPUT_PATH
      mod = x.value?.mod
      const parts = [out, mod].filter(x => x).join('/')
      let p = `load @tunebond/bolt/code/javascript/${parts}/${key}`
      if (p.match(/javascript\/(dom|scripthost|webworker)/)) {
        p = p.replace(
          /\/javascript\/(dom|scripthost|webworker)/,
          (_, $1) => `/browser/${$1}`,
        )
      }
      const map = (importMap[`4:${p}`] = importMap[`4:${p}`] ?? [])
      map.push(`\n  take form ${key}`)
    } else if (x === true) {
      let v = declared[key] || defined[key] || {}
      out = 'OUTPUT_PATH' in v ? v.OUTPUT_PATH : 'native'
      // console.log('out', out, key)
      mod = 'mod' in v && v.mod
      const parts = [out, mod].filter(x => x).join('/')
      let p = `load @tunebond/bolt/code/javascript`
      if (parts) {
        p += `/${parts}`
      }
      if (p.match(/javascript\/(dom|scripthost|webworker)/)) {
        p = p.replace(
          /\/javascript\/(dom|scripthost|webworker)/,
          (_, $1) => `/browser/${$1}`,
        )
      }
      const map = (importMap[`3:${p}`] = importMap[`3:${p}`] ?? [])
      map.push(`\n  take form ${key}`)
    } else if (x === 1) {
      let v = declared[key] ?? defined[key] ?? {}
      out = 'OUTPUT_PATH' in v ? v.OUTPUT_PATH : 'native'
      // console.log('out', out, key)
      mod = 'mod' in v && v.mod
      const parts = [out, mod].filter(x => x).join('/')
      let p = `load @tunebond/bolt/code/javascript`
      if (parts) {
        p += `/${parts}`
      }
      if (p.match(/javascript\/(dom|scripthost|webworker)/)) {
        p = p.replace(
          /\/javascript\/(dom|scripthost|webworker)/,
          (_, $1) => `/browser/${$1}`,
        )
      }
      const map = (importMap[`2:${p}`] = importMap[`2:${p}`] ?? [])
      map.push(`\n  take form ${key}`)
    } else if (Array.isArray(x)) {
      val = importMap[`1:${x[0]}`] = importMap[`1:${x[0]}`] ?? []
      const a = x[1]
      if (a) {
        val.push(a)
      }
    }
  })

  const importMap2: Record<string, Record<string, boolean>> = {}
  Object.keys(importMap)
    .sort()
    .forEach(pn => {
      const [n, p] = pn.split(':')
      if (p) {
        const pmap = (importMap2[p] = importMap2[p] ?? {})
        importMap[pn]?.forEach(key => {
          pmap[key] = true
        })
      }
    })

  return importMap2
}

function makeIndex(
  typeName: string,
  node: TSIndexSignature,
  imports: Imports,
  heads: Heads,
) {
  if (node.parameters.length > 1) {
    throw new Error('Unknown index type')
  }

  const t: Array<string> = []

  const id = node.parameters[0]

  if (id) {
    makeIdentifier(typeName, id, 'mesh', imports, heads).forEach(
      line => {
        t.push(`  ${line}`)
      },
    )
  }

  if (node.typeAnnotation?.type === 'TSTypeAnnotation') {
    makeTypeAnnotation(
      typeName,
      node.typeAnnotation.typeAnnotation,
      'like',
      imports,
      heads,
    ).forEach(line => {
      t.push(`    ${line}`)
    })
  }

  return t
}

function makeConstructor(
  typeName: string,
  node: TSConstructSignatureDeclaration,
  imports: Imports,
  heads: Heads,
) {
  const constructorHeads = { ...heads }
  const typeParams = node.typeParameters
    ? makeTypeParameters(
        typeName,
        node.typeParameters,
        imports,
        constructorHeads,
      )
    : []
  const functionParams = makeFunctionParams(
    typeName,
    node,
    imports,
    constructorHeads,
  )
  const returnType =
    node.typeAnnotation?.type === 'TSTypeAnnotation'
      ? makeTypeAnnotation(
          typeName,
          node.typeAnnotation.typeAnnotation,
          `like`,
          imports,
          constructorHeads,
        )
      : []

  const t = []
  t.push(`  hook make`)
  let x: Array<string> = []
  returnType.forEach(line => {
    x.push(`    ${line}`)
  })
  t.push(...x)
  if (x.length) {
    t.push(``)
  }
  typeParams.forEach(line => {
    t.push(`    ${line}`)
  })
  if (typeParams.length) {
    t.push(``)
  }

  functionParams.forEach(line => {
    t.push(`    ${line}`)
  })
  t.push('')
  return t
}

function makeMethod(
  typeName: string,
  node: TSMethodSignature,
  imports: Imports,
  heads: Heads,
) {
  const methodHeads: Heads = { ...heads }
  const computed = node.computed
  const text: Array<string> = []

  // if (computed) {
  //   console.log(node)
  //   throw new Error(`Unknown computed method for ${typeName}`)
  // }

  switch (node.key.type) {
    case 'MemberExpression': {
      const left =
        'object' in node.key &&
        'name' in node.key.object &&
        node.key.object.name

      const right =
        'property' in node.key &&
        'name' in node.key.property &&
        node.key.property.name

      const name = [makeName(left || ''), makeName(right || '')].join(
        '/',
      )

      const typeParams = node.typeParameters
        ? makeTypeParameters(
            typeName,
            node.typeParameters,
            imports,
            methodHeads,
          )
        : []
      const functionParams = makeFunctionParams(
        typeName,
        node,
        imports,
        methodHeads,
      )
      text.push(`  task {${name}}`)
      if (node.kind === 'set') {
        // text.push(`    free seed, like void`)
      } else {
        const returnType =
          node.typeAnnotation?.type === 'TSTypeAnnotation'
            ? makeTypeAnnotation(
                typeName,
                node.typeAnnotation.typeAnnotation,
                `like`,
                imports,
                methodHeads,
              )
            : []

        let x: Array<string> = []
        returnType.forEach(line => {
          x.push(`    ${line}`)
        })
        text.push(...x)
        if (x.length) {
          text.push(``)
        }
      }
      typeParams.forEach(line => {
        text.push(`    ${line}`)
      })
      if (typeParams.length) {
        text.push(``)
      }
      functionParams.forEach(line => {
        text.push(`    ${line}`)
      })
      break
    }
    default: {
      const name = 'name' in node.key && node.key.name
      if (computed || !name) {
        throw new Error('computed')
      }
      const typeParams = node.typeParameters
        ? makeTypeParameters(
            typeName,
            node.typeParameters,
            imports,
            methodHeads,
          )
        : []
      const functionParams = makeFunctionParams(
        typeName,
        node,
        imports,
        methodHeads,
      )
      if (`  task ${makeName(name)}, name <${name}>`.length <= 96) {
        text.push(`  task ${makeName(name)}, name <${name}>`)
      } else {
        text.push(`  task ${makeName(name)}`)
        text.push(`    name <${name}>`)
      }
      if (node.kind === 'set') {
        // text.push(`    free seed, like void`)
      } else {
        const returnType =
          node.typeAnnotation?.type === 'TSTypeAnnotation'
            ? makeTypeAnnotation(
                typeName,
                node.typeAnnotation.typeAnnotation,
                `like`,
                imports,
                methodHeads,
              )
            : []

        let x: Array<string> = []
        returnType.forEach(line => {
          x.push(`    ${line}`)
        })
        text.push(...x)
        if (x.length) {
          text.push(``)
        }
      }
      typeParams.forEach(line => {
        text.push(`    ${line}`)
      })
      if (typeParams.length) {
        text.push(``)
      }
      functionParams.forEach(line => {
        text.push(`    ${line}`)
      })
    }
  }

  return text
}

function makeProperty(
  node: TSPropertySignature,
  imports: Imports,
  heads: Heads,
) {
  const t = []
  const propHeads = { ...heads }
  switch (node.key.type) {
    case 'MemberExpression': {
      const left =
        'object' in node.key &&
        'name' in node.key.object &&
        node.key.object.name

      const right =
        'property' in node.key &&
        'name' in node.key.property &&
        node.key.property.name

      const name = [makeName(left || ''), makeName(right || '')].join(
        '/',
      )
      t.push(`  link {${name}}`)
      const like =
        node.typeAnnotation?.type === 'TSTypeAnnotation'
          ? makeTypeAnnotation(
              name,
              node.typeAnnotation.typeAnnotation,
              'like',
              imports,
              propHeads,
            )
          : []

      like.forEach(line => {
        t.push(`    ${line}`)
      })
      if (!node.readonly && !node.computed) {
        t.push(`    flex true`)
      }
      if (node.computed) {
        t.push(`    work true`)
      }
      break
    }
    default: {
      if (node.computed) {
        throw new Error('computed')
      }
      const name =
        'name' in node.key
          ? node.key.name
          : 'value' in node.key
          ? String(node.key.value)
          : undefined

      // console.log(node.key)
      haveText(name, 'name')

      if (`  link ${makeName(name)}, name <${name}>`.length <= 96) {
        t.push(`  link ${makeName(name)}, name <${name}>`)
      } else {
        t.push(`  link ${makeName(name)}`)
        t.push(`    name <${name}>`)
      }
      const like =
        node.typeAnnotation?.type === 'TSTypeAnnotation'
          ? makeTypeAnnotation(
              name,
              node.typeAnnotation.typeAnnotation,
              'like',
              imports,
              propHeads,
            )
          : []

      like.forEach(line => {
        t.push(`    ${line}`)
      })
      if (!node.readonly && !node.computed) {
        t.push(`    flex true`)
      }
      if (node.computed) {
        t.push(`    work true`)
      }
    }
  }
  return t
}

function makeIdentifier(
  name: string,
  node: Identifier,
  type = 'take',
  imports: Imports,
  heads: Heads,
  isLink = false,
) {
  const text = []
  text.push(`${type} ${makeName(node.name)}`)
  if (isLink) {
    text[0] += `, name <${node.name}>`
  }
  const like =
    node.typeAnnotation?.type === 'TSTypeAnnotation'
      ? makeTypeAnnotation(
          name,
          node.typeAnnotation.typeAnnotation,
          'like',
          imports,
          heads,
        )
      : []

  const likeWithVoid = []
  if (node.optional) {
    likeWithVoid.push(`like maybe`)

    if (like.length === 1) {
      likeWithVoid[0] += `, ${like[0]}`
    } else {
      like.forEach(line => {
        likeWithVoid.push(`  ${line}`)
      })
    }
  }

  if (likeWithVoid.length === 1) {
    text[0] += `, ${likeWithVoid[0]}`
  } else {
    likeWithVoid.forEach(line => {
      text.push(`  ${line}`)
    })
  }
  // if (node.optional) {
  //   text.push(`  void true`)
  // }
  return text
}

function makeIntersectionType(
  name: string,
  node: TSIntersectionType,
  type = 'like',
  imports: Imports,
  heads: Heads,
) {
  const text = []
  // imports['and'] = [`load @tunebond/moon`, `\n  take form and`]
  text.push(`${type} and`)
  node.types.forEach(node => {
    switch (node.type) {
      case 'TSTypeReference':
        makeTypeReference(name, node, 'like', imports, heads).forEach(
          line => {
            text.push(`  ${line}`)
          },
        )
        break
      case 'TSTypeQuery':
        let k
        if (node.exprName.type === 'TSQualifiedName') {
          k = makeName(getQualifiedName(node.exprName))
        } else if (node.exprName.type === 'Identifier') {
          k = makeName(node.exprName.name)
        } else {
          throw new Error('TODO')
        }
        text.push(`  like ${k}`)
        break
      case 'TSMappedType': {
        makeMappedType(name, node, 'like', imports, heads).forEach(
          line => {
            text.push(`  ${line}`)
          },
        )
        break
      }
      case 'TSTypeLiteral':
        makeTypeLiteral(name, node, type, imports, heads).forEach(
          line => {
            text.push(`  ${line}`)
          },
        )
        break
      // case 'TSPropertySignature':
      //   makeProperty(node, imports, heads).forEach(line => {
      //     text.push(`  ${line}`)
      //   })
      //   break
      case 'TSStringKeyword':
      case 'TSVoidKeyword':
      case 'TSObjectKeyword':
        break
      default:
        console.log(node)
        throw new Error(`Unknown intersection type on ${name}`)
    }
  })
  return text
}

function makeTypeReference(
  name: string,
  node: TSTypeReference,
  type = 'like',
  imports: Imports,
  heads: Heads,
) {
  const text = []
  switch (node.typeName.type) {
    case 'Identifier': {
      const key = makeName(node.typeName.name)
      if (!heads[key] && imports.__ME__ !== key) {
        imports[key] = true
      }
      text.push(`${type} ${makeName(node.typeName.name)}`)
      break
    }
    case 'TSQualifiedName': {
      const key = getQualifiedName(node.typeName)
      if (!heads[key] && imports.__ME__ !== key) {
        imports[key] = true
      }
      text.push(`${type} ${key}`)
      break
    }
    default:
      console.log(node)
      throw new Error(`Unknown type reference on ${name}`)
  }

  if (node.typeParameters) {
    node.typeParameters.params.forEach(param => {
      makeTypeAnnotation(name, param, 'like', imports, heads).forEach(
        line => {
          text.push(`  ${line}`)
        },
      )
    })
  }

  return text
}

function getQualifiedName(node: TSQualifiedName): string {
  let name: Array<string> = []
  if (node.left.type === 'TSQualifiedName') {
    name.push(getQualifiedName(node.left))
  } else {
    name.push(makeName(node.left.name))
  }
  name.push(makeName(node.right.name))
  return name.join('-')
}

function makeUnionType(
  name: string,
  node: TSUnionType,
  type = 'like',
  imports: Imports,
  heads: Heads,
) {
  const text = [`${type} or`]
  // imports['or'] = [`load @tunebond/moon`, `\n  take form or`]
  node.types.forEach(child => {
    makeTypeAnnotation(name, child, 'like', imports, heads).forEach(
      line => {
        text.push(`  ${line}`)
      },
    )
  })
  return text
}

function makeTypeAnnotation(
  name: string,
  node: Node,
  type = 'like',
  imports: Imports,
  heads: Heads,
) {
  const text: Array<string> = []
  switch (node.type) {
    case 'TSStringKeyword':
      imports['native-string'] = 1
      text.push(`${type} native-string`)
      break
    case 'TSArrayType':
      imports['array'] = [
        `load @tunebond/bolt/code/javascript`,
        `\n  take form array`,
      ]
      text.push(`${type} array`)
      makeTypeAnnotation(
        name,
        node.elementType,
        'like',
        imports,
        heads,
      ).forEach(line => {
        text.push(`  ${line}`)
      })
      break
    case 'TSUnknownKeyword':
      // imports['unknown'] = [`load @tunebond/moon`, `\n  take form unknown`]
      text.push(`${type} unknown`)
      break
    case 'TSTypeQuery':
      let k
      if (node.exprName.type === 'TSQualifiedName') {
        k = makeName(getQualifiedName(node.exprName))
      } else if (node.exprName.type === 'Identifier') {
        k = makeName(node.exprName.name)
      } else {
        throw new Error('TODO')
      }
      text.push(`${type} ${k}`)
      break
    case 'TSVoidKeyword':
      imports['native-void'] = 1
      text.push(`${type} native-void`)
      break
    // form partial
    // head t
    //
    // walk t/link
    //   link p
    //   tool self
    //     link loan p
    //       like form-link
    //         like t
    //         like p
    //       void take
    case 'TSMappedType': {
      text.push(...makeMappedType(name, node, type, imports, heads))
      break
    }
    case 'TSLiteralType':
      if ('value' in node.literal) {
        text.push(`text <${node.literal.value}>`)
      } else {
        // console.log(node.literal)
        // throw new Error('TODO')
        text.push(`text <UNKNOWN>`)
      }
      break
    case 'TSThisType':
      imports['native-this'] = 1
      text.push(`${type} native-this`)
      break
    case 'TSTypeLiteral':
      text.push(...makeTypeLiteral(name, node, type, imports, heads))
      break
    case 'TSNeverKeyword':
      // imports['never'] = [`load @tunebond/moon`, `\n  take form never`]
      text.push(`${type} never`)
      break
    case 'TSBooleanKeyword':
      imports['native-boolean'] = 1
      text.push(`${type} native-boolean`)
      break
    case 'TSIntrinsicKeyword':
      text.push(`intrinsic`)
      break
    case 'TSTypePredicate':
      // text.push(...makePredicate(name, node, type, imports, heads))
      break
    case 'TSTypeOperator':
      switch (node.operator) {
        case 'readonly':
          text.push(
            ...makeTypeAnnotation(
              name,
              node.typeAnnotation,
              type,
              imports,
              heads,
            ),
          )
          // do nothing, since it is lock false in our situation already.
          break
        case 'unique':
          text.push(
            ...makeTypeAnnotation(
              name,
              node.typeAnnotation,
              type,
              imports,
              heads,
            ),
          )
          text.push(`  cool true`)
          break
        case 'keyof':
          // imports['key-list'] = [`load @tunebond/moon`, `\n  take form key-list`]
          text.push(`${type} key-list`)
          makeTypeAnnotation(
            name,
            node.typeAnnotation,
            'like',
            imports,
            heads,
          ).forEach(line => {
            text.push(`  ${line}`)
          })
          break
        default:
          console.log(node)
          if ('name' in node) {
            throw new Error(
              `Unknown type operator ${node.operator} on ${node.name}`,
            )
          }
          throw new Error(`Unknown type operator ${node.operator}`)
      }
      break
    case 'TSFunctionType':
      text.push(...makeFunctionType(name, node, type, imports, heads))
      break
    case 'TSIndexedAccessType':
      // imports['index'] = [`load @tunebond/moon`, `\n  take form index`]
      text.push(`${type} index`)
      makeTypeAnnotation(
        name,
        node.objectType,
        'like',
        imports,
        heads,
      ).forEach(line => {
        text.push(`  ${line}`)
      })
      makeTypeAnnotation(
        name,
        node.indexType,
        'like',
        imports,
        heads,
      ).forEach(line => {
        text.push(`  ${line}`)
      })
      break
    case 'TSSymbolKeyword':
      imports['native-symbol'] = 1
      text.push(`${type} native-symbol`)
      break
    case 'TSConstructorType':
      // console.log(node, name)
      // TODO: https://www.typescriptlang.org/docs/handbook/2/generics.html#using-class-types-in-generics
      // console.log('TODO TSConstructorType')
      break
    case 'TSBigIntKeyword':
      imports['native-bigint'] = 1
      text.push(`${type} native-bigint`)
      break
    case 'TSNullKeyword':
      imports['native-null'] = 1
      text.push(`${type} native-null`)
      break
    case 'TSConditionalType':
      text.push(
        ...makeConditionalType(name, node, type, imports, heads),
      )
      break
    case 'TSObjectKeyword':
      imports['native-object'] = 1
      text.push(`${type} native-object`)
      break
    case 'TSInferType': {
      switch (node.typeParameter.type) {
        case 'TSTypeParameter':
          const key = makeName(node.typeParameter.name)
          if (!heads[key] && imports.__ME__ !== key) {
            imports[key] = true
          }
          text.push(`name ${key}`)
          break
        default:
          console.log(node)
          throw new Error('Infer type')
      }
      break
    }
    case 'TSUndefinedKeyword':
      imports['native-undefined'] = 1
      text.push(`${type} native-undefined`)
      break
    case 'TSParenthesizedType':
      makeTypeAnnotation(
        name,
        node.typeAnnotation,
        type,
        imports,
        heads,
      ).forEach(line => {
        text.push(line)
      })
      break
    case 'TSTupleType':
      // imports['tuple'] = [`load @tunebond/moon`, `\n  take form tuple`]
      text.push(`${type} tuple`)
      node.elementTypes.forEach(node => {
        makeTypeAnnotation(name, node, 'like', imports, heads).forEach(
          line => {
            text.push(`  ${line}`)
          },
        )
      })
      break
    case 'TSNumberKeyword':
      imports['native-number'] = 1
      text.push(`${type} native-number`)
      break
    case 'TSAnyKeyword':
      // imports['any'] = [`load @tunebond/moon`, `\n  take form any`]
      text.push(`${type} any`)
      break
    case 'TSUnionType':
      text.push(...makeUnionType(name, node, type, imports, heads))
      break
    case 'TSIntersectionType':
      text.push(
        ...makeIntersectionType(name, node, type, imports, heads),
      )
      break
    case 'TSTypeReference':
      text.push(...makeTypeReference(name, node, type, imports, heads))
      break
    case 'TSRestType':
      break
    default:
      console.log(node)
      throw new Error(`Unknown type annotation on ${name}`)
  }
  return text
}

// form partial
//   head t
//
//   walk t/link
//     link p
//     tool self
//       link loan p
//         like form-link
//           like t
//           like p
//         void take
function makeMappedType(
  name: string,
  node: TSMappedType,
  type: string,
  imports: Imports,
  heads: Heads,
) {
  const text = []
  const paramName = makeName(node.typeParameter.name)
  const childHeads = { ...heads, [paramName]: true }
  const constraint = node.typeParameter.constraint
    ? makeTypeAnnotation(
        name,
        node.typeParameter.constraint,
        'like',
        imports,
        childHeads,
      )
    : []
  text.push(`slot self`)
  text.push(`walk link-name-like-list`)
  text.push(`  loan`)
  if (constraint.length === 1) {
    text[2] += ` ${constraint[0]}`
  } else {
    constraint.forEach(line => {
      text.push(`  ${line}`)
    })
  }
  text.push(`  take name`)
  text.push(`  take ${paramName}`)
  text.push(`  beam self`)
  text.push(`    take {name}`)

  if (node.typeAnnotation) {
    const anno = makeTypeAnnotation(
      name,
      node.typeAnnotation,
      'like',
      imports,
      childHeads,
    )
    anno.forEach(line => {
      text.push(`      ${line}`)
    })
  }

  return text
}

function makeTypeLiteral(
  name: string,
  node: TSTypeLiteral,
  type: string,
  imports: Imports,
  heads: Heads,
) {
  const text = []
  text.push(`${type} form`)
  // imports['form'] = [`load @tunebond/moon`, `\n  take form form`]
  node.members.forEach(node => {
    switch (node.type) {
      case 'TSPropertySignature':
        text.push(...makeProperty(node, imports, heads))
        break
      case 'TSConstructSignatureDeclaration':
        text.push(...makeConstructor(name, node, imports, heads))
        break
      case 'TSMethodSignature':
        text.push(...makeMethod(name, node, imports, heads))
        text.push(``)
        break
      case 'TSCallSignatureDeclaration':
        break
      case 'TSIndexSignature':
        text.push(...makeIndex(name, node, imports, heads))
        break
      default:
        console.log(node)
        throw new Error('Type literal')
    }
  })
  return text
}

// form unpack
//   head a

//   like test
//     test extends
//       like a
//       like list
//         name e
//       hook take
//         like e
//       hook free
//         like a
function makeConditionalType(
  name: string,
  node: TSConditionalType,
  type: string,
  imports: Imports,
  heads: Heads,
) {
  const text = []
  text.push(`${type} test`)
  // imports['test'] = [`load @tunebond/moon`, `\n  take form test`]
  text.push(`  fork roll`)

  makeTypeAnnotation(
    name,
    node.checkType,
    'like',
    imports,
    heads,
  ).forEach(line => {
    text.push(`    ${line}`)
  })

  makeTypeAnnotation(
    name,
    node.extendsType,
    'like',
    imports,
    heads,
  ).forEach(line => {
    text.push(`    ${line}`)
  })

  text.push(`    hook true`)
  makeTypeAnnotation(
    name,
    node.trueType,
    'like',
    imports,
    heads,
  ).forEach(line => {
    text.push(`      ${line}`)
  })

  text.push(`    hook false`)
  makeTypeAnnotation(
    name,
    node.falseType,
    'like',
    imports,
    heads,
  ).forEach(line => {
    text.push(`      ${line}`)
  })

  return text
}

function makePredicate(
  name: string,
  node: TSTypePredicate,
  type: string,
  imports: Imports,
  heads: Heads,
) {
  imports['native-boolean'] = 1
  const text = [`like native-boolean`]
  switch (node.parameterName.type) {
    case 'TSThisType':
      text.push(`rank self`)
      break
    case 'Identifier':
      text.push(`rank ${node.parameterName.name}`)
      break
    default:
      throw new Error(`Unknown predicate on ${name}`)
  }

  if (node.typeAnnotation) {
    const like = makeTypeAnnotation(
      name,
      node.typeAnnotation.typeAnnotation,
      'like',
      imports,
      heads,
    )

    if (like.length === 1) {
      text[1] += `, ${like[0]}`
    } else {
      like.forEach(line => {
        text.push(`  ${line}`)
      })
    }
  }

  return text
}

function makeFunctionType(
  name: string,
  node: TSFunctionType,
  type = 'like',
  imports: Imports,
  heads: Heads,
) {
  const text = [`${type} task`]
  // imports['task'] = [`load @tunebond/moon`, `\n  take form task`]
  const functionHeads = { ...heads }
  const returnType: Array<string> = []

  if (node.typeAnnotation?.typeAnnotation) {
    returnType.push(
      ...makeTypeAnnotation(
        name,
        node.typeAnnotation.typeAnnotation,
        `like`,
        imports,
        functionHeads,
      ),
    )
  } else if (node.typeAnnotation) {
    returnType.push(
      ...makeTypeAnnotation(
        name,
        node.typeAnnotation,
        `like`,
        imports,
        functionHeads,
      ),
    )
  }

  let x: Array<string> = []
  returnType.forEach(line => {
    x.push(`  ${line}`)
  })
  text.push(...x)
  if (x.length) {
    text.push(``)
  }
  const typeParams = node.typeParameters
    ? makeTypeParameters(
        name,
        node.typeParameters,
        imports,
        functionHeads,
      )
    : []
  typeParams.forEach(line => {
    text.push(`  ${line}`)
  })
  if (typeParams.length) {
    text.push(``)
  }
  makeFunctionParams(name, node, imports, functionHeads).forEach(
    line => {
      text.push(`  ${line}`)
    },
  )
  return text
}

function makeFunctionParams(
  name: string,
  node:
    | TSFunctionType
    | TSDeclareMethod
    | TSDeclareFunction
    | TSConstructSignatureDeclaration
    | MemberExpression
    | TSMethodSignature,
  imports: Imports,
  heads: Heads,
) {
  const text: Array<string> = []
  let x = 1
  const nodes = []
  if ('parameters' in node) {
    nodes.push(...node.parameters)
  } else if ('params' in node) {
    nodes.push(...node.params)
  }

  nodes.forEach(node => {
    switch (node.type) {
      case 'Identifier':
        text.push(...makeIdentifier(name, node, 'take', imports, heads))
        break
      case 'RestElement':
        text.push(...makeRestElement(name, node, imports, heads))
        break
      case 'ObjectPattern':
        let xName = `x${x++}`
        text.push(`take ${xName}, like form`)
        // imports['form'] = [`load @tunebond/moon`, `\n  take form form`]
        if (
          node.typeAnnotation?.type === 'TSTypeAnnotation' &&
          node.typeAnnotation.typeAnnotation
        ) {
          makeTypeAnnotation(
            name,
            node.typeAnnotation.typeAnnotation,
            'like',
            imports,
            heads,
          ).forEach(line => {
            text.push(`  ${line}`)
          })
        }
        // node.properties.forEach(prop => {
        //   const name = prop.key.name
        //   switch (prop.value.type) {
        //     case 'Identifier':
        //       const valName = prop.value.name
        //       break
        //     default:
        //       console.log(node)
        //       throw new Error('ObjectPattern prop')
        //   }
        // })
        break
      default:
        console.log(node)
        throw new Error(`Unknown function param on ${name}`)
    }
  })
  return text
}

function makeRestElement(
  name: string,
  node: RestElement,
  imports: Imports,
  heads: Heads,
) {
  const text = []
  switch (node.argument.type) {
    case 'Identifier':
      text.push(`take ${makeName(node.argument.name)}`)
      break
    default:
      console.log(node)
      throw new Error(`Unknown rest arg type on ${name}`)
  }
  const tsType =
    node.typeAnnotation?.type === 'TSTypeAnnotation' &&
    node.typeAnnotation.typeAnnotation
  const like = tsType
    ? makeTypeAnnotation(name, tsType, 'like', imports, heads)
    : []

  if (like.length === 1) {
    text[0] += `, ${like[0]}`
  } else {
    like.forEach(line => {
      text.push(`  ${line}`)
    })
  }

  text.push(`  rest true`)

  return text
}

function makeTypeParameters(
  name: string,
  node: TSTypeParameterDeclaration,
  imports: Imports,
  heads: Heads,
) {
  const text: Array<string> = []
  node.params.forEach(tsTypeParam => {
    // imports['like'] = [`load @tunebond/moon`, `\n  take form like`]
    heads[makeName(tsTypeParam.name)] = true
    text.push(`head ${makeName(tsTypeParam.name)}`)
    if (tsTypeParam.constraint) {
      makeTypeAnnotation(
        name,
        tsTypeParam.constraint,
        'base',
        imports,
        heads,
      ).forEach(line => {
        text.push(`  ${line}`)
      })
    }
    if (tsTypeParam.default) {
      makeTypeAnnotation(
        name,
        tsTypeParam.default,
        'fall',
        imports,
        heads,
      ).forEach(line => {
        text.push(`  ${line}`)
      })
    }
  })
  return text
}

function makeName(text: string) {
  return _.kebabCase(text)
}

function cleanText(text: string) {
  let array: Array<string> = []
  let n = 0
  let isStart = true
  text.split('\n').forEach(line => {
    if (!line.trim()) {
      n++
      if (!isStart && n < 2) {
        array.push('')
      }
    } else {
      isStart = false
      array.push(line)
      n = 0
    }
  })
  if (array[array.length - 1] === '\n') {
    array.pop()
  }
  return '\n' + array.join('\n')
}

function mkdir(path: string) {
  if (fs.existsSync(`${path}/base.link`)) {
    // console.error('MKDIR', path)
  } else {
    // console.log('mkdir', path)
    fs.mkdirSync(path, { recursive: true })
  }
}
