import { Fold, FoldStateInputType } from './index.js'

// export function fold_line_openDepth(
//   input: FoldStateInputType,
// ): void {
//   input.state.notifyIndent()
// }

export function fold_line_openHandle(
  input: FoldStateInputType,
): void {
  const { result, stack, base } = input.state
  input.state.notifyIndent()
  input.state.previousNestLevel = 0
}

export function fold_line_openModule(
  input: FoldStateInputType,
): void {
  input.state.handle = []
  input.state.lines.push(input.state.handle)
}

export function fold_line_openTerm(
  input: FoldStateInputType,
): void {
  const { result, stack, base } = input.state
  result.push(base(Fold.CloseTerm))
  stack.pop()

  result.push(base(Fold.CloseTermPath))
  stack.pop()

  // result.push(base(Fold.CloseHandle))
  // stack.pop()

  input.state.notifyIndent()
  input.state.previousNestLevel = 0
}

export function fold_line_string(
  input: FoldStateInputType,
): void {
  const { result, base } = input.state
  result.push({
    ...input.token,
    ...base(Fold.String),
  })
}
