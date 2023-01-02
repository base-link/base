import { Fold, FoldStateInputType } from './index.js'

export function fold_openInterpolation_openHandle(
  input: FoldStateInputType,
): void {
  const { result, stack, base } = input.state
  stack.push(Fold.OpenPlugin)
  result.push({
    size: input.token.text.length,
    ...base(Fold.OpenPlugin),
  })
}

export function fold_openInterpolation_openTerm(
  input: FoldStateInputType,
): void {
  const { result, stack, base } = input.state
  stack.push(Fold.OpenPlugin)
  result.push({
    size: input.token.text.length,
    ...base(Fold.OpenPlugin),
  })
}

export function fold_openInterpolation_openText(
  input: FoldStateInputType,
): void {
  const { result, stack, base } = input.state
  stack.push(Fold.OpenPlugin)
  result.push({
    size: input.token.text.length,
    ...base(Fold.OpenPlugin),
  })
}
