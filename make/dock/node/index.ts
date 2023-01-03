import { Base, DockJS, code } from '~'
import type { DockJSProgramTokenType, DockJSTokenType } from '~'

export * from '../js/type.js'

export type DockNodeJSInputType = {
  state: DockNodeJSStateType
}

export type DockNodeJSStateType = {
  card: Array<DockJSTokenType>
}

// sort the things in topological order.
export function exportNodeJS(base: Base): void {}

export function generateNodeJS(base: Base): DockJSTokenType {
  const program: DockJSProgramTokenType = {
    body: [],
    like: DockJS.Program,
  }

  for (const [key, val] of base.card_mesh) {
    code.generateNodeJSModule()
  }

  return program
}

export function generateNodeJSModule(
  input: DockNodeJSInputType,
): void {}

export function renderNodeJS(): string {
  return ''
}
