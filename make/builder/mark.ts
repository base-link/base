import { Tree, api } from '~'
import type { APIInputType } from '~'

export function getMark(input: APIInputType) {
  const nest = api.assumeNest(input)
  const line = nest.line[0]

  if (line && line.like === Tree.Mark) {
    return line.mark
  }
}
