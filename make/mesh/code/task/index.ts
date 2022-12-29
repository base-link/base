import {
  LinkHint,
  Mesh,
  MeshFullType,
  MeshFunctionFlow_FullType,
  MeshPartialType,
  code,
} from '~'
import type { MeshInputType } from '~'

export * from './back/index.js'
export * from './base/index.js'
export * from './free/index.js'

export function createMeshPartial<T extends Mesh>(like: T) {
  return {
    children: [],
    like: like,
    partial: true,
  }
}

export function generateFullFunction(
  input: MeshInputType,
  data: MeshPartialType<Mesh.Function>,
): MeshFullType<Mesh.Function> {
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
          }
          name = node.name
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
  }
}

export function potentiallyReplaceWithFullNode(
  input: MeshInputType,
  fn: (
    input: MeshInputType,
    data: Record<string, unknown>,
  ) => void,
): void {
  const data = code.assumeInputObjectAsGenericMeshType(input)
  const parentData = code.assumeInputObjectAsGenericMeshType(
    input,
    1,
  )

  if (
    'children' in parentData &&
    code.isArray(parentData.children)
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
  const task = code.createMeshPartial(Mesh.Function)

  code.pushIntoParentObject(input, task)

  const childInput = code.extendWithObjectScope(input, task)

  code.assumeNest(childInput).nest.forEach((nest, index) => {
    code.process_codeCard_task_nestedChildren(
      code.extendWithNestScope(childInput, {
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
      const task = code.assumeInputObjectAsMeshPartialType(
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
  } else {
    code.throwError(code.generateUnhandledTermCaseError(input))
  }
}

export function pushIntoParentObject(
  input: MeshInputType,
  pushed: Record<string, unknown>,
): void {
  const data = input.objectScope.data
  if ('children' in data && code.isArray(data.children)) {
    data.children.push(pushed)
  }
}
