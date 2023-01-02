import { Fold, FoldStateInputType } from './index.js'

export function fold_openText_openDepth(
  input: FoldStateInputType,
): void {
  const { result, stack, base } = input.state
  result.push(base(Fold.OpenText))
  stack.push(Fold.OpenText)
}
