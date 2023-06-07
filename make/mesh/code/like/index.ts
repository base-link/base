import { Link, LinkHint, Mesh, code } from '~'
import type { SiteProcessInputType } from '~'

export function process_codeCard_like(
  input: SiteProcessInputType,
): void {
  const red = code.pushRed(
    input,
    code.createRedGather(input, 'definedType'),
  )
  const blue = code.attachBlue(input, 'definedType', {
    bind: [] as unknown as code.BlueArrayType<code.BlueClassReferenceType>,
    type: Mesh.ClassReference,
  })

  const childInput = code.withColors(input, { blue, red })

  code.assumeNest(input).forEach((nest, index) => {
    code.addTask(input.base, () => {
      process_codeCard_like_nestedChildren(
        code.withLink(childInput, nest, index),
      )
    })
  })
}

export function process_codeCard_like_free(
  input: SiteProcessInputType,
): void {}

export function process_codeCard_like_head(
  input: SiteProcessInputType,
): void {}

export function process_codeCard_like_like(
  input: SiteProcessInputType,
): void {}

export function process_codeCard_like_list(
  input: SiteProcessInputType,
): void {}

export function process_codeCard_like_mesh(
  input: SiteProcessInputType,
): void {}

export function process_codeCard_like_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.DynamicTerm: {
      const index = code.assumeLinkIndex(input)
      if (index === 0) {
        code.process_first_dynamicTerm(input, 'name')
      } else {
        code.process_dynamicTerm(input)
      }
      break
    }
    case LinkHint.StaticTerm: {
      const index = code.assumeLinkIndex(input)
      if (index === 0) {
        code.process_first_staticTerm(input, 'name')
        return
      }

      const term = code.assumeTermString(input)
      switch (term) {
        case 'head':
          code.process_codeCard_head(input)
          break
        case 'like':
          code.process_codeCard_like_like(input)
          break
        case 'list':
          code.process_codeCard_like_list(input)
          break
        case 'mesh':
          code.process_codeCard_like_mesh(input)
          break
        case 'take':
          code.process_codeCard_like_take(input)
          break
        case 'free':
          code.process_codeCard_like_free(input)
          break
        case 'term':
          code.process_codeCard_like_term(input)
          break
        case 'link':
          // code.process_codeCard_link(input)
          break
        case 'task':
          code.process_codeCard_task(input)
          break
        case 'stem':
          code.process_codeCard_stem(input)
          break
        default:
          code.throwError(code.generateUnhandledTermCaseError(input))
      }
      break
    }
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

export function process_codeCard_like_take(
  input: SiteProcessInputType,
): void {}

export function process_codeCard_like_term(
  input: SiteProcessInputType,
): void {}
