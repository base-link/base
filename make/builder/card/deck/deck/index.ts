import {
  APIInputType,
  AST,
  ASTPartialType,
  ASTType,
  Nest,
  api,
} from '~'

export * from './bear/index.js'
export * from './face/index.js'
export * from './link/index.js'
export * from './term/index.js'
export * from './test/index.js'

export function generate_full_deckCard_deck(
  input: APIInputType,
): ASTType<AST.Package> {
  const deck = api.assumeInputObjectAsASTPartialType(
    input,
    AST.Package,
  )
  let host
  let name
  let version

  deck.children.forEach(node => {
    if (!node.partial) {
      switch (node.like) {
        case AST.Constant:
          if (
            'like' in node.value &&
            node.value.like === AST.String
          ) {
            switch (node.name) {
              case 'link':
                ;[host, name] = node.value.string.split('/')
                break
              case 'name':
                name = node.value.string
                break
              case 'version':
                version = node.value.string
                break
            }
            break
          }
      }
    }
  })

  api.assertString(host)
  api.assertString(name)

  api.assertString(version, () =>
    api.generateMissingStringError(input, 'mark'),
  )
  // api.assertString(version)

  return {
    complete: false,
    face: [],
    host,
    like: AST.Package,
    mark: version ?? '',
    name,
    partial: false,
    term: [],
  }
}

export function process_deckCard_deck(
  input: APIInputType,
): void {
  const nest = api.assumeNest(input)
  const deck: ASTPartialType<AST.Package> = {
    children: [],
    like: AST.Package,
    partial: true,
  }

  const childInput = api.extendWithObjectScope(input, deck)

  nest.nest.forEach((nest, index) => {
    api.process_deckCard_deck_nestedChildren(
      api.extendWithNestScope(childInput, {
        index,
        nest,
      }),
    )
  })

  if (api.childrenAreComplete(deck)) {
    api.replaceASTChild(
      childInput,
      AST.PackageModule,
      deck,
      api.generate_full_deckCard_deck(childInput),
    )
  } else {
    api.throwError(
      api.generateModuleUnresolvableError(childInput),
    )
  }
}

export function process_deckCard_deck_nestedChildren(
  input: APIInputType,
): void {
  const type = api.determineNestType(input)
  const index = api.assumeNestIndex(input)
  switch (type) {
    case Nest.DynamicTerm:
    case Nest.DynamicText:
      api.throwError(
        api.generateUnhandledNestCaseError(input, type),
      )
      break
    case Nest.StaticText: {
      if (index === 0) {
        api.process_deckCard_deck_link(input)
      } else {
        throw new Error('Unhandled text.')
      }
      break
    }
    case Nest.StaticTerm:
      if (index > 0) {
        api.process_deckCard_deck_nestedTerm(input)
      } else {
        throw new Error('Unhandled term.')
      }
      break
  }
}

export function process_deckCard_deck_nestedTerm(
  input: APIInputType,
): void {
  const term = api.resolveStaticTermFromNest(input)
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
