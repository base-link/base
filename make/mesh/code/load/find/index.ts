import {
  Link,
  LinkHint,
  Mesh,
  MeshFullType,
  Mesh_FullTypeMixin,
  Mesh_PartialTypeMixin,
  code,
} from '~'
import type { MeshInputType } from '~'

export * from './bear/index.js'
export * from './save/index.js'

export type MeshPartialChildrenContainerType = {
  children: Array<Mesh_PartialTypeMixin | Mesh_FullTypeMixin>
}

export function generateFullImportVariable(
  input: MeshInputType,
): MeshFullType<Mesh.ImportVariable> {
  const parent = code.assumeBranchAsGenericMeshType(input)
  const children = code.assumeChildrenFromParent(parent)

  const rename = children.find<MeshFullType<Mesh.ImportVariableRename>>(
    (node): node is MeshFullType<Mesh.ImportVariableRename> =>
      code.isMeshFullType(node, Mesh.ImportVariableRename),
  )

  const name = code.findFullStringConstantByName(input, 'name')
  const scopeName = code.findFullStringConstantByName(input, 'scope')

  code.assertString(name)
  code.assertString(scopeName)

  return {
    complete: true,
    like: Mesh.ImportVariable,
    name,
    partial: false,
    rename: rename ? rename.name : name,
    scopeName,
  }
}

export function process_codeCard_load_find(input: MeshInputType): void {
  const nest = code.assumeLinkType(input, Link.Tree)

  const find = code.createMeshPartial(Mesh.ImportVariable)
  code.pushIntoParentObject(input, find)

  const childInput = code.withBranch(input, find)

  code.processNestedChildren(
    childInput,
    nest,
    code.process_codeCard_load_find_nestedChildren,
  )

  code.replaceIfComplete(childInput, find, () =>
    code.generateFullImportVariable(childInput),
  )
}

export function process_codeCard_load_find_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  switch (type) {
    case LinkHint.StaticTerm: {
      const index = code.assumeNestIndex(input)

      if (index > 0) {
        code.process_codeCard_load_find_staticTerm(input)
      } else {
        code.process_codeCard_load_find_scope(input)
      }
      break
    }
    default: {
      code.throwError(code.generateUnhandledTermCaseError(input))
    }
  }
}

export function process_codeCard_load_find_scope(
  input: MeshInputType,
): void {
  const nest = code.assumeNest(input)
  code.assertLinkType(nest, Link.Tree)

  const term = code.resolveTerm(input)
  code.assertString(term)
  const scope = term
  const nestedNest = nest.nest[0]
  code.assertGenericLinkType(nestedNest)
  const nestedInput = code.withEnvironment(input, {
    index: 0,
    nest: nestedNest,
  })
  const name = code.resolveTerm(nestedInput)
  code.assertString(name)
  code.pushIntoParentObject(
    input,
    code.createStringConstant('scope', scope),
  )
  code.pushIntoParentObject(
    input,
    code.createStringConstant('name', name),
  )
}

export function process_codeCard_load_find_staticTerm(
  input: MeshInputType,
): void {
  const term = code.resolveTerm(input)
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
