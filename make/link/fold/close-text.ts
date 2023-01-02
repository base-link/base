import { Fold, FoldStateInputType } from './index.js'

export function fold_closeText_closeDepth(
  input: FoldStateInputType,
): void {
  const { result, base } = input.state
  result.push(base(Fold.CloseText))
}

export function fold_closeText_openDepth(
  input: FoldStateInputType,
): void {
  const { result, stack, base } = input.state

  result.push(base(Fold.CloseText))
  stack.pop()
}

export function fold_closeText_openText(
  input: FoldStateInputType,
): void {
  const { result, stack, base } = input.state

  result.push(base(Fold.CloseText))
  stack.pop()
}
