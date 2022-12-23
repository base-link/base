import { Nest, NestInputType, api } from '~'

export * from './back'
export * from './base'
export * from './free'

export function process_codeCard_task(
  input: NestInputType,
): void {
  input.nest.nest.forEach((nest, index) => {
    api.process_codeCard_task_nestedChildren({
      ...input,
      index,
      nest,
    })
  })
}

export function process_codeCard_task_nestedChildren(
  input: NestInputType,
): void {
  const type = api.determineNestType(input)
  if (type === Nest.StaticTerm) {
    const term = api.resolveStaticTermFromNest(input)
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
