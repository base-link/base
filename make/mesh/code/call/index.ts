import { Link, LinkHint, Mesh, MeshPartialType, code } from '~'
import type { SiteProcessInputType } from '~'

export function process_codeCard_call(
  input: SiteProcessInputType,
): void {
  const call: MeshPartialType<Mesh.Call> = {
    children: [],
    lexicalScope: input.lexicalScope,
    like: Mesh.Call,
    partial: true,
  }

  const childInput = code.withElement(input, call)

  code.assumeLink(input, Link.Tree).nest.forEach((nest, index) => {
    process_codeCard_call_nestedChildren(
      code.withEnvironment(childInput, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_call_nestedChildren(
  input: SiteProcessInputType,
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
      const term = code.assumeTerm(input)
      const index = code.assumeNestIndex(input)
      if (index === 0) {
        const call = code.assumeElementAsNest(input, Mesh.Call)

        call.children.push(code.createStringConstant('name', term))
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
            code.throwError(code.generateUnhandledTermCaseError(input))
        }
      }
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}
