import { AST, ASTFullType, ASTTerm_FullType, api } from '~'
import type {
  APIInputType,
  ASTConstant_FullType,
  ASTPartialType,
} from '~'

export * from './bear/index.js'
export * from './save/index.js'

export function createStringConstant(
  name: string,
  value: string,
): ASTConstant_FullType {
  return {
    complete: true,
    hidden: false,
    like: AST.Constant,
    name,
    partial: false,
    value: {
      complete: true,
      like: AST.String,
      partial: false,
      string: value,
    },
  }
}

export function createTerm(name: string): ASTTerm_FullType {
  return {
    complete: true,
    dive: false,
    like: AST.Term,
    name,
    nest: [],
    partial: false,
  }
}

export function generateFullImportVariable(
  input: ASTPartialType<AST.ImportVariable>,
): ASTFullType<AST.ImportVariable> {
  let rename
  let name
  let scope

  input.children.forEach(node => {
    if (!node.partial) {
      switch (node.like) {
        case AST.Constant:
          switch (node.name) {
            case 'scope':
              scope = api.getStringConstant(node)
              break
            case 'name':
              name = rename = api.getStringConstant(node)
              break
          }
          break
        case AST.ImportVariableRename:
          rename = node.name
          break
      }
    }
  })

  api.assertString(name)
  api.assertString(scope)
  api.assertString(rename)

  return {
    complete: true,
    like: AST.ImportVariable,
    name,
    partial: false,
    rename,
    scope,
  }
}

export function getBooleanConstant(
  c: ASTFullType<AST.Constant>,
): boolean {
  if (
    c.value &&
    'like' in c.value &&
    c.value.like === AST.Boolean
  ) {
    return c.value.boolean
  } else {
    throw Error('Oops')
  }
}

export function getStringConstant(
  c: ASTFullType<AST.Constant>,
): string {
  if (
    c.value &&
    'like' in c.value &&
    c.value.like === AST.String
  ) {
    return c.value.string
  } else {
    throw Error('Oops')
  }
}

export function process_codeCard_load_find(
  input: APIInputType,
): void {
  const find: ASTPartialType<AST.ImportVariable> = {
    children: [],
    like: AST.ImportVariable,
    partial: true,
  }

  const load = api.assumeInputObjectAsASTPartialType(
    input,
    AST.Import,
  )
  load.children.push(find)

  const childInput = api.extendWithObjectScope(input, find)

  const nest = api.assumeNest(input)
  nest.nest.forEach((nest, index) => {
    api.process_codeCard_load_find_nestedChildren(
      api.extendWithNestScope(childInput, {
        index,
        nest,
      }),
    )
  })

  if (api.childrenAreComplete(find)) {
    api.replaceASTChild(
      childInput,
      AST.Import,
      find,
      api.generateFullImportVariable(find),
    )
  }
}

export function process_codeCard_load_find_nestedChildren(
  input: APIInputType,
): void {
  const type = api.determineNestType(input)
  if (type === 'static-term') {
    const term = api.resolveStaticTermFromNest(input)
    const nest = api.assumeNest(input)
    api.assertString(term)
    const index = api.assumeNestIndex(input)

    if (index > 0) {
      switch (term) {
        case 'save':
          api.process_codeCard_load_find_save(input)
          break
        case 'bear':
          api.process_codeCard_load_find_bear(input)
          break
        default:
          api.throwError(api.generateUnknownTermError(input))
      }
    } else {
      const find = api.assumeInputObjectAsASTPartialType(
        input,
        AST.ImportVariable,
      )
      const scope = term
      const nestedNest = nest.nest[0]
      api.assertNest(nestedNest)
      const nestedInput = api.extendWithNestScope(input, {
        index: 0,
        nest: nestedNest,
      })
      const name = api.resolveStaticTermFromNest(nestedInput)
      api.assertString(name)
      find.children.push(
        api.createStringConstant('scope', scope),
        api.createStringConstant('name', name),
      )
    }
  } else {
    api.throwError(api.generateUnhandledTermCaseError(input))
  }
}
