import { MeshLoad } from '~/make/form.js'
import card from '~/make/card.js'

export function bindText(load: MeshLoad, hook: (text: string) => void) {
  const type = card.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticText: {
      const string = card.assumeText(load)
      hook(string)
      break
    }
    case LinkHint.DynamicText: {
      const string = card.loadLink(load, Link.Text)

      if (string) {
        hook(string)
      } else {
        card.waitText(load, () => {
          const string = card.loadLink(load, Link.Text)
          if (!string) {
            tool.throwError(`Received null for string`, load)
          } else {
            hook(string)
          }
        })
      }
    }
    default:
      card.throwError(card.generateUnhandledNestCaseError(load, type))
  }
}
