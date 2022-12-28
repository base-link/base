import {
  AST,
  ASTFullType,
  ASTFunctionFlow_FullType,
  ASTPartialType,
  Nest,
  api,
} from '~'
import type { APIInputType } from '~'

export * from './back/index.js'
export * from './base/index.js'
export * from './free/index.js'

export function createASTPartial<T extends AST>(like: T) {
  return {
    children: [],
    like: like,
    partial: true,
  }
}

export function generateFullFunction(
  input: APIInputType,
  data: ASTPartialType<AST.Function>,
): ASTFullType<AST.Function> {
  let name
  let hidden = false
  let parameterMesh: Record<string, ASTFullType<AST.Input>> = {}
  let flow: Array<ASTFunctionFlow_FullType> = []
  let functionMesh: Record<
    string,
    ASTFullType<AST.Function>
  > = {}

  data.children.forEach(node => {
    if (!node.partial) {
      switch (node.like) {
        case AST.Term:
          name = node.name
          break
        case AST.Constant:
          switch (node.name) {
            case 'hidden':
              hidden = api.getBooleanConstant(node)
              break
          }
          name = node.name
          break
      }
    }
  })

  api.assertString(name)

  return {
    complete: false,
    flow,
    function: functionMesh,
    hidden,
    like: AST.Function,
    name,
    parameter: parameterMesh,
    partial: false,
  }
}

export function potentiallyReplaceWithFullNode(
  input: APIInputType,
  fn: (
    input: APIInputType,
    data: Record<string, unknown>,
  ) => void,
): void {
  const data = api.assumeInputObjectAsGenericASTType(input)
  const parentData = api.assumeInputObjectAsGenericASTType(
    input,
    1,
  )

  if (
    'children' in parentData &&
    api.isArray(parentData.children)
  ) {
    parentData.children[parentData.children.indexOf(data)] = fn(
      input,
      data,
    )
  }
}

export function process_codeCard_task(
  input: APIInputType,
): void {
  const task = api.createASTPartial(AST.Function)

  api.pushIntoParentObject(input, task)

  const childInput = api.extendWithObjectScope(input, task)

  api.assumeNest(childInput).nest.forEach((nest, index) => {
    api.process_codeCard_task_nestedChildren(
      api.extendWithNestScope(childInput, {
        index,
        nest,
      }),
    )
  })

  api.potentiallyReplaceWithFullNode(
    childInput,
    api.generateFullFunction,
  )
}

export function process_codeCard_task_nestedChildren(
  input: APIInputType,
): void {
  const type = api.determineNestType(input)
  if (type === Nest.StaticTerm) {
    const term = api.assumeStaticTermFromNest(input)
    const index = api.assumeNestIndex(input)
    if (index === 0) {
      const task = api.assumeInputObjectAsASTPartialType(
        input,
        AST.Function,
      )
      task.children.push(api.createTerm(term))
      return
    }
    switch (term) {
      case 'take':
        api.process_codeCard_link(input)
        break
      case 'task':
        api.process_codeCard_task(input)
        break
      case 'head':
        api.process_codeCard_head(input)
        break
      case 'free':
        api.process_codeCard_task_free(input)
        break
      case 'call':
        api.process_codeCard_call(input)
        break
      case 'save':
        api.process_codeCard_save(input)
        break
      case 'back':
        api.process_codeCard_task_back(input)
        break
      case 'hide':
        api.process_codeCard_hide(input)
        break
      case 'wait':
        api.process_codeCard_wait(input)
        break
      case 'risk':
        api.process_codeCard_risk(input)
        break
      case 'base':
        api.process_codeCard_task_base(input)
        break
      case 'fuse':
        api.process_codeCard_fuse(input)
        break
      case 'hold':
        api.process_codeCard_hold(input)
        break
      case 'stem':
        api.process_codeCard_stem(input)
        break
      case 'note':
        api.process_codeCard_note(input)
        break
      default:
        api.throwError(api.generateUnknownTermError(input))
    }
  } else {
    api.throwError(api.generateUnhandledTermCaseError(input))
  }
}

export function pushIntoParentObject(
  input: APIInputType,
  pushed: Record<string, unknown>,
): void {
  const data = input.objectScope.data
  if ('children' in data && api.isArray(data.children)) {
    data.children.push(pushed)
  }
}
