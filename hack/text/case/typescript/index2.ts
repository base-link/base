import babel from '@babel/parser'
import {
  ClassDeclaration,
  RestElement,
  TSTypeLiteral,
  VariableDeclaration,
  ExportNamedDeclaration,
  ModuleDeclaration,
  Node,
  TSTypeParameter,
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
  TSTypeQuery,
} from '@babel/types'
import _ from 'lodash'

type Cite = {
  form: string
  link: string
}

export type RiseForm = {
  form: 'rise-form'
  link: {
    head: RiseHeadHash
    name: string
  }
}

export type RiseHead = {
  form: 'rise-head'
  link: {
    base?: RiseLikeNeed
    fall?: RiseLikeNeed
    name: string
  }
}

export type RiseHeadHash = Record<string, boolean | RiseHead>

export type RiseLike = {
  form: 'rise-like'
  link: {
    like?: Array<RiseLikeNeed>
    name: string
  }
}

export type RiseLikeList = {
  form: 'rise-like-list'
  link: {
    like: RiseLikeNeed
  }
}

export type RiseLikeNeed = RiseLike | RiseLikeList

export type RiseLoadHash = Record<string, boolean>

type State = {
  // what it makes available, in link text terms
  bear: Record<string, string>
  call: Array<any>
  // namespace
  host?: string
  // path is the path to the import
  // type is what type of import it is (task, form, etc.)
  importables: Record<string, Cite>
  // key is the generated link text name
  load: RiseLoadHash
}

function make(code: string, importables: Record<string, Cite> = {}) {
  const tree = babel.parse(code, {
    allowUndeclaredExports: true,
    errorRecovery: true,
    plugins: ['classProperties', 'typescript'],
    sourceType: 'module',
    strictMode: false,
  })

  const state = {
    bear: {},
    call: [],
    importables,
    load: {},
  }

  tree.program.body.forEach(node => {
    handleBody(node, state)
  })
}

function handleBody(node: Node, state: State) {
  switch (node.type) {
    case 'TSInterfaceDeclaration':
      makeInterfaceDeclaration(node, state)
      break
    case 'TSModuleDeclaration':
      makeModuleDeclaration(node, state)
      break
    // case 'VariableDeclaration': {
    //   makeVariableDeclaration(node, state)
    //   break
    // }
    // case 'ExportDefaultDeclaration':
    //   // console.log('ExportDefaultDeclaration')
    //   break
    // case 'TSDeclareFunction': {
    //   makeDeclareFunction(node, state)
    //   break
    // }
    // case 'ImportDeclaration':
    //   // console.log('ImportDeclaration')
    //   break
    // case 'TSTypeAliasDeclaration':
    //   makeTSTypeAliasDeclaration(node, state)
    //   break
    // case 'TSImportEqualsDeclaration':
    //   // console.log('TSImportEqualsDeclaration')
    //   break
    // case 'ExportAllDeclaration':
    //   // console.log('ExportAllDeclaration')
    //   break
    // case 'ClassDeclaration':
    //   makeClass(node, mod, declared, isGlobal)
    //   break
    // case 'ExportNamedDeclaration': {
    //   makeExportNamed(node, mod, declared, isGlobal, hostsAndTasks)
    //   break
    // }
    // case 'TSExportAssignment':
    //   break
    // case 'TSEnumDeclaration':
    //   console.log('TSEnumDeclaration')
    //   break
    default:
      console.log(node)
      throw new Error(`Unknown program type`)
  }
}

function makeInterfaceDeclaration(
  node: TSInterfaceDeclaration,
  state: State,
) {
  const nameBase = node.id.name
  let nameHead = makeName(nameBase)

  const form: RiseForm = {
    form: 'rise-form',
    link: {
      head: { [nameHead]: false },
      name: nameHead,
    },
  }

  node.typeParameters?.params.forEach(param => {
    const head = makeTSTypeParameter(param, form.link.head, state.load)
    form.link.head[head.link.name] = head
  })
}

function makeModuleDeclaration(
  node: TSModuleDeclaration,
  state: State,
) {
  const name =
    node.id.type === 'Identifier'
      ? makeName(node.id.name)
      : makeName(node.id.value)

  const isGlobal = name === 'global'

  const hostName = [state.host, name].filter(x => x).join('/')

  const host = {
    form: 'rise-host',
    link: {
      name,
    },
  }

  if (node.body.type === 'TSModuleDeclaration') {
    // makeModuleImports(
    //   node.body,
    //   isTop
    //     ? mod
    //     : [mod, n]
    //         .filter(x => x)
    //         .join('/')
    //         .replace(/google\/maps\/?/, ''),
    //   declared,
    //   isGlobal,
    // )
  } else {
    node.body.body.forEach(node => {
      handleBody(node, { ...state, host: hostName })
    })
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

function makeTSTypeParameter(
  node: TSTypeParameter,
  headHash: RiseHeadHash,
  loadHash: RiseLoadHash,
) {
  const name = makeName(node.name)
  const head: RiseHead = (headHash[name] = {
    form: 'rise-head',
    link: {
      name,
    },
  })

  if (node.constraint) {
    head.link.base = makeTypeAnnotation(
      node.constraint,
      loadHash,
      headHash,
    )
  }

  if (node.default) {
    head.link.fall = makeTypeAnnotation(
      node.default,
      loadHash,
      headHash,
    )
  }

  return head
}

function makeTypeAnnotation(
  node: Node,
  loadHash: RiseLoadHash,
  headHash: RiseHeadHash,
): RiseLikeNeed {
  switch (node.type) {
    case 'TSStringKeyword':
      loadHash['native-string'] = true
      return {
        form: 'rise-like',
        link: {
          name: 'native-string',
        },
      }
      break
    case 'TSArrayType':
      loadHash['array'] = true
      return {
        form: 'rise-like-list',
        link: {
          like: makeTypeAnnotation(
            node.elementType,
            loadHash,
            headHash,
          ),
        },
      }
      break
    case 'TSUnknownKeyword':
      // loadHash['unknown'] = [`load @tunebond/moon`, `\n  take form unknown`]
      return {
        form: 'rise-like',
        link: {
          name: 'unknown',
        },
      }
      break
    case 'TSTypeQuery':
      return {
        form: 'rise-like',
        link: {
          name: getNameFromTypeQuery(node),
        },
      }
      break
    case 'TSVoidKeyword':
      loadHash['native-void'] = true
      return {
        form: 'rise-like',
        link: {
          name: 'native-void',
        },
      }
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
    //   case 'TSMappedType': {
    //     text.push(...makeMappedType(name, node, type, loadHash, heads))
    //     break
    //   }
    //   case 'TSLiteralType':
    //     if ('value' in node.literal) {
    //       text.push(`text <${node.literal.value}>`)
    //     } else {
    //       // console.log(node.literal)
    //       // throw new Error('TODO')
    //       text.push(`text <UNKNOWN>`)
    //     }
    //     break
    //   case 'TSThisType':
    //     loadHash['native-this'] = 1
    //     text.push(`${type} native-this`)
    //     break
    //   case 'TSTypeLiteral':
    //     text.push(...makeTypeLiteral(name, node, type, loadHash, heads))
    //     break
    //   case 'TSNeverKeyword':
    //     // loadHash['never'] = [`load @tunebond/moon`, `\n  take form never`]
    //     text.push(`${type} never`)
    //     break
    //   case 'TSBooleanKeyword':
    //     loadHash['native-boolean'] = 1
    //     text.push(`${type} native-boolean`)
    //     break
    //   case 'TSIntrinsicKeyword':
    //     text.push(`intrinsic`)
    //     break
    //   case 'TSTypePredicate':
    //     // text.push(...makePredicate(name, node, type, loadHash, heads))
    //     break
    //   case 'TSTypeOperator':
    //     switch (node.operator) {
    //       case 'readonly':
    //         text.push(
    //           ...makeTypeAnnotation(
    //             name,
    //             node.typeAnnotation,
    //             type,
    //             loadHash,
    //             heads,
    //           ),
    //         )
    //         // do nothing, since it is lock false in our situation already.
    //         break
    //       case 'unique':
    //         text.push(
    //           ...makeTypeAnnotation(
    //             name,
    //             node.typeAnnotation,
    //             type,
    //             loadHash,
    //             heads,
    //           ),
    //         )
    //         text.push(`  cool true`)
    //         break
    //       case 'keyof':
    //         // loadHash['key-list'] = [`load @tunebond/moon`, `\n  take form key-list`]
    //         text.push(`${type} key-list`)
    //         makeTypeAnnotation(
    //           name,
    //           node.typeAnnotation,
    //           'like',
    //           loadHash,
    //           heads,
    //         ).forEach(line => {
    //           text.push(`  ${line}`)
    //         })
    //         break
    //       default:
    //         console.log(node)
    //         if ('name' in node) {
    //           throw new Error(
    //             `Unknown type operator ${node.operator} on ${node.name}`,
    //           )
    //         }
    //         throw new Error(`Unknown type operator ${node.operator}`)
    //     }
    //     break
    //   case 'TSFunctionType':
    //     text.push(...makeFunctionType(name, node, type, loadHash, heads))
    //     break
    //   case 'TSIndexedAccessType':
    //     // loadHash['index'] = [`load @tunebond/moon`, `\n  take form index`]
    //     text.push(`${type} index`)
    //     makeTypeAnnotation(
    //       name,
    //       node.objectType,
    //       'like',
    //       loadHash,
    //       heads,
    //     ).forEach(line => {
    //       text.push(`  ${line}`)
    //     })
    //     makeTypeAnnotation(
    //       name,
    //       node.indexType,
    //       'like',
    //       loadHash,
    //       heads,
    //     ).forEach(line => {
    //       text.push(`  ${line}`)
    //     })
    //     break
    //   case 'TSSymbolKeyword':
    //     loadHash['native-symbol'] = 1
    //     text.push(`${type} native-symbol`)
    //     break
    //   case 'TSConstructorType':
    //     // console.log(node, name)
    //     // TODO: https://www.typescriptlang.org/docs/handbook/2/generics.html#using-class-types-in-generics
    //     // console.log('TODO TSConstructorType')
    //     break
    //   case 'TSBigIntKeyword':
    //     loadHash['native-bigint'] = 1
    //     text.push(`${type} native-bigint`)
    //     break
    //   case 'TSNullKeyword':
    //     loadHash['native-null'] = 1
    //     text.push(`${type} native-null`)
    //     break
    //   case 'TSConditionalType':
    //     text.push(
    //       ...makeConditionalType(name, node, type, loadHash, heads),
    //     )
    //     break
    //   case 'TSObjectKeyword':
    //     loadHash['native-object'] = 1
    //     text.push(`${type} native-object`)
    //     break
    //   case 'TSInferType': {
    //     switch (node.typeParameter.type) {
    //       case 'TSTypeParameter':
    //         const key = makeName(node.typeParameter.name)
    //         if (!heads[key] && loadHash.__ME__ !== key) {
    //           loadHash[key] = true
    //         }
    //         text.push(`name ${key}`)
    //         break
    //       default:
    //         console.log(node)
    //         throw new Error('Infer type')
    //     }
    //     break
    //   }
    //   case 'TSUndefinedKeyword':
    //     loadHash['native-undefined'] = 1
    //     text.push(`${type} native-undefined`)
    //     break
    //   case 'TSParenthesizedType':
    //     makeTypeAnnotation(
    //       name,
    //       node.typeAnnotation,
    //       type,
    //       loadHash,
    //       heads,
    //     ).forEach(line => {
    //       text.push(line)
    //     })
    //     break
    //   case 'TSTupleType':
    //     // loadHash['tuple'] = [`load @tunebond/moon`, `\n  take form tuple`]
    //     text.push(`${type} tuple`)
    //     node.elementTypes.forEach(node => {
    //       makeTypeAnnotation(name, node, 'like', loadHash, heads).forEach(
    //         line => {
    //           text.push(`  ${line}`)
    //         },
    //       )
    //     })
    //     break
    //   case 'TSNumberKeyword':
    //     loadHash['native-number'] = 1
    //     text.push(`${type} native-number`)
    //     break
    //   case 'TSAnyKeyword':
    //     // loadHash['any'] = [`load @tunebond/moon`, `\n  take form any`]
    //     text.push(`${type} any`)
    //     break
    //   case 'TSUnionType':
    //     text.push(...makeUnionType(name, node, type, loadHash, heads))
    //     break
    //   case 'TSIntersectionType':
    //     text.push(
    //       ...makeIntersectionType(name, node, type, loadHash, heads),
    //     )
    //     break
    //   case 'TSTypeReference':
    //     text.push(...makeTypeReference(name, node, type, loadHash, heads))
    //     break
    //   case 'TSRestType':
    //     break
    default:
      console.log(node)
      throw new Error(`Unknown type annotation`)
  }
  // return text
}

function getNameFromTypeQuery(node: TSTypeQuery) {
  if (node.exprName.type === 'TSQualifiedName') {
    return makeName(getQualifiedName(node.exprName))
  } else if (node.exprName.type === 'Identifier') {
    return makeName(node.exprName.name)
  } else {
    throw new Error('TODO')
  }
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

function makeName(text: string) {
  return _.kebabCase(text)
}
