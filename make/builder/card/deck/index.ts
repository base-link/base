import { AST, ASTModuleBaseType, Base, api } from '~'
import type {
  APIInputType,
  ASTFullType,
  ASTPartialType,
} from '~'

export * from './deck/index.js'

export function generate_deckCard(
  input: APIInputType,
): ASTFullType<AST.PackageModule> {
  api.assertASTPartial(input.card, AST.PackageModule)

  let deck

  input.card.children.forEach(node => {
    switch (node.like) {
      case AST.Package:
        deck = node
        break
    }
  })

  api.assertASTFull(deck, AST.Package)

  return {
    ...api.omit(input.card, ['children']),
    complete: true,
    deck,
    partial: false,
  }
}

export function handle_deckCard(
  base: Base,
  link: string,
): void {
  api.process_deckCard(base, link)
  api.resolve_deckCard(base, link)
}

/**
 * Entrypoint function.
 */
export function process_deckCard(
  base: Base,
  link: string,
): void {
  const text = api.readTextFile(base, link)
  const tree = api.parseTextIntoTree(text)
  const linkHost = api.getLinkHost(link)
  const card = base.card(link)
  const seed: ASTPartialType<AST.PackageModule> = {
    base,
    children: [],
    directory: linkHost,
    like: AST.PackageModule,
    parseTree: tree,
    partial: true,
    path: link,
    textByLine: text.split(/\n/),
  }
  const input: APIInputType = api.createInitialAPIInput(
    seed,
    seed,
    seed,
  )

  card.bind(seed)

  api.assertNest(tree)

  tree.nest.forEach((nest, index) => {
    api.process_deckCard_nestedChildren(
      api.extendWithNestScope(input, {
        index,
        nest,
      }),
    )
  })

  if (api.childrenAreComplete(seed)) {
    api.replaceSeed(input, api.generate_deckCard(input))
  }
}

export function process_deckCard_nestedChildren(
  input: APIInputType,
): void {
  const type = api.determineNestType(input)
  switch (type) {
    case 'static-term': {
      const term = api.resolveStaticTermFromNest(input)
      switch (term) {
        case 'deck':
          api.process_deckCard_deck(input)
          break
        default:
          api.throwError(api.generateUnknownTermError(input))
      }
      break
    }
    default:
      api.throwError(
        api.generateUnhandledNestCaseError(input, type),
      )
  }
}

export function replaceSeed<T extends ASTModuleBaseType>(
  input: APIInputType,
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
  api.assertASTFull(card.seed, AST.PackageModule)

  // TODO: deck.hint tells us the parser to use on the code.

  const { deck } = card.seed

  if (deck.bear) {
    api.handle_codeCard(base, deck.bear)
  }

  if (deck.test) {
    api.handle_codeCard(base, deck.test)
  }
}
