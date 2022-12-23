import { NestInputType, Tree } from '~'

export function getMark(input: NestInputType) {
  const nest = input.nest
  const line = nest.line[0]

  if (line && line.like === Tree.Mark) {
    return line.mark
  }
}
