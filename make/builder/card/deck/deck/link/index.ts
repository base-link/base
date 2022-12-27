import { APIInputType, AST, api } from '~'

export function process_deckCard_deck_link(
  input: APIInputType,
) {
  const text = api.resolveText(input)
  if (text) {
    const [host, name] = text.slice(1).split('/')

    if (!host || !name) {
      api.throwError(api.generateInvalidDeckLink(input, text))
    }

    api.assertString(host)
    api.assertString(name)

    if (host.match(/[^a-z0-9@]/)) {
      api.throwError(
        api.generateInvalidPatternError(input, host, 'host'),
      )
    }

    if (name.match(/[^a-z0-9]/)) {
      api.throwError(
        api.generateInvalidPatternError(input, host, 'name'),
      )
    }

    const module = input.card
    api.assertAST(module, AST.PackageModule)

    module.deck.host = host
    module.deck.name = name
  }
}
