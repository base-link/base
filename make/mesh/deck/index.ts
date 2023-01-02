import {
  Base,
  Link,
  LinkTreeType,
  Mesh,
  MeshModuleBaseType,
  code,
} from '~'
import type {
  MeshFullType,
  MeshInputType,
  MeshPartialType,
} from '~'

export * from './deck/index.js'

export type MeshParseType = {
  directory: string
  link: LinkTreeType
  path: string
  text: string
  textByLine: Array<string>
}

export function generate_deckCard(
  input: MeshInputType,
): MeshFullType<Mesh.PackageModule> {
  code.assertMeshPartialType(input.card, Mesh.PackageModule)

  let deck

  input.card.children.forEach(node => {
    switch (node.like) {
      case Mesh.Package:
        deck = node
        break
      default:
        throw new Error('Oops')
    }
  })

  code.assertMeshFullType(deck, Mesh.Package)

  return {
    ...code.omit(input.card, ['children']),
    complete: true,
    deck,
    partial: false,
  }
}

export function handle_deckCard(
  base: Base,
  link: string,
): void {
  code.process_deckCard(base, link)
  code.resolve_deckCard(base, link)
}

export function loadLinkModule(
  base: Base,
  path: string,
): MeshParseType {
  const text = code.readTextFile(base, path)
  const data = code.parseLinkText({ path, text })
  const directory = code.getLinkHost(path)
  return {
    directory,
    ...data,
  }
}

/**
 * Entrypoint function.
 */
export function process_deckCard(
  base: Base,
  link: string,
): void {
  const card = base.card(link)
  const parse = code.loadLinkModule(base, link)
  const seed: MeshPartialType<Mesh.PackageModule> = {
    ...parse,
    base,
    children: [],
    like: Mesh.PackageModule,
    partial: true,
  }

  const input: MeshInputType = code.createInitialMeshInput(
    seed,
    seed,
    seed,
  )

  card.bind(seed)

  code.assertLinkType(seed.link, Link.Tree)

  seed.link.nest.forEach((nest, index) => {
    code.process_deckCard_nestedChildren(
      code.extendWithNestScope(input, {
        index,
        nest,
      }),
    )
  })

  if (code.childrenAreComplete(seed)) {
    code.replaceSeed(input, code.generate_deckCard(input))
  }
}

export function process_deckCard_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  switch (type) {
    case 'static-term': {
      const term = code.resolveStaticTermFromNest(input)
      switch (term) {
        case 'deck':
          code.process_deckCard_deck(input)
          break
        default:
          code.throwError(
            code.generateUnhandledTermCaseError(input),
          )
      }
      break
    }
    default:
      code.throwError(
        code.generateUnhandledNestCaseError(input, type),
      )
  }
}

export function replaceSeed<T extends MeshModuleBaseType>(
  input: MeshInputType,
  replacement: T,
): void {
  input.card = replacement
  input.card.base.card(input.card.path).bind(replacement)
}

export function resolve_deckCard(
  base: Base,
  link: string,
): void {
  const card = base.card(link)
  code.assertMeshFullType(card.seed, Mesh.PackageModule)

  // TODO: deck.hint tells us the parser to use on the code.

  const { deck } = card.seed

  if (deck.bear) {
    code.handle_codeCard(base, deck.bear)
  }

  if (deck.test) {
    code.handle_codeCard(base, deck.test)
  }
}
