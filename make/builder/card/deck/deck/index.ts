import { Nest, NestInputType, api } from '~'

export * from './bear'
export * from './face'
export * from './link'
export * from './term'
export * from './test'

export function process_deckCard_deck(
  input: NestInputType,
): void {
  input.nest.nest.forEach((nest, index) => {
    api.process_deckCard_deck_nestedChildren({
      ...input,
      index,
      nest,
    })
  })
}

export function process_deckCard_deck_nestedChildren(
  input: NestInputType,
): void {
  const type = api.determineNestType(input)
  switch (type) {
    case Nest.DynamicTerm:
    case Nest.DynamicText:
      api.throwError(
        api.generateUnhandledNestCaseError(input, type),
      )
      break
    case Nest.StaticText:
      if (input.index === 0) {
        api.process_deckCard_deck_link(input)
      } else {
        throw new Error('Unhandled text.')
      }
      break
    case Nest.StaticTerm:
      if (input.index > 0) {
        api.process_deckCard_deck_nestedTerm(input)
      } else {
        throw new Error('Unhandled term.')
      }
      break
  }
}

export function process_deckCard_deck_nestedTerm(
  input: NestInputType,
): void {
  const term = api.resolveStaticTerm(input)
  switch (term) {
    case 'bear': {
      api.process_deckCard_deck_bear(input)
      break
    }
    case 'test': {
      api.process_deckCard_deck_test(input)
      break
    }
    default: {
      api.throwError(api.generateUnknownTermError(input))
    }
  }
}
