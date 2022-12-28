import { api } from '~'
import type { APIInputType, AST, Nest, PartialType } from '~'

export function process_codeCard_hook(
  input: APIInputType,
): void {
  const hook: ASTPartialType<AST.Callback> = {
    flow: [],
    like: AST.Callback,
    parameter: {},
    partial: true,
  }

  const childInput = api.extendWithObjectScope(input, hook)

  api.assumeNest(childInput).nest.forEach((nest, index) => {
    api.process_codeCard_hook_nestedChildren(
      api.extendWithNestScope(childInput, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_hook_nestedChildren(
  input: APIInputType,
): void {
  const type = api.determineNestType(input)
  switch (type) {
    case Nest.StaticTerm: {
      const index = api.assumeNestIndex(input)
      const term = api.assumeStaticTermFromNest(input)
      if (index === 0) {
        const callback = api.assumeInputObjectAsASTPartialType(
          input,
          AST.Callback,
        )
        callback.name = term
      } else {
        switch (term) {
          case 'task':
            api.process_codeCard_task(input)
            break
          case 'head':
            api.process_codeCard_head(input)
            break
          case 'call':
            api.process_codeCard_call(input)
            break
          case 'slot':
            api.process_codeCard_slot(input)
            break
          case 'walk':
            api.process_codeCard_walk(input)
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
            api.throwError(
              api.generateUnhandledTermCaseError(input),
            )
        }
      }
      break
    }
    default:
      api.throwError(
        api.generateUnhandledNestCaseError(input, type),
      )
  }
}
