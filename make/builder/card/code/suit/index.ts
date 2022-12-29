import { AST, ASTPartialType, api } from '~'
import type { APIInputType } from '~'

export function process_codeCard_suit(
  input: APIInputType,
): void {
  const suit: ASTPartialType<AST.ClassInterface> = {
    children: [],
    like: AST.ClassInterface,
    partial: true,
  }

  const childInput = api.extendWithObjectScope(input, suit)

  api.assumeNest(childInput).nest.forEach((nest, index) => {
    api.process_codeCard_suit_nestedChildren(
      api.extendWithNestScope(childInput, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_suit_nestedChildren(
  input: APIInputType,
): void {
  const type = api.determineNestType(input)
  if (type === 'static-term') {
    const term = api.assumeStaticTermFromNest(input)
    const index = api.assumeNestIndex(input)
    if (index === 0) {
      const suit = api.assumeInputObjectAsASTPartialType(
        input,
        AST.ClassInterface,
      )
      suit.children.push(api.createTerm(term))
      return
    }
    switch (term) {
      case 'link':
        api.process_codeCard_link(input)
        break
      case 'task':
        api.process_codeCard_task(input)
        break
      case 'case':
        // api.process_codeCard_formTask(input)
        break
      case 'note':
        api.process_codeCard_note(input)
        break
      case 'head':
        api.process_codeCard_head(input)
        break
      default:
        api.throwError(
          api.generateUnhandledTermCaseError(input),
        )
    }
  } else {
    api.throwError(
      api.generateUnhandledNestCaseError(input, type),
    )
  }
}
