import { MeshLoad } from '../form.js'
import card from '../card.js'
import tool from '../tool.js'

export function bindText(load: MeshLoad, hook: (text: string) => void) {
  const hint = tool.readLinkHint(load)
  switch (hint) {
    case LinkHint.Text: {
      const string = tool.loadText(load)
      hook(string)
      break
    }
    case LinkHint.NickText: {
      const string = tool.loadNickText(load)

      if (string) {
        hook(string)
      } else {
        tool.waitText(load, () => {
          const string = tool.loadNickText(load)
          if (!string) {
            tool.throwError(`Received null for string`, load)
          } else {
            hook(string)
          }
        })
      }
    }
    default:
      tool.throwError(tool.generateUnhandledNestCaseError(load, hint))
  }
}

// https://github.com/nerdbond/base.link/blob/make/make/tool/dependency.ts#L277
export function loadNickText(load: MeshLoad) {}

export function loadText(load: MeshLoad) {}
