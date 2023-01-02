import { Fold, FoldStateInputType } from './index.js'

export function fold_comma_openTerm(
  input: FoldStateInputType,
): void {
  const { result, stack, base } = input.state
  result.push(base(Fold.CloseTerm))
  stack.pop()
  result.push(base(Fold.CloseTermPath))
  stack.pop()
}
