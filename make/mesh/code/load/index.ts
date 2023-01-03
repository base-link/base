import {
  Link,
  LinkHint,
  Mesh,
  MeshFullType,
  MeshImportVariable_FullType,
  MeshImport_FullType,
  code,
} from '~'
import type { MeshInputType, MeshPartialType } from '~'

export * from './bear/index.js'
export * from './find/index.js'

export function finalize_codeCard_load_textNest(
  input: MeshInputType,
): void {
  const text = code.resolveText(input)
  code.assertString(text)

  const card = input.module
  code.assertMeshPartialType(card, Mesh.CodeModule)

  const path = code.resolveModulePath(input, text)

  code.pushIntoParentObject(
    input,
    code.createStringConstant('absolutePath', path),
  )
}

export function generateFullImport(
  input: MeshInputType,
): MeshFullType<Mesh.Import> {
  const parent = code.assumeBranchAsGenericMeshType(input)
  const children = code.assumeChildrenFromParent(parent)

  const absolutePath = code.findFullStringConstantByName(
    input,
    'absolutePath',
  )

  const variableList = children.filter(
    (node): node is MeshFullType<Mesh.ImportVariable> =>
      code.isMeshFullType(node, Mesh.ImportVariable),
  )

  const importList = children.filter(
    (node): node is MeshFullType<Mesh.Import> =>
      code.isMeshFullType(node, Mesh.Import),
  )

  code.assertString(absolutePath)

  return {
    absolutePath,
    complete: false,
    import: importList,
    like: Mesh.Import,
    partial: false,
    scope: input.scope,
    variable: variableList,
  }
}

export function process_codeCard_load(input: MeshInputType): void {
  const load: MeshPartialType<Mesh.Import> = {
    children: [],
    like: Mesh.Import,
    partial: true,
    scope: input.scope,
  }

  code.pushIntoParentObject(input, load)
  const childInput = code.withBranch(input, load)
  const nest = code.assumeLinkType(input, Link.Tree)

  nest.nest.forEach((nest, index) => {
    process_codeCard_load_nestedChildren(
      code.withEnvironment(childInput, {
        index,
        nest,
      }),
    )
  })

  if (code.childrenAreComplete(load)) {
    code.potentiallyReplaceWithFullNode(childInput, () =>
      code.generateFullImport(childInput),
    )
  }
}

export function process_codeCard_load_nestedChildren(
  input: MeshInputType,
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
