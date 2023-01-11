import {
  Link,
  LinkHint,
  Mesh,
  MeshImportType,
  MeshImportVariableType,
  code,
} from '~'
import type { SiteProcessInputType } from '~'

export * from './bear/index.js'
export * from './find/index.js'

export function createMeshImport(
  input: SiteProcessInputType,
): MeshImportType {
  const parent = code.assumeElementAsGenericNest(input)
  const children = code.assumeChildrenFromParent(parent)

  const absolutePath = code.findPlaceholderByName(input, 'absolutePath')

  const variableList = children.filter(
    (node): node is MeshImportVariableType =>
      code.isMesh(node, Mesh.ImportVariable),
  )

  const importList = children.filter((node): node is MeshImportType =>
    code.isMesh(node, Mesh.Import),
  )

  code.assertString(absolutePath)

  const bound =
    variableList.filter(x => x.bound).length +
      importList.filter(x => x.bound).length ===
    0

  return {
    absolutePath,
    bound,
    import: importList,
    scope: input.scope,
    type: Mesh.Import,
    variable: variableList,
  }
}

export function finalize_codeCard_load_textNest(
  input: SiteProcessInputType,
): void {
  const text = code.resolveText(input)
  code.assertString(text)

  const path = code.resolveModulePath(input, text)

  code.gatherIntoMeshParent(
    input,
    code.createStringConstant('absolutePath', path),
  )
}

export function process_codeCard_load(
  input: SiteProcessInputType,
): void {
  const load: NestImportType = {
    children: [],
    scope: input.scope,
    type: Nest.Import,
  }

  code.gatherIntoMeshParent(input, load)
  const childInput = code.withElement(input, load)
  const nest = code.assumeLink(input, Link.Tree)

  nest.nest.forEach((nest, index) => {
    process_codeCard_load_nestedChildren(
      code.withLink(childInput, nest, index),
    )
  })

  if (code.childrenAreMesh(load)) {
    code.potentiallyReplaceWithFullNode(childInput, () =>
      code.createMeshImport(childInput),
    )
  }
}

export function process_codeCard_load_nestedChildren(
  input: SiteProcessInputType,
) {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.StaticText: {
      const index = code.assumeLinkIndex(input)
      if (index !== 0) {
        code.throwError(code.generateInvalidCompilerStateError())
      } else {
        code.finalize_codeCard_load_textNest(input)
      }
      break
    }

    case LinkHint.StaticTerm: {
      const term = code.resolveTermString(input)
      switch (term) {
        case 'find':
        case 'take':
          code.process_codeCard_load_find(input)
          break
        case 'load':
          code.process_codeCard_load(input)
          break
        case 'bear':
          code.process_codeCard_load_bear(input)
          break
        default:
          code.throwError(code.generateUnknownTermError(input))
      }
      break
    }

    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}
