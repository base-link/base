import { Fold, FoldStateInputType } from './index.js'

export function fold_termFragment_openLine(
  input: FoldStateInputType,
): void {
  const { result, stack, base } = input.state

  result.push(base(Fold.OpenHandle))
  stack.push(Fold.OpenHandle)

  result.push(base(Fold.OpenTermPath))
  stack.push(Fold.OpenTermPath)

  result.push(base(Fold.OpenTerm))
  stack.push(Fold.OpenTerm)

  input.state.applyFragments(input.token)
}

// export function fold_termFragment_openPlugin(
//   input: FoldStateInputType,
// ): void {
//   const { result, stack, base } = input.state

//   result.push(base(Fold.OpenHandle))
//   stack.push(Fold.OpenHandle)

//   result.push(base(Fold.OpenTermPath))
//   stack.push(Fold.OpenTermPath)

//   result.push(base(Fold.OpenTerm))
//   stack.push(Fold.OpenTerm)

//   input.state.applyFragments(input.token)
// }
