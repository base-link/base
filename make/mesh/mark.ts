import { Tree, code } from '~'
import type { MeshInputType } from '~'

export function getMark(input: MeshInputType) {
  const nest = code.assumeNest(input)
  const line = nest.line[0]

  if (line && line.like === Tree.Mark) {
    return line.mark
  }
}
