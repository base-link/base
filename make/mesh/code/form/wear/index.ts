import { Link, LinkHint, Mesh, code } from '~'
import type { SiteProcessInputType } from '~'

export function process_codeCard_form_wear(
  input: SiteProcessInputType,
): void {
  const container = code.createContainerScope({}, input.scope.container)
  const scope = code.createStepScope(container)
  const scopeInput = code.withScope(input, scope)
  const wear = code.createNest(
    Mesh.ClassInterfaceImplementation,
    input.scope,
  )
  const childInput = code.withElement(scopeInput, wear)

  code.assumeLink(input, Link.Tree).nest.forEach((nest, index) => {
    process_codeCard_form_wear_nestedChildren(
      code.withEnvironment(childInput, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_form_wear_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.StaticTerm: {
      const term = code.assumeTerm(input)
      const index = code.assumeLinkIndex(input)
      if (index === 0) {
        const wear = code.assumeElementAsNest(
          input,
          Mesh.ClassInterfaceImplementation,
        )
        wear.children.push(code.createStringConstant('name', term))
        return
      }

      switch (term) {
        case 'head':
          code.process_codeCard_head(input)
          break
        default:
          code.throwError(code.generateUnknownTermError(input))
      }
      break
    }
    default:
      code.throwError(code.generateUnhandledTermCaseError(input))
  }
}
