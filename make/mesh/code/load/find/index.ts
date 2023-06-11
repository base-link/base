import { Link, LinkHint, Mesh, code } from '~'
import type { MeshLoad } from '~'

export * from './bear/index.js'
export * from './save/index.js'

export function load_codeCard_load_find(load: MeshLoad): void {
  const red = code.pushRed(load, code.createRedGather(load, 'find'))
  const blue = code.pushBlue(load, 'variables', {
    type: Mesh.ImportVariable,
  })
  const colorInput = code.withColors(load, { blue, red })

  code.assumeNest(colorInput).forEach((nest, index) => {
    code.addTask(load.base, () => {
      code.load_codeCard_load_find_nestedChildren(
        code.withLink(colorInput, nest, index),
      )
    })
  })
}

export function load_codeCard_load_find_nestedChildren(
  load: MeshLoad,
): void {
  const type = code.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticTerm: {
      const index = code.assumeLinkIndex(load)

      if (index > 0) {
        code.load_codeCard_load_find_staticTerm(load)
      } else {
        code.load_find_scope(load)
      }
      break
    }
    default: {
      code.throwError(code.generateUnhandledTermCaseError(load))
    }
  }
}

export function load_codeCard_load_find_staticTerm(
  load: MeshLoad,
): void {
  const term = code.resolveTermString(load)
  switch (term) {
    case 'save':
      code.load_codeCard_load_find_save(load)
      break
    case 'bear':
      code.load_codeCard_load_find_bear(load)
      break
    default:
      code.throwError(code.generateUnknownTermError(load))
  }
}

export function load_find_scope(load: MeshLoad): void {
  const nest = code.assumeLink(load, Link.Tree)
  const scope = code.assumeTermString(load)
  const nestedNest = nest.nest[0]
  code.assertGenericLink(nestedNest)

  const nestedInput = code.withLink(load, nestedNest, 0)

  const name = code.assumeTermString(nestedInput)
  const scopeString = code.createBlueString(scope)
  const nameString = code.createBlueString(name)

  code.pushRed(load, code.createRedGather(load, 'scope', [scopeString]))

  code.pushRed(load, code.createRedGather(load, 'name', [nameString]))

  code.attachBlue(load, 'scopeName', scopeString)
  code.attachBlue(load, 'name', nameString)
}
