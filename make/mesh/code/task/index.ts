import {
  Link,
  LinkHint,
  Mesh,
  MeshFullType,
  MeshFunctionFlow_FullType,
  SiteStepScopeType,
  code,
} from '~'
import type { MeshInputType } from '~'

export * from './back/index.js'
export * from './base/index.js'
export * from './free/index.js'

export function createMeshPartial<T extends Mesh>(
  like: T,
  scope?: SiteStepScopeType,
) {
  return {
    children: [],
    like: like,
    partial: true,
    scope,
  }
}

export function generateFullFunction(
  input: MeshInputType,
  data: Record<string, unknown>,
): MeshFullType<Mesh.Function> {
  code.assertMeshPartialType(data, Mesh.Function)

  let name
  let hidden = false
  let parameterMesh: Record<
    string,
    MeshFullType<Mesh.Input>
  > = {}
  let flow: Array<MeshFunctionFlow_FullType> = []
  let functionMesh: Record<
    string,
    MeshFullType<Mesh.Function>
  > = {}

  data.children.forEach(node => {
    if (!node.partial) {
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
    partial: false,
    scope: input.scope,
  }
}

export function potentiallyReplaceWithFullNode(
  input: MeshInputType,
  fn: (
    input: MeshInputType,
    data: Record<string, unknown>,
  ) => void,
): void {
  const data = code.assumeBranchAsGenericMeshType(input)
  const parentData = code.assumeBranchAsGenericMeshType(
    input,
    1,
  )

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
  }
}

export function process_codeCard_task(
  input: MeshInputType,
): void {
  const container = code.createContainerScope(
    {},
    input.scope.container,
  )
  const scope = code.createStepScope(container)
  const scopeInput = code.withScope(input, scope)
  const task = code.createMeshPartial(Mesh.Function, scope)
  code.pushIntoParentObject(input, task)
  const childInput = code.withBranch(scopeInput, task)

  code
    .assumeLinkType(childInput, Link.Tree)
    .nest.forEach((nest, index) => {
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
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  if (type === LinkHint.StaticTerm) {
    const term = code.assumeStaticTermFromNest(input)
    const index = code.assumeNestIndex(input)
    if (index === 0) {
      const task = code.assumeBranchAsMeshPartialType(
        input,
        Mesh.Function,
      )
      task.children.push(code.createTerm(term))
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
    code.throwError(
      code.generateUnhandledNestCaseError(input, type),
    )
  }
}

export function pushIntoParentObject(
  input: MeshInputType,
  pushed: Record<string, unknown>,
): void {
  const data = input.branch?.element
  if (
    code.isRecord(data) &&
    'children' in data &&
    code.isArray(data.children)
  ) {
    data.children.push(pushed)
  }
}
