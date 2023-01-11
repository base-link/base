import { Link, LinkHint, Mesh, code } from '~'
import type { SiteProcessInputType } from '~'

export * from './bear/index.js'
export * from './save/index.js'

export function process_codeCard_load_find(
  input: SiteProcessInputType,
): void {
  const red = code.pushRed(input, code.createRedGather(input, 'find'))
  const blue = code.pushBlue(input, 'variables', {
    type: Mesh.ImportVariable,
  })
  const colorInput = code.withColors(input, { blue, red })

  code.assumeNest(colorInput).forEach((nest, index) => {
    code.addTask(input.base, () => {
      code.process_codeCard_load_find_nestedChildren(
        code.withLink(colorInput, nest, index),
      )
    })
  })
}

export function process_codeCard_load_find_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.StaticTerm: {
      const index = code.assumeLinkIndex(input)

      if (index > 0) {
        code.process_codeCard_load_find_staticTerm(input)
      } else {
        code.process_find_scope(input)
      }
      break
    }
    default: {
      code.throwError(code.generateUnhandledTermCaseError(input))
    }
  }
}

export function process_codeCard_load_find_staticTerm(
  input: SiteProcessInputType,
): void {
  const term = code.resolveTermString(input)
  switch (term) {
    case 'save':
      code.process_codeCard_load_find_save(input)
      break
    case 'bear':
      code.process_codeCard_load_find_bear(input)
      break
    default:
      code.throwError(code.generateUnknownTermError(input))
  }
}

export function process_find_scope(input: SiteProcessInputType): void {
  const nest = code.assumeLink(input, Link.Tree)
  const scope = code.assumeTermString(input)
  const nestedNest = nest.nest[0]
  code.assertGenericLink(nestedNest)

  const nestedInput = code.withLink(input, nestedNest, 0)

  const name = code.assumeTermString(nestedInput)
  const scopeString = code.createBlueString(scope)
  const nameString = code.createBlueString(name)

  code.pushRed(
    input,
    code.createRedGather(input, 'scope', [scopeString]),
  )

  code.pushRed(input, code.createRedGather(input, 'name', [nameString]))

  code.attachBlue(input, 'scopeName', scopeString)
  code.attachBlue(input, 'name', nameString)
}
