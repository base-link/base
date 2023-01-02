import { Fold, FoldStateInputType } from './index.js'

export function fold_openLine_openModule(
  input: FoldStateInputType,
): void {
  input.state.nest = []
  input.state.lines.push(input.state.nest)
  input.state.stack.push(Fold.OpenLine)
}
