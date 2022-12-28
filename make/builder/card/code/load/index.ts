import {
  AST,
  ASTFullType,
  ASTImportVariable_FullType,
  ASTImport_FullType,
  Nest,
  api,
} from '~'
import type { APIInputType, ASTPartialType } from '~'

export * from './bear/index.js'
export * from './find/index.js'

export function finalize_codeCard_load_textNest(
  input: APIInputType,
): void {
  const text = api.resolveText(input)

  api.assertString(text)

  const card = api.getProperty(input, 'card')

  api.assertASTPartial(card, AST.CodeModule)

  const path = api.resolveModulePath(input, text)

  const load = api.assumeInputObjectAsASTPartialType(
    input,
    AST.Import,
  )

  load.children.push(
    api.createStringConstant('absolutePath', path),
  )
}

export function generateFullImport(
  start: ASTPartialType<AST.Import>,
): ASTFullType<AST.Import> {
  let absolutePath
  let variableList: Array<ASTImportVariable_FullType> = []
  let importList: Array<ASTImport_FullType> = []

  start.children.forEach(node => {
    if (!node.partial) {
      switch (node.like) {
        case AST.Constant:
          if (
            node.name === 'absolutePath' &&
            'like' in node.value &&
            node.value.like === AST.String
          ) {
            absolutePath = node.value.string
          }
          break
        case AST.Import:
          importList.push(node)
          break
        case AST.ImportVariable:
          variableList.push(node)
          break
      }
    }
  })

  api.assertString(absolutePath)

  return {
    absolutePath,
    complete: false,
    import: importList,
    like: AST.Import,
    partial: false,
    variable: variableList,
  }
}

export function process_codeCard_load(
  input: APIInputType,
): void {
  const load: ASTPartialType<AST.Import> = {
    children: [],
    like: AST.Import,
    partial: true,
  }

  const loader = api.assumeInputObjectAsASTPartialType<
    AST.CodeModule | AST.Import
  >(input, [AST.CodeModule, AST.Import])

  loader.children.push(load)
  const childInput = api.extendWithObjectScope(input, load)

  api.assumeNest(input).nest.forEach((nest, index) => {
    process_codeCard_load_nestedChildren(
      api.extendWithNestScope(childInput, {
        index,
        nest,
      }),
    )
  })

  if (api.childrenAreComplete(load)) {
    api.replaceASTChild<
      AST.CodeModule | AST.Import,
      ASTPartialType<AST.Import>,
      ASTFullType<AST.Import>
    >(
      childInput,
      [AST.CodeModule, AST.Import],
      load,
      api.generateFullImport(load),
    )
  } else {
  }
}

export function process_codeCard_load_nestedChildren(
  input: APIInputType,
) {
  const type = api.determineNestType(input)
  switch (type) {
    case Nest.StaticText: {
      const index = api.assumeNestIndex(input)
      if (index !== 0) {
        throw new Error('Oops')
      } else {
        api.finalize_codeCard_load_textNest(input)
      }
      break
    }

    case Nest.StaticTerm: {
      const term = api.resolveStaticTermFromNest(input)
      switch (term) {
        case 'find':
        case 'take':
          api.process_codeCard_load_find(input)
          break
        case 'load':
          api.process_codeCard_load(input)
          break
        case 'bear':
          api.process_codeCard_load_bear(input)
          break
        default:
          api.throwError(api.generateUnknownTermError(input))
      }
      break
    }

    default:
      api.throwError(
        api.generateUnhandledNestCaseError(input, type),
      )
  }
}
