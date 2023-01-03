import { Link, LinkHint, Mesh, MeshPartialType, code } from '~'
import type { MeshInputType } from '~'

export function process_codeCard_call(
  input: MeshInputType,
): void {
  const call: MeshPartialType<Mesh.Call> = {
    children: [],
    lexicalScope: input.lexicalScope,
    like: Mesh.Call,
    partial: true,
  }

  const childInput = code.extendWithObjectScope(input, call)

  code
    .assumeLinkType(input, Link.Tree)
    .nest.forEach((nest, index) => {
      process_codeCard_call_nestedChildren(
        code.withEnvironment(childInput, {
          index,
          nest,
        }),
      )
    })
}

export function process_codeCard_call_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  switch (type) {
    case LinkHint.DynamicTerm:
      break
    case LinkHint.StaticText:
      break
    case LinkHint.StaticPath:
      console.log('TODO call.staticPath')
      break
    case LinkHint.StaticTerm:
      const term = code.assumeStaticTermFromNest(input)
      const index = code.assumeNestIndex(input)
      if (index === 0) {
        const call = code.assumeBranchAsMeshPartialType(
          input,
          Mesh.Call,
        )

        call.children.push(
          code.createStringConstant('name', term),
        )
      } else {
        switch (term) {
          case 'read':
            break
          case 'loan':
            break
          case 'bind':
            code.process_codeCard_bind(input)
            break
          default:
            code.throwError(
              code.generateUnhandledTermCaseError(input),
            )
        }
      }
      break
    default:
      code.throwError(
        code.generateUnhandledNestCaseError(input, type),
      )
  }
}
