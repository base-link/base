import { AST, ASTTerm_FullType, api } from '~'
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
}

export function process_codeCard_load_find_nestedChildren(
  input: APIInputType,
): void {
  const type = api.determineNestType(input)
  if (type === 'static-term') {
    const term = api.resolveStaticTermFromNest(input)
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
      find.children.push(api.createTerm(term))
    }
  } else {
    api.throwError(api.generateUnhandledTermCaseError(input))
  }
}
