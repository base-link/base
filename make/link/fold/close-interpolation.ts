import { Fold, FoldStateInputType } from './index.js'

export function fold_closeInterpolation_openDepth(
  input: FoldStateInputType,
): void {
  const { result, stack, base } = input.state
  result.push(base(Fold.CloseDepth))
  stack.pop()
}

export function fold_closeInterpolation_openHandle(
  input: FoldStateInputType,
): void {
  const { result, stack, base } = input.state
  result.push(base(Fold.CloseHandle))
  stack.pop()
}

export function fold_closeInterpolation_openPlugin(
  input: FoldStateInputType,
): void {
  const { result, stack, base } = input.state
  result.push(base(Fold.ClosePlugin))
  stack.pop()
}

export function fold_closeInterpolation_openTerm(
  input: FoldStateInputType,
): void {
  const { result, stack, base } = input.state
  result.push(base(Fold.CloseTerm))
  stack.pop()
  result.push(base(Fold.CloseTermPath))
  stack.pop()
  result.push(base(Fold.CloseHandle))
  stack.pop()
  result.push(base(Fold.ClosePlugin))
  stack.pop()
}

export function fold_closeInterpolation_openText(
  input: FoldStateInputType,
): void {
  const { result, stack, base } = input.state
  result.push(base(Fold.CloseText))
  stack.pop()
}
