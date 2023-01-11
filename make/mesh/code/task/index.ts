import { Link, LinkHint, Mesh, code } from '~'
import type { MeshFunctionType, SiteProcessInputType } from '~'

export * from './back/index.js'
export * from './base/index.js'
export * from './free/index.js'

export function createMeshFunction(
  input: SiteProcessInputType,
): MeshFunctionType {
  const name = code.findPlaceholderByName(input, 'name')
  code.assertMeshTerm(name)

  const base = code.findPlaceholderByName(input, 'base')
  code.assertMeshOrUndefined(base, Mesh.Function)

  const definedOutputType = code.findPlaceholderByName(
    input,
    'output-type',
  )
  code.assertMeshOrUndefined(definedOutputType, Mesh.ClassReference)

  const hidden =
    code.findPlaceholderByName(input, 'hidden') ??
    code.createMeshBoolean(false)
  code.assertMeshBoolean(hidden)

  const wait =
    code.findPlaceholderByName(input, 'wait') ??
    code.createMeshBoolean(false)
  code.assertMeshBoolean(wait)

  const risk =
    code.findPlaceholderByName(input, 'risk') ??
    code.createMeshBoolean(false)
  code.assertMeshBoolean(risk)

  const inputs = code.filterPlaceholdersByName(input, 'input')
  code.assertMeshArray(inputs, Mesh.Input)

  const typeInputs = code.filterPlaceholdersByName(input, 'type-input')
  code.assertMeshArray(typeInputs, Mesh.ClassInput)

  const steps = code.filterPlaceholdersByName(input, 'step')
  code.assertMeshStepArray(steps)

  const functions = code.filterPlaceholdersByName(input, 'function')
  code.assertMeshArray(functions, Mesh.Function)

  const hint = code.getMeshHintFromChildren(input)

  return {
    base,
    definedOutputType,
    functions,
    hidden,
    hint,
    inputs,
    name,
    risk,
    scope: input.scope,
    steps,
    type: Mesh.Function,
    typeInputs,
    wait,
  }
}

export function process_codeCard_task(
  input: SiteProcessInputType,
): void {
  const container = code.createContainerScope({}, input.scope.container)
  const scope = code.createStepScope(container)
  const scopeInput = code.withScope(input, scope)
  const task = code.createMeshGather('function', scope)
  code.gatherIntoMeshParent(input, task)
  const childInput = code.withElement(scopeInput, task)

  code.assumeLink(childInput, Link.Tree).nest.forEach((nest, index) => {
    code.process_codeCard_task_nestedChildren(
      code.withLink(childInput, nest, index),
    )
  })

  code.potentiallyReplaceWithSemiStaticMesh(childInput, () =>
    code.createMeshFunction(childInput),
  )
}

export function process_codeCard_task_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.DynamicTerm: {
      const index = code.assumeLinkIndex(input)
      if (index === 0) {
        code.process_dynamicTerm(input)
      } else {
        code.throwError(
          code.generateUnhandledNestCaseError(input, type),
        )
      }
      break
    }
    case LinkHint.StaticTerm: {
      const index = code.assumeLinkIndex(input)
      if (index === 0) {
        code.process_first_staticTerm(input, 'name')
        return
      }
      const term = code.assumeTermString(input)
      switch (term) {
        case 'take':
          code.process_codeCard_link(input)
          break
        case 'task':
          code.process_codeCard_task(input)
          break
        case 'head':
          code.process_codeCard_head(input)
          break
        case 'free':
          code.process_codeCard_task_free(input)
          break
        case 'call':
          code.process_codeCard_call(input)
          break
        case 'save':
          code.process_codeCard_save(input)
          break
        case 'back':
          code.process_codeCard_task_back(input)
          break
        case 'hide':
          code.process_codeCard_hide(input)
          break
        case 'wait':
          code.process_codeCard_wait(input)
          break
        case 'risk':
          code.process_codeCard_risk(input)
          break
        case 'base':
          code.process_codeCard_task_base(input)
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
        default:
          code.throwError(code.generateUnknownTermError(input))
      }
      break
    }
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}
