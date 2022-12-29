import { Tree, code } from '~'
import type { MeshInputType } from '~'

export function nestHasSlot(
  input: MeshInputType,
  size: number = 1,
): boolean {
  const nest = code.assumeNest(input)

  for (let i = 0, n = nest.line.length; i < n; i++) {
    let line = nest.line[i]
    if (line) {
      if (line.like !== Tree.Term) {
        continue
      }

      for (let j = 0, m = line.link.length; j < m; j++) {
        let link = line.link[j]
        if (
          link &&
          link.like === Tree.Slot &&
          link.size === size
        ) {
          return true
        }
      }
    }
  }

  return false
}
