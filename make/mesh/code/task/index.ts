import {
  Link,
  LinkHint,
  Mesh,
  MeshFunctionFlowType,
  MeshFunctionType,
  MeshInputType,
  MeshType,
  Nest,
  NestType,
  SiteStepScopeType,
  code,
} from '~'
import type { SiteProcessInputType } from '~'

export * from './back/index.js'
export * from './base/index.js'
export * from './free/index.js'

export function createNest<T extends Nest>(
  like: T,
  scope: SiteStepScopeType,
): NestType<T> {
  return {
    children: [],
    like,
    scope,
  }
}

export function generateFullFunction(
  input: SiteProcessInputType,
  data: Record<string, unknown>,
): MeshFunctionType {
  code.assertNest(data, Nest.Function)

  let name
  let hidden = false
  let parameterMesh: Record<string, MeshInputType> = {}
  let flow: Array<MeshFunctionFlowType> = []
  let functionMesh: Record<string, MeshFunctionType> = {}

  data.children.forEach(node => {
    if (code.isGenericMesh(node)) {
      switch (node.like) {
        case Mesh.Term:
          name = node.name
          break
        case Mesh.Constant:
          switch (node.name) {
            case 'hidden':
              hidden = code.getBooleanConstant(node)
              break
            default:
              break
          }
          name = node.name
          break
        default:
          break
      }
    }
  })

  code.assertString(name)

  return {
    complete: false,
    flow,
    function: functionMesh,
    hidden,
    like: Mesh.Function,
    name,
    parameter: parameterMesh,
    scope: input.scope,
  }
}

export function potentiallyReplaceWithFullNode(
  input: SiteProcessInputType,
  fn: (
    input: SiteProcessInputType,
    data: Record<string, unknown>,
  ) => void,
): void {
  const data = code.assumeElementAsGenericNest(input)
  const parentData = code.assumeElementAsGenericNest(input, 1)

  if (
    'children' in parentData &&
    code.isArray(parentData.children) &&
    'children' in data &&
    code.isArray(data.children) &&
    data.children.length
  ) {
    parentData.children[parentData.children.indexOf(data)] = fn(
      input,
      data,
    )
  } else {
    // code.throwError(
    //   code.generateInvalidCompilerStateError(
    //     undefined,
    //     input.module.path,
    //   ),
    // )
  }
}

export function process_codeCard_task(
  input: SiteProcessInputType,
): void {
  const container = code.createContainerScope({}, input.scope.container)
  const scope = code.createStepScope(container)
  const scopeInput = code.withScope(input, scope)
  const task = code.createNest(Nest.Function, scope)
  code.pushIntoParentObject(input, task)
  const childInput = code.withElement(scopeInput, task)

  code.assumeLink(childInput, Link.Tree).nest.forEach((nest, index) => {
    code.process_codeCard_task_nestedChildren(
      code.withEnvironment(childInput, {
        index,
        nest,
      }),
    )
  })

  code.potentiallyReplaceWithFullNode(
    childInput,
    code.generateFullFunction,
  )
}

export function process_codeCard_task_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.determineNestType(input)
  if (type === LinkHint.StaticTerm) {
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
  } else if (type === LinkHint.DynamicTerm) {
    // TODO
  } else {
    code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

export function pushIntoParentObject(
  input: SiteProcessInputType,
  pushed: MeshType<Mesh> | NestType<Nest>,
): void {
  const data = input.element.node
  if (
    code.isRecord(data) &&
    'children' in data &&
    code.isArray(data.children)
  ) {
    data.children.push(pushed)
  }
}
