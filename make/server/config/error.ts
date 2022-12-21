const ERROR: Record<string, ErrorType> = [
  {
    code: '0002',
    note: ({ name }: NamePropsType) =>
      `We haven't implemented handling the term '${name}' yet.`,
  },
  {
    code: '0001',
    note: ({ term }: TermPropsType) =>
      `We haven't implemented handling term interpolation yet, for ${term}.`,
  },
].reduce(reducer, {})

export default ERROR

function reducer(m: Record<string, ErrorType>, x: ErrorType) {
  return {
    ...m,
    [x.code]: x,
  }
}

type ErrorType = {
  code: string
  hint?: string
  note: (props: Object) => string
  text?: string
}

type NamePropsType = {
  name: string
}

type TermPropsType = {
  term: string
}
