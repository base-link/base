import { AST, ASTPartialType, Nest, api } from '~'
import type { APIInputType } from '~'

export function process_codeCard_fuse(
  input: APIInputType,
): void {
  const fuse: ASTPartialType<AST.Inject> = {
    children: [],
    like: AST.Inject,
    partial: true,
  }

  const card = api.getProperty(input, 'card')
  api.assertAST(card, AST.CodeModule)

  const fuseInput = api.extendWithObjectScope(input, fuse)

  api.assumeNest(input).nest.forEach((nest, index) => {
    process_codeCard_fuse_nestedChildren(
      api.extendWithNestScope(fuseInput, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_fuse_nestedChildren(
  input: APIInputType,
): void {
  const type = api.determineNestType(input)
  switch (type) {
    case Nest.StaticTerm: {
      const term = api.assumeStaticTermFromNest(input)
      const index = api.assumeNestIndex(input)
      if (index === 0) {
        const fuse = api.assumeInputObjectAsASTPartialType(
          input,
          AST.Inject,
        )
        fuse.name = term
      } else {
        switch (term) {
          case 'bind':
            api.process_codeCard_bind(input)
            break
          case 'mark':
            api.process_codeCard_bond_mark(input)
            break
          case 'loan':
            api.process_codeCard_bond_loan(input)
            break
          default:
            api.throwError(
              api.generateUnhandledTermCaseError(input),
            )
        }
      }
      break
    }
    default:
      api.throwError(api.generateUnhandledTermCaseError(input))
  }
}
