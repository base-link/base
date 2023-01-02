import { Fold, FoldStateInputType } from './index.js'

export function fold_path_openDepth(
  input: FoldStateInputType,
): void {
  const { result, stack, base } = input.state
  result.push({
    ...input.token,
    ...base(Fold.String),
  })
}
