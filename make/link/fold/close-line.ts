import { Fold, FoldStateInputType } from './index.js'

export function fold_closeLine_openLine(
  input: FoldStateInputType,
): void {
  input.state.stack.pop()
}

export function fold_closeLine_openModule(
  input: FoldStateInputType,
): void {}

export function fold_closeLine_openTerm(
  input: FoldStateInputType,
): void {
  console.log(input.state.nest)
  input.state.stack.push(Fold.OpenLine)
}
