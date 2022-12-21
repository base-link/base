import { ParserNestNodeType } from '~parse'

export function getMark(nest: ParserNestNodeType) {
  const line = nest.line[0]

  if (line && line.like === 'mark') {
    return line.mark
  }
}
