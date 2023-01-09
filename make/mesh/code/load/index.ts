import {
  Link,
  LinkHint,
  Mesh,
  MeshImportType,
  MeshImportVariableType,
  Nest,
  NestImportType,
  code,
} from '~'
import type { SiteProcessInputType } from '~'

export * from './bear/index.js'
export * from './find/index.js'

export function finalize_codeCard_load_textNest(
  input: SiteProcessInputType,
): void {
  const text = code.resolveText(input)
  code.assertString(text)

  const path = code.resolveModulePath(input, text)

  code.pushIntoParentObject(
    input,
    code.createStringConstant('absolutePath', path),
  )
}

export function generateFullImport(
  input: SiteProcessInputType,
): MeshImportType {
  const parent = code.assumeElementAsGenericNest(input)
  const children = code.assumeChildrenFromParent(parent)

  const absolutePath = code.findFullStringConstantByName(
    input,
    'absolutePath',
  )

  const variableList = children.filter(
    (node): node is MeshImportVariableType =>
      code.isMesh(node, Mesh.ImportVariable),
  )

  const importList = children.filter((node): node is MeshImportType =>
    code.isMesh(node, Mesh.Import),
  )

  code.assertString(absolutePath)

  return {
    absolutePath,
    complete: false,
    import: importList,
    like: Mesh.Import,
    scope: input.scope,
    variable: variableList,
  }
}

export function process_codeCard_load(
  input: SiteProcessInputType,
): void {
  const load: NestImportType = {
    children: [],
    like: Nest.Import,
    scope: input.scope,
  }

  code.pushIntoParentObject(input, load)
  const childInput = code.withElement(input, load)
  const nest = code.assumeLink(input, Link.Tree)

  nest.nest.forEach((nest, index) => {
    process_codeCard_load_nestedChildren(
      code.withEnvironment(childInput, {
        index,
        nest,
      }),
    )
  })

  if (code.childrenAreMesh(load)) {
    code.potentiallyReplaceWithFullNode(childInput, () =>
      code.generateFullImport(childInput),
    )
  }
}

export function process_codeCard_load_nestedChildren(
  input: SiteProcessInputType,
) {
  const type = code.determineNestType(input)
  switch (type) {
    case LinkHint.StaticText: {
      const index = code.assumeNestIndex(input)
      if (index !== 0) {
        code.throwError(code.generateInvalidCompilerStateError())
      } else {
        code.finalize_codeCard_load_textNest(input)
      }
      break
    }

    case LinkHint.StaticTerm: {
      const term = code.resolveTerm(input)
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
