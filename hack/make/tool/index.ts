import { Riff, RiffBase } from '../form.js'

export * from './dependency.js'
export * from './environment.js'
export * from './file.js'
export * from './halt.js'
export * from './module.js'
export * from './nest.js'
export * from './observer.js'
export * from './task.js'

export function linkRiff<B extends Riff, N extends keyof B['link']>(
  base: B,
  name: N,
  link: Riff['link'],
) {
  const riff = {
    base,
    link,
    name,
  }

  base.link[name]
}

export function saveRiff(base: Riff, name: string, link: Riff['link']) {
  return {
    base,
    link,
    name,
  }
}
