import {
  Link,
  LinkHint,
  Mesh,
  MeshImportVariableRenameType,
  MeshImportVariableType,
  Nest,
  code,
} from '~'
import type { SiteProcessInputType } from '~'

export * from './bear/index.js'
export * from './save/index.js'

export function generateFullImportVariable(
  input: SiteProcessInputType,
): MeshImportVariableType {
  const parent = code.assumeElementAsGenericNest(input)
  const children = code.assumeChildrenFromParent(parent)

  const rename = children.find<MeshImportVariableRenameType>(
    (node): node is MeshImportVariableRenameType =>
      code.isMesh(node, Mesh.ImportVariableRename),
  )

  const name = code.findFullStringConstantByName(input, 'name')
  const scopeName = code.findFullStringConstantByName(input, 'scope')

  code.assertString(name)
  code.assertString(scopeName)

  return {
    bound: true,
    like: Mesh.ImportVariable,
    name,
    rename: rename ? rename.name : name,
    scopeName,
  }
}

export function process_codeCard_load_find(
  input: SiteProcessInputType,
): void {
  const nest = code.assumeLink(input, Link.Tree)

  const find = code.createNest(Nest.ImportVariable, input.scope)
  code.pushIntoParentObject(input, find)

  const childInput = code.withElement(input, find)

  code.processNestedChildren(
    childInput,
    nest,
    code.process_codeCard_load_find_nestedChildren,
  )

  code.replaceIfBound(childInput, find, () =>
    code.generateFullImportVariable(childInput),
  )
}

export function process_codeCard_load_find_nestedChildren(
  input: SiteProcessInputType,
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
  input: SiteProcessInputType,
): void {
  const nest = code.assumeNest(input)
  code.assertLink(nest, Link.Tree)

  const term = code.resolveTerm(input)
  code.assertString(term)
  const scope = term
  const nestedNest = nest.nest[0]
  code.assertGenericLink(nestedNest)
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
  input: SiteProcessInputType,
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
