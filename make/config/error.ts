import {
  ErrorConfigType,
  ErrorInputType,
  errorReducer,
} from '~'

export const ERROR: Record<string, ErrorConfigType> = [
  {
    code: '0002',
    note: ({ name }: ErrorInputType) =>
      `We haven't implemented handling the term '${name}' yet.`,
  },
  {
    code: '0001',
    note: ({ term }: ErrorInputType) =>
      `We haven't implemented handling term interpolation yet, for ${term}.`,
  },
].reduce(errorReducer, {})
