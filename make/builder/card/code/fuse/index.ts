import {
  APIInputType,
  AST,
  ASTInjectPotentialType,
  Nest,
  api,
} from '~'

export function process_codeCard_fuse(
  input: APIInputType,
): void {
  const fuse: ASTInjectPotentialType = {
    bind: [],
    like: AST.Inject,
    partial: true,
  }

  const card = api.getProperty(input, 'card')
  api.assertAST(card, AST.CodeModule)

  api.assumeNest(input).nest.forEach((nest, index) => {
    process_codeCard_fuse_nestedChildren(
      api.extendWithNestScope(input, {
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
    case Nest.StaticText:
      break
    default:
      api.throwError(api.generateUnhandledTermCaseError(input))
  }
}
