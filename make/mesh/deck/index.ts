import {
  Base,
  Color,
  DEFAULT_CONTAINER_SCOPE,
  Link,
  LinkHint,
  Mesh,
  SiteModuleType,
  code,
} from '~'
import type { MeshLoad } from '~'

export * from './deck/index.js'

/**
 * Entrypoint function.
 */

export function load_deckCard(base: Base, link: string): void {
  const parse = code.loadLinkModule(base, link)
  const card = base.card(link)
  const container = code.createTopContainerScope()
  const scope = code.createStepScope(container)

  const red = code.createTopRed({
    children: [],
    scope,
    type: Mesh.Gather,
  })

  const blue = code.createTopBlue()

  const baseModule: Partial<SiteModuleType> = {
    ...parse,
    base,
    blue,
    id: card.id,
    isModule: true,
    link: code.createTopLink(parse.linkTree),
    red,
    scope,
  }

  baseModule.module = baseModule as SiteModuleType
  baseModule.environment = code.createEnvironment(baseModule)

  const module = baseModule as SiteModuleType

  code.assertString(module.text)
  code.assertLink(module.linkTree, Link.Tree)

  card.bind(module)

  const packageBlue = code.attachBlue(module, 'definitions', {
    type: Mesh.PackageModule,
  })

  const colorInput = code.withColors(module, { blue: packageBlue })

  if (module.text.trim()) {
    module.linkTree.nest.forEach((nest, index) => {
      code.addTask(base, () => {
        code.load_deckCard_nestedChildren(
          code.withLink(colorInput, nest, index),
        )
      })
    })
  }
}

export function load_deckCard_nestedChildren(load: MeshLoad): void {
  const type = code.getLinkHint(load)
  switch (type) {
    case LinkHint.StaticTerm: {
      code.load_deckCard_staticTerm(load)
      break
    }
    default:
      code.throwError(code.generateUnhandledNestCaseError(load, type))
  }
}

export function load_deckCard_staticTerm(load: MeshLoad): void {
  const term = code.resolveTermString(load)
  switch (term) {
    case 'deck':
      code.load_deckCard_deck(load)
      break
    default:
      code.throwError(code.generateUnhandledTermCaseError(load))
  }
}
