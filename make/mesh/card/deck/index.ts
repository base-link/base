import { Base, Mesh, MeshModuleBaseType, code } from '~'
import type {
  MeshFullType,
  MeshInputType,
  MeshPartialType,
} from '~'

export * from './deck/index.js'

export function generate_deckCard(
  input: MeshInputType,
): MeshFullType<Mesh.PackageModule> {
  code.assertMeshPartial(input.card, Mesh.PackageModule)

  let deck

  input.card.children.forEach(node => {
    switch (node.like) {
      case Mesh.Package:
        deck = node
        break
    }
  })

  code.assertMeshFull(deck, Mesh.Package)

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

/**
 * Entrypoint function.
 */
export function process_deckCard(
  base: Base,
  link: string,
): void {
  const text = code.readTextFile(base, link)
  const tree = code.parseTextIntoTree(text)
  const linkHost = code.getLinkHost(link)
  const card = base.card(link)
  const seed: MeshPartialType<Mesh.PackageModule> = {
    base,
    children: [],
    directory: linkHost,
    like: Mesh.PackageModule,
    parseTree: tree,
    partial: true,
    path: link,
    textByLine: text.split(/\n/),
  }
  const input: MeshInputType = code.createInitialMeshInput(
    seed,
    seed,
    seed,
  )

  card.bind(seed)

  code.assertNest(tree)

  tree.nest.forEach((nest, index) => {
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
  code.assertMeshFull(card.seed, Mesh.PackageModule)

  // TODO: deck.hint tells us the parser to use on the code.

  const { deck } = card.seed

  if (deck.bear) {
    code.handle_codeCard(base, deck.bear)
  }

  if (deck.test) {
    code.handle_codeCard(base, deck.test)
  }
}
