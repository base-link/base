import { AST, api } from '~'
import type { APIInputType, Nest } from '~'

export function finalize_codeCard_bear_nestedChildren(
  input: APIInputType,
): void {
  const text = api.resolveText(input)

  api.assertString(text)

  const card = api.getProperty(input, 'card')

  api.assertAST(card, AST.CodeModule)

  const path = api.resolveModulePath(input, text)

  card.bearList.push({
    like: AST.Export,
    link: path,
  })
}

export function process_codeCard_bear(
  input: APIInputType,
): void {
  const nest = api.assumeNest(input)
  nest.nest.forEach((nest, index) => {
    api.process_codeCard_bear_nestedChildren(
      api.extendWithNestScope(input, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_bear_hide(
  input: APIInputType,
): void {}

export function process_codeCard_bear_nestedChildren(
  input: APIInputType,
): void {
  const type = api.determineNestType(input)
  switch (type) {
    case Nest.StaticText:
      api.finalize_codeCard_bear_nestedChildren(input)
      break
    case Nest.DynamicText:
      api.processDynamicTextNest(
        input,
        api.finalize_codeCard_bear_nestedChildren,
      )
      break
    case Nest.StaticTerm:
      const term = api.resolveStaticTermFromNest(input)
      switch (term) {
        case 'hide':
          api.process_codeCard_bear_hide(input)
          break
      }
      break
    default:
      api.throwError(api.generateUnhandledTermCaseError(input))
  }
}
