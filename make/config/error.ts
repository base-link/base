import { api } from '~'
import type { ErrorConfigType, ErrorInputType } from '~'

export const ERROR: Record<string, ErrorConfigType> = [
  {
    code: '0002',
    note: ({ name, scope }: ErrorInputType) =>
      scope
        ? `We haven't implemented handling the term '${name}' within '${scope}' yet.`
        : `We haven't implemented handling the term '${name}' yet.`,
  },
  {
    code: '0001',
    note: ({ term }: ErrorInputType) =>
      `We haven't implemented handling term interpolation yet, for ${term}.`,
  },
].reduce(errorReducer, {})

function errorReducer(
  m: Record<string, ErrorConfigType>,
  x: ErrorConfigType,
) {
  return {
    ...m,
    [x.code]: {
      isError: true,
      ...x,
    },
  }
}
