import {
  Base,
  DEFAULT_CONTAINER_SCOPE,
  LinkHint,
  Mesh,
  MeshPackageModuleType,
  MeshPackageType,
  Nest,
  NestPackageModuleType,
  code,
} from '~'
import type { SiteProcessInputType } from '~'

export * from './deck/index.js'

export function generate_deckCard(
  input: SiteProcessInputType,
): MeshPackageModuleType {
  code.assertNest(input.module, Nest.PackageModule)

  const deck = input.module.children.find(
    (node): node is MeshPackageType => code.isMesh(node, Mesh.Package),
  )

  code.assertRecord(deck)

  return {
    base: input.module.base,
    complete: false,
    deck,
    directory: input.module.directory,
    like: Mesh.PackageModule,
    link: input.module.link,
    path: input.module.path,
    scope: input.scope,
    text: input.module.text,
    textByLine: input.module.textByLine,
  }
}

export function handle_deckCard(base: Base, link: string): void {
  code.process_deckCard(base, link)
  code.resolve_deckCard(base, link)
}

/**
 * Entrypoint function.
 */
export function process_deckCard(base: Base, link: string): void {
  const card = base.card(link)
  const parse = code.loadLinkModule(base, link)
  const container = code.createContainerScope(DEFAULT_CONTAINER_SCOPE)
  const scope = code.createStepScope(container)
  const seed: NestPackageModuleType = {
    ...parse,
    base,
    children: [],
    like: Nest.PackageModule,
    scope,
  }

  const input: SiteProcessInputType = code.createInput(
    base,
    seed,
    scope,
    seed,
    seed,
  )

  const childInput = code.withElement(input, seed)

  card.bind(seed)

  code.processNestedChildren(
    childInput,
    seed.link,
    code.process_deckCard_nestedChildren,
  )

  if (code.childrenAreMesh(seed)) {
    code.replaceSeed(input, code.generate_deckCard(childInput))
  }
}

export function process_deckCard_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.determineNestType(input)
  switch (type) {
    case LinkHint.StaticTerm: {
      code.process_deckCard_staticTerm(input)
      break
    }
    default:
      code.throwError(code.generateUnhandledNestCaseError(input, type))
  }
}

export function process_deckCard_staticTerm(
  input: SiteProcessInputType,
): void {
  const term = code.resolveTerm(input)
  switch (term) {
    case 'deck':
      code.process_deckCard_deck(input)
      break
    default:
      code.throwError(code.generateUnhandledTermCaseError(input))
  }
}

export function resolve_deckCard(base: Base, link: string): void {
  const card = base.card(link)
  code.assertMesh(card.seed, Mesh.PackageModule)

  // TODO: deck.hint tells us the parser to use on the code.

  const { deck } = card.seed

  if (deck.bear) {
    code.handle_codeCard(base, deck.bear)
  }

  if (deck.test) {
    code.handle_codeCard(base, deck.test)
  }
}
