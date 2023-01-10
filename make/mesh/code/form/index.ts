import { Link, Mesh, MeshFullType, Nest, code } from '~'
import type { SiteProcessInputType } from '~'

export * from './base/index.js'
export * from './case/index.js'
export * from './wear/index.js'

export function assumeChildren(
  input: SiteProcessInputType,
): Array<unknown> {
  const parent = code.assumeElementAsGenericNest(input)
  const children = code.assumeChildrenFromParent(parent)
  return children
}

export function generateFullClass(
  input: SiteProcessInputType,
): MeshFullType<Mesh.Class> {
  const name = code.findFullStringConstantByName(input, 'name')
  code.assertString(name)

  const children = code.assumeChildren(input)

  const methodList = children.filter(
    (node): node is MeshFullType<Mesh.Function> =>
      code.isMesh(node, Mesh.Function),
  )

  const propertyList = children.filter(
    (node): node is MeshFullType<Mesh.Input> =>
      code.isMesh(node, Mesh.Input),
  )

  const methods = code.keyBy(methodList, 'name')
  const properties = code.keyBy(propertyList, 'name')

  return {
    bound: false,
    callbacks: {},
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

export function process_codeCard_form(
  input: SiteProcessInputType,
): void {
  const container = code.createContainerScope({}, input.scope.container)
  const scope = code.createStepScope(container)
  const form = code.createNest(Nest.Class, scope)
  code.pushIntoParentObject(input, form)

  const scopeInput = code.withScope(input, scope)
  const branchInput = code.withElement(scopeInput, form)

  code
    .assumeLink(branchInput, Link.Tree)
    .nest.forEach((nest, index) => {
      code.process_codeCard_form_nestedChildren(
        code.withEnvironment(branchInput, {
          index,
          nest,
        }),
      )
    })

  code.replaceIfBound(branchInput, form, () =>
    code.generateFullClass(branchInput),
  )
}

export function process_codeCard_form_nestedChildren(
  input: SiteProcessInputType,
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
