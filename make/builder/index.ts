import { api } from '~'

export * from './card/index.js'
export * from './code.js'
export * from './dependency.js'
export * from './error.js'
export * from './file.js'
export * from './mark.js'
export * from './mesh.js'
export * from './nest.js'
export * from './object.js'
export * from './scope.js'
export * from './slot.js'
export * from './term.js'
export * from './text.js'
export * from './utility.js'

export function watchUnhandledErrors(): void {
  process.on('unhandledRejection', (reason: unknown) => {
    let message =
      (reason instanceof Error ? reason.stack : reason) ??
      'error'
    if (api.isString(message)) {
      console.log(message)
    }
  })

  process.on('uncaughtException', (error: Error) => {
    console.log(error)
  })
}

watchUnhandledErrors()
