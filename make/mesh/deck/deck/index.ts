import { Link, LinkHint, Mesh, code } from '~'
import type {
  MeshInputType,
  MeshPartialType,
  MeshType,
} from '~'

export * from './bear/index.js'
export * from './face/index.js'
export * from './link/index.js'
export * from './mint/index.js'
export * from './term/index.js'
export * from './test/index.js'

export function generate_full_deckCard_deck(
  input: MeshInputType,
): MeshType<Mesh.Package> {
  const deck = code.assumeInputObjectAsMeshPartialType(
    input,
    Mesh.Package,
  )
  let host
  let name
  let version
  let exportFile
  let testFile

  deck.children.forEach(node => {
    if (!node.partial) {
      switch (node.like) {
        case Mesh.Constant:
          if (
            'like' in node.value &&
            node.value.like === Mesh.String
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
              case 'export':
                exportFile = node.value.string
                break
              case 'test':
                testFile = node.value.string
                break
              default:
                break
            }
            break
          }
        default:
          break
      }
    }
  })

  code.assertString(host)
  code.assertString(name)

  code.assertString(version, 'version')

  return {
    bear: exportFile,
    complete: false,
    face: [],
    host,
    lexicalScope: deck.lexicalScope,
    like: Mesh.Package,
    mark: version,
    name,
    partial: false,
    term: [],
    test: testFile,
  }
}

export function process_deckCard_deck(
  input: MeshInputType,
): void {
  const nest = code.assumeLinkType(input, Link.Tree)
  const deck: MeshPartialType<Mesh.Package> = {
    children: [],
    lexicalScope: input.lexicalScope,
    like: Mesh.Package,
    partial: true,
  }

  code.assertMeshPartialType(input.card, Mesh.PackageModule)
  input.card.children.push(deck)

  const childInput = code.extendWithObjectScope(input, deck)

  nest.nest.forEach((nest, index) => {
    code.process_deckCard_deck_nestedChildren(
      code.extendWithNestScope(childInput, {
        index,
        nest,
      }),
    )
  })

  if (code.childrenAreComplete(deck)) {
    code.replaceMeshChild(
      childInput,
      Mesh.PackageModule,
      deck,
      code.generate_full_deckCard_deck(childInput),
    )
  } else {
    code.throwError(
      code.generateModuleUnresolvableError(childInput),
    )
  }
}

export function process_deckCard_deck_nestedChildren(
  input: MeshInputType,
): void {
  const type = code.determineNestType(input)
  const index = code.assumeNestIndex(input)
  switch (type) {
    case LinkHint.DynamicTerm:
    case LinkHint.DynamicText:
      code.throwError(
        code.generateUnhandledNestCaseError(input, type),
      )
      break
    case LinkHint.StaticText: {
      if (index === 0) {
        code.process_deckCard_deck_link(input)
      } else {
        throw new Error('Unhandled text.')
      }
      break
    }
    case LinkHint.StaticTerm:
      if (index > 0) {
        code.process_deckCard_deck_nestedTerm(input)
      } else {
        throw new Error('Unhandled term.')
      }
      break
    default:
      code.throwError(
        code.generateUnhandledNestCaseError(input, type),
      )
  }
}

export function process_deckCard_deck_nestedTerm(
  input: MeshInputType,
): void {
  const term = code.resolveStaticTermFromNest(input)
  switch (term) {
    case 'bear': {
      code.process_deckCard_deck_bear(input)
      break
    }
    case 'test': {
      code.process_deckCard_deck_test(input)
      break
    }
    case 'mint': {
      code.process_deckCard_deck_mint(input)
      break
    }
    default: {
      code.throwError(code.generateUnknownTermError(input))
    }
  }
}
