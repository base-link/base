import { Link, Mesh, MeshFullType, code } from '~'
import type { MeshInputType } from '~'

export * from './base/index.js'
export * from './case/index.js'
export * from './wear/index.js'

export function assumeChildren(input: MeshInputType): Array<unknown> {
  const parent = code.assumeBranchAsGenericMeshType(input)
  const children = code.assumeChildrenFromParent(parent)
  return children
}

export function generateFullClass(
  input: MeshInputType,
): MeshFullType<Mesh.Class> {
  const name = code.findFullStringConstantByName(input, 'name')
  code.assertString(name)

  const children = code.assumeChildren(input)

  const methodList = children.filter(
    (node): node is MeshFullType<Mesh.Function> =>
      code.isMeshFullType(node, Mesh.Function),
  )

  const propertyList = children.filter(
    (node): node is MeshFullType<Mesh.Input> =>
      code.isMeshFullType(node, Mesh.Input),
  )

  const methods = code.keyBy(methodList, 'name')
  const properties = code.keyBy(propertyList, 'name')

  return {
    callbacks: {},
    complete: false,
    hidden: false,
    interfaces: {},
    like: Mesh.Class,
    methods,
    name,
    parents: [],
    partial: false,
    properties,
  }
}

export function process_codeCard_form(input: MeshInputType): void {
  const container = code.createContainerScope({}, input.scope.container)
  const scope = code.createStepScope(container)
  const form = code.createMeshPartial(Mesh.Class, scope)
  code.pushIntoParentObject(input, form)

  const scopeInput = code.withScope(input, scope)
  const branchInput = code.withBranch(scopeInput, form)

  code
    .assumeLinkType(branchInput, Link.Tree)
    .nest.forEach((nest, index) => {
      code.process_codeCard_form_nestedChildren(
        code.withEnvironment(branchInput, {
          index,
          nest,
        }),
      )
    })

  code.replaceIfComplete(branchInput, form, () =>
    code.generateFullClass(branchInput),
  )
}

export function process_codeCard_form_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  if (type === 'static-term') {
    const term = code.assumeTerm(input)
    const index = code.assumeNestIndex(input)
    if (index === 0) {
      code.pushIntoParentObject(
        input,
        code.createStringConstant('name', term),
      )
    } else {
      switch (term) {
        case 'link':
          code.process_codeCard_link(input)
          break
        case 'task':
          code.process_codeCard_task(input)
          break
        case 'head':
          code.process_codeCard_head(input)
          break
        case 'wear':
          code.process_codeCard_form_wear(input)
          break
        case 'base':
          code.process_codeCard_form_base(input)
          break
        case 'case':
          code.process_codeCard_formCase(input)
          break
        case 'fuse':
          code.process_codeCard_fuse(input)
          break
        case 'hold':
          code.process_codeCard_hold(input)
          break
        case 'stem':
          code.process_codeCard_stem(input)
          break
        case 'note':
          code.process_codeCard_note(input)
          break
        case 'like':
          code.process_codeCard_like(input)
          break
        default:
          code.throwError(code.generateUnknownTermError(input))
      }
    }
  } else {
    code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}
