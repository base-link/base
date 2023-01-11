import { Link, LinkHint, Mesh, Nest, code } from '~'
import type {
  MeshCallType,
  NestCallType,
  SiteProcessInputType,
} from '~'

export function generate_codeCard_call(
  input: SiteProcessInputType,
): MeshCallType {
  const name = code.findFullStringConstantByName(input, 'name')
  code.assertString(name)

  return {
    bond: undefined,
    bound: false,
    name,
    type: Mesh.Call,
  }
}

export function process_codeCard_call(
  input: SiteProcessInputType,
): void {
  const call: NestCallType = {
    children: [],
    scope: input.scope,
    type: Nest.Call,
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
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.DynamicTerm: {
      const index = code.assumeLinkIndex(input)
      if (index === 0) {
        const call = code.assumeElementAsNest(input, Nest.Call)
        const path = code.assumeLink(input)

        if (code.isLink(path, Link.Term)) {
          call.children.push(
            code.createConstant('path', code.createPath(path)),
          )
        }
      } else {
        code.throwError(
          code.generateUnhandledNestCaseError(input, type),
        )
      }
      break
    }
    case LinkHint.StaticText:
      break
    case LinkHint.StaticPath:
    case LinkHint.DynamicPath: {
      const index = code.assumeLinkIndex(input)
      if (index === 0) {
        const call = code.assumeElementAsNest(input, Nest.Call)
        const path = code.assumeLink(input)

        if (code.isLink(path, Link.Path)) {
          call.children.push(
            code.createConstant('path', code.createPath(path)),
          )
        }
      } else {
        code.throwError(
          code.generateUnhandledNestCaseError(input, type),
        )
      }
      break
    }
    case LinkHint.StaticTerm: {
      const index = code.assumeLinkIndex(input)
      if (index === 0) {
        const call = code.assumeElementAsNest(input, Nest.Call)
        const path = code.assumeLink(input)

        if (code.isLink(path, Link.Term)) {
          call.children.push(
            code.createConstant('path', code.createPath(path)),
          )
        }
      } else {
        const term = code.assumeTerm(input)
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
    }
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}
