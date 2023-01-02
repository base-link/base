import { Fold, FoldStateInputType } from './index.js'

// export function fold_openIndentation_openDepth(
//   input: FoldStateInputType,
// ): void {
//   input.state.nextNestLevel++
// }

// export function fold_openIndentation_openHandle(
//   input: FoldStateInputType,
// ): void {
//   const { result, stack, base } = input.state
//   input.state.nextNestLevel++
//   result.push(base(Fold.OpenHandle))
//   stack.push(Fold.OpenHandle)
// }

// export function fold_openIndentation_openIndentation(
//   input: FoldStateInputType,
// ): void {
//   input.state.nextNestLevel++
// }

export function fold_openIndentation_openModule(
  input: FoldStateInputType,
): void {
  input.state.nextNestLevel++
}
