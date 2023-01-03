import { Base, DockJS, Mesh, MeshType, code } from '~'
import type { DockJSProgramTokenType, DockJSTokenType } from '~'

export * from '../js/type.js'

export type DockNodeJSInputType = {
  state: DockNodeJSStateType
}

export type DockNodeJSStateType = {
  card: Array<DockJSTokenType>
}

// sort the things in topological order.
export function exportNodeJS(base: Base): void {
  const program = code.generateNodeJS(base)
}

export function generateNodeJS(base: Base): DockJSTokenType {
  const program: DockJSProgramTokenType = {
    body: [],
    like: DockJS.Program,
  }

  for (const [key, val] of base.card_mesh) {
    // console.log(val.seed)
    switch (val.seed.like) {
      case Mesh.CodeModule:
        code.generateNodeJSCardModule(program, val.seed)
        break
      case Mesh.DeckModule:
        code.generateNodeJSDeckModule(program, val.seed)
        break
    }
  }

  return program
}

export function generateNodeJSCardModule(
  program: DockJSProgramTokenType,
  module: MeshType<Mesh.CardModule>,
): void {
  module.exportList.forEach(exp => {})
  module.importTree.forEach(imp => {
    console.log(imp)
  })
}

export function generateNodeJSDeckModule(
  program: DockJSProgramTokenType,
  module: MeshType<Mesh.DeckModule>,
): void {}

export function renderNodeJS(): string {
  return ''
}
