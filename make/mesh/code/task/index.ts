import { LinkHint, Mesh, code } from '~'
import type { SiteProcessInputType } from '~'

export * from './back/index.js'
export * from './base/index.js'
export * from './free/index.js'

export function process_codeCard_task(
  input: SiteProcessInputType,
  property = 'functions',
): void {
  const container = code.createContainerScope(input)
  const scope = code.createStepScope(container)
  const scopeInput = code.withScope(input, scope)
  const red = code.pushRed(input, code.createRedGather(input, property))
  const blue = code.pushBlue(input, property, {
    functions: code.createBlueArray(input),
    inputs: code.createBlueArray(input),
    steps: code.createBlueArray(input),
    type: Mesh.Function,
    typeInputs: code.createBlueArray(input),
  })
  const colorInput = code.withColors(scopeInput, { blue, red })

  code.assumeNest(colorInput).forEach((nest, index) => {
    code.addTask(input.base, () => {
      code.process_codeCard_task_nestedChildren(
        code.withLink(colorInput, nest, index),
      )
    })
  })
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
