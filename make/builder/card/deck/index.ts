import {
  APIInputType,
  AST,
  ASTModuleBaseType,
  ASTPackageModulePartialType,
  Base,
  Tree,
  api,
} from '~'

export * from './deck'

export function createInitialAPIInput<
  T extends ASTModuleBaseType,
>(
  card: T,
  objectScopeData: Record<string, unknown>,
  lexicalScopeData: Record<string, unknown>,
): APIInputType {
  return {
    card,
    lexicalScope: api.createScope(lexicalScopeData),
    objectScope: api.createScope(objectScopeData),
  }
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
  const seed: ASTPackageModulePartialType = {
    base,
    deck: {
      face: [],
      like: AST.Package,
      partial: true,
      term: [],
    },
    dependencyList: [],
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

  if (tree.like === Tree.Nest) {
    tree.nest.forEach((nest, index) => {
      api.process_deckCard_nestedChildren(
        api.extendWithNestScope(input, {
          index,
          nest,
        }),
      )
    })
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

export function resolve_deckCard(
  base: Base,
  link: string,
): void {
  const card = base.card(link)
  api.assertAST(card.seed, AST.PackageModule)

  const { deck } = card.seed

  // TODO: deck.hint tells us the parser to use on the code.

  if (deck.bear) {
    api.process_codeCard(base, deck.bear)
    api.resolve_codeCard(base, deck.bear)
  }
}
