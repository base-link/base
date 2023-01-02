import { Fold, FoldStateInputType } from './index.js'

export function fold_string_openHandle(
  input: FoldStateInputType,
): void {
  const { result, base } = input.state
  result.push(base(Fold.CloseHandle))
  result.push({
    ...input.token,
    ...base(Fold.String),
  })
}

export function fold_string_openTerm(
  input: FoldStateInputType,
): void {
  const { result, stack, base } = input.state
  result.push(base(Fold.CloseHandle))
  stack.pop()

  result.push(base(Fold.CloseTermPath))
  stack.pop()

  result.push(base(Fold.CloseTerm))
  stack.pop()
}

export function fold_string_openText(
  input: FoldStateInputType,
): void {
  const { result, stack, base } = input.state
  result.push({
    ...input.token,
    ...base(Fold.String),
  })
}
