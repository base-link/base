import {
  Link,
  MESH_BOOLEAN_LINK_TYPE,
  MESH_TERM_LINK_TYPE,
  Mesh,
  MeshClassType,
  code,
} from '~'
import type { SiteProcessInputType } from '~'

export * from './base/index.js'
export * from './case/index.js'
export * from './wear/index.js'

export function createMeshClass(
  input: SiteProcessInputType,
): MeshClassType {
  const name = code.assumeZippedMesh(input, 'name', MESH_TERM_LINK_TYPE)
  code.assertMeshTermPointer(name)

  const hidden =
    code.assumeZippedMeshOrUndefined(
      input,
      'hidden',
      MESH_BOOLEAN_LINK_TYPE,
    ) ?? code.createMeshPointer(code.createMeshBoolean(false))
  code.assertMeshBooleanPointer(hidden)

  const methods = code.assumeZippedMeshArray(
    input,
    'function',
    Mesh.Function,
  )

  const callbacks = code.assumeZippedMeshArray(
    input,
    'callback',
    Mesh.Callback,
  )

  const interfaces = code.assumeZippedMeshArray(
    input,
    'interface',
    Mesh.ClassInterfaceImplementation,
  )

  const properties = code.assumeZippedMeshArray(
    input,
    'input',
    Mesh.Input,
  )
  const hint = code.getMeshHintFromChildren(input)

  return {
    callbacks,
    hidden,
    hint,
    interfaces,
    methods,
    name,
    parents: [],
    properties,
    type: Mesh.Class,
  }
}

export function process_codeCard_form(
  input: SiteProcessInputType,
): void {
  const container = code.createContainerScope({}, input.scope.container)
  const scope = code.createStepScope(container)
  const form = code.createMeshGather('class', scope)
  code.gatherIntoMeshParent(input, form)

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
    code.createMeshClass(branchInput),
  )
}

export function process_codeCard_form_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  if (type === 'static-term') {
    const index = code.assumeLinkNestIndex(input)
    if (index === 0) {
      code.process_first_staticTerm(input, 'name')
    } else {
      const term = code.assumeTerm(input)
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
