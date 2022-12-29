import { Mesh, MeshHint, code } from '~'
import type { MeshInputType, MeshPartialType } from '~'

export function process_codeCard_hook(
  input: MeshInputType,
): void {
  const hook: MeshPartialType<Mesh.Callback> = {
    children: [],
    like: Mesh.Callback,
    partial: true,
  }

  const childInput = code.extendWithObjectScope(input, hook)

  code.assumeNest(childInput).nest.forEach((nest, index) => {
    code.process_codeCard_hook_nestedChildren(
      code.extendWithNestScope(childInput, {
        index,
        nest,
      }),
    )
  })
}

export function process_codeCard_hook_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  switch (type) {
    case MeshHint.StaticTerm: {
      const index = code.assumeNestIndex(input)
      const term = code.assumeStaticTermFromNest(input)
      if (index === 0) {
        const callback =
          code.assumeInputObjectAsMeshPartialType(
            input,
            Mesh.Callback,
          )
        callback.children.push({
          complete: true,
          dive: false,
          like: Mesh.Term,
          name: term,
          nest: [],
          partial: false,
        })
      } else {
        switch (term) {
          case 'task':
            code.process_codeCard_task(input)
            break
          case 'head':
            code.process_codeCard_head(input)
            break
          case 'call':
            code.process_codeCard_call(input)
            break
          case 'slot':
            code.process_codeCard_slot(input)
            break
          case 'walk':
            code.process_codeCard_walk(input)
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
            code.throwError(
              code.generateUnhandledTermCaseError(input),
            )
        }
      }
      break
    }
    default:
      code.throwError(
        code.generateUnhandledNestCaseError(input, type),
      )
  }
}
