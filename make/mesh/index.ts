import { BaseLinkError, code } from '~'

export * from './card/index.js'
export * from './code.js'
export * from './dependency.js'
export * from './mark.js'
export * from './mesh.js'
export * from './nest.js'
export * from './slot.js'
export * from './term.js'
export * from './text.js'

export function watchUnhandledErrors(): void {
  process.on('unhandledRejection', (reason: unknown) => {
    if (reason instanceof BaseLinkError) {
      console.log(reason.stack)
    } else {
      console.log(reason)
      try {
        code.throwError({
          code: `0025`,
          note:
            code.isRecord(reason) && 'message' in reason
              ? String(reason.message)
              : String(reason),
        })
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.log(e.stack)
        } else {
          console.log(e)
        }
      }
    }
  })

  process.on('uncaughtException', (error: Error) => {
    console.log(error.stack)
  })
}

watchUnhandledErrors()
