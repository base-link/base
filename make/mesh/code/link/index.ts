import {
  Link,
  LinkHint,
  Mesh,
  MeshClassReferenceType,
  MeshInputType,
  Nest,
  code,
} from '~'
import type { SiteProcessInputType } from '~'

export * from './take/index.js'

let ID = 1

export type SiteBindInputType = SiteProcessInputType & {
  focus: {
    name: string
  }
  handle: (value: SiteBindInputType) => void
  id: string
  value?: unknown
}

export function addPropertyObserver(input: SiteBindInputType): void {
  const name = input.focus.name
  const handle = input.handle
  const id = input.id
  if (!input.base.observersByNameThenId[name]) {
    input.base.observersByNameThenId[name] = {}
  }
  const observersById = input.base.observersByNameThenId[name]
  code.assertRecord(observersById)

  observersById[id] = handle

  if (!input.base.observersByIdThenName[id]) {
    input.base.observersByIdThenName[id] = {}
  }
  const observersByName = input.base.observersByIdThenName[id]
  code.assertRecord(observersByName)
  observersByName[name] = handle
}

export function bindReference(input: SiteBindInputType): void {
  const focus = input.focus
  const has = code.environmentHasProperty(input.environment, focus.name)

  if (has) {
    code.setReference(input)
  } else {
    code.addPropertyObserver({
      ...input,
      handle: code.setReference,
    })
  }
}

export function checkForInputompletion(input: SiteBindInputType): void {
  input.focus.bond = input.value
  if (code.childrenAreCompleteMesh(input.element.node)) {
    console.log('notify parent')
  }
}

export function generateFullInput(
  input: SiteProcessInputType,
): MeshInputType {
  const name = code.findFullStringConstantByName(input, 'name')
  code.assertString(name)
  const children = code.assumeChildren(input)
  const sourceLike = children.find(
    (node): node is MeshClassReferenceType =>
      code.isMesh(node, Mesh.ClassReference),
  )

  const mesh = {
    complete: false,
    like: Mesh.Input,
    name,
    sourceLike,
  }

  if (sourceLike) {
    code.bindReference({
      ...input,
      focus: sourceLike,
      handle: code.checkForInputompletion,
      id: String(ID++),
    })
  }

  return mesh
}

export function pingParentOfCompletion(
  input: SiteProcessInputType,
): void {
  const parent = code.assumeElementAsGenericNest(input)
}

export function process_codeCard_link(
  input: SiteProcessInputType,
): void {
  const link = code.createNest(Nest.Input, input.scope)
  code.pushIntoParentObject(input, link)

  const linkInput = code.withElement(input, link)

  code.assumeLink(linkInput, Link.Tree).nest.forEach((nest, index) => {
    process_codeCard_link_nestedChildren(
      code.withEnvironment(linkInput, {
        index,
        nest,
      }),
    )
  })

  code.resolve_codeCard_link(linkInput)
}

export function process_codeCard_link_base(
  input: SiteProcessInputType,
): void {}

export function process_codeCard_link_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.determineNestType(input)
  switch (type) {
    case LinkHint.StaticTerm:
      const term = code.assumeTerm(input)
      const index = code.assumeNestIndex(input)
      if (index === 0) {
        code.pushIntoParentObject(
          input,
          code.createStringConstant('name', term),
        )
        return
      }

      switch (term) {
        case 'like':
          code.process_codeCard_like(input)
          break
        case 'list':
          code.process_codeCard_like_list(input)
          break
        case 'mesh':
          code.process_codeCard_like_mesh(input)
          break
        case 'time':
          code.process_codeCard_time(input)
          break
        case 'hide':
          code.process_codeCard_hide(input)
          break
        case 'link':
          code.process_codeCard_link(input)
          break
        case 'void':
          code.process_codeCard_void(input)
          break
        case 'take':
          code.process_codeCard_link_take(input)
          break
        case 'base':
          code.process_codeCard_link_base(input)
          break
        case 'note':
          code.process_codeCard_note(input)
          break
        default:
          code.throwError(code.generateUnhandledTermCaseError(input))
      }
      break
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

export function resolve_codeCard_link(
  input: SiteProcessInputType,
): void {
  if (code.childrenAreMesh(input.element.node)) {
    code.potentiallyReplaceWithFullNode(input, () =>
      code.generateFullInput(input),
    )
  }
}

export function setReference(input: SiteBindInputType): void {
  const focus = input.focus
  const value = code.getEnvironmentProperty(
    input.environment,
    focus.name,
  )

  input.handle({
    ...input,
    value,
  })
}
