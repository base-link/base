import { Fold, FoldStateInputType } from './index.js'

export function fold_unsignedInteger(
  input: FoldStateInputType,
): void {
  const { result, stack, base } = input.state
  result.push({
    ...base(Fold.UnsignedInteger),
    value: parseInt(input.token.text, 10),
  })
}
