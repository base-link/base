import { NestInputType, api } from '~'

export function process_codeCard_task(
  input: NestInputType,
): void {
  input.nest.nest.forEach((nest, index) => {
    if (shared.isSimpleTerm(nest)) {
      const term = shared.getSimpleTerm(nest)
      switch (term) {
        case 'take':
          api.process_codeCard_formLink({
            ...input,
            index,
            nest,
          })
          break
        case 'task':
          api.process_codeCard_task({
            ...input,
            index,
            nest,
          })
          break
        case 'head':
          api.process_codeCard_head({
            ...input,
            index,
            nest,
          })
          break
        case 'free':
          api.process_codeCard_taskFree({
            ...input,
            index,
            nest,
          })
          break
        case 'call':
          api.process_codeCard_taskCall({
            ...input,
            index,
            nest,
          })
          break
        case 'save':
          api.process_codeCard_taskSave({
            ...input,
            index,
            nest,
          })
          break
        case 'back':
          api.process_codeCard_taskBack({
            ...input,
            index,
            nest,
          })
          break
        case 'hide':
          api.process_codeCard_hide({
            ...input,
            index,
            nest,
          })
          break
        case 'wait':
          api.process_codeCard_wait({
            ...input,
            index,
            nest,
          })
          break
        case 'risk':
          api.process_codeCard_risk({
            ...input,
            index,
            nest,
          })
          break
        case 'base':
          api.process_codeCard_taskBase({
            ...input,
            index,
            nest,
          })
          break
        case 'fuse':
          api.process_codeCard_fuse({
            ...input,
            index,
            nest,
          })
          break
        case 'hold':
          api.process_codeCard_hold({
            ...input,
            index,
            nest,
          })
          break
        case 'stem':
          api.process_codeCard_stem({
            ...input,
            index,
            nest,
          })
          break
        case 'note':
          api.process_codeCard_note({
            ...input,
            index,
            nest,
          })
          break
        default:
          api.throwError(
            api.generateUnknownTermError({
              ...input,
              index,
              nest,
            }),
          )
      }
    } else {
      api.throwError(
        api.generateUnhandledTermCaseError({
          ...input,
          index,
          nest,
        }),
      )
    }
  })
}
