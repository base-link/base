import { Link, LinkHint, Mesh, code } from '~'
import type { MeshInputType } from '~'

export function process_codeCard_form_wear(
  input: MeshInputType,
): void {
  const container = code.createContainerScope(
    {},
    input.scope.container,
  )
  const scope = code.createStepScope(container)
  const scopeInput = code.withScope(input, scope)
  const wear = code.createMeshPartial(
    Mesh.ClassInterfaceImplementation,
    input.scope,
  )
  const childInput = code.withBranch(scopeInput, wear)

  code
    .assumeLinkType(input, Link.Tree)
    .nest.forEach((nest, index) => {
      process_codeCard_form_wear_nestedChildren(
        code.withEnvironment(childInput, {
          index,
          nest,
        }),
      )
    })
}

export function process_codeCard_form_wear_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  switch (type) {
    case LinkHint.StaticTerm: {
      const term = code.assumeStaticTermFromNest(input)
      const index = code.assumeNestIndex(input)
      if (index === 0) {
        const wear = code.assumeBranchAsMeshPartialType(
          input,
          Mesh.ClassInterfaceImplementation,
        )
        wear.children.push(
          code.createStringConstant('name', term),
        )
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
      code.throwError(
        code.generateUnhandledTermCaseError(input),
      )
  }
}
