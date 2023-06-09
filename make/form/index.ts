export * from './black.js'
export * from './blue.js'
export * from './color.js'
export * from './green.js'
export * from './mesh.js'
export * from './red.js'
export * from './site.js'
export * from './yellow.js'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Distributive<T> = T extends any ? T : never

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never
