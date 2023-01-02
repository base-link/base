import { Fold, FoldStateInputType } from './index.js'

export function fold_openNesting_openHandle(
  input: FoldStateInputType,
): void {
  const { result, stack, base } = input.state
  input.state.previousNestLevel++

  result.push(base(Fold.OpenHandle))
  stack.push(Fold.OpenHandle)
}

export function fold_openNesting_openTerm(
  input: FoldStateInputType,
): void {
  const { result, stack, base } = input.state
  input.state.previousNestLevel++

  result.push(base(Fold.CloseTerm))
  stack.pop()

  result.push(base(Fold.CloseTermPath))
  stack.pop()

  result.push(base(Fold.OpenHandle))
  stack.push(Fold.OpenHandle)
}

export function fold_openNesting_openTermPath(
  input: FoldStateInputType,
): void {
  const { result, stack, base } = input.state
  input.state.previousNestLevel++

  result.push(base(Fold.CloseTermPath))
  stack.pop()

  result.push(base(Fold.OpenHandle))
  stack.push(Fold.OpenHandle)
}
