import { Base, Link, LinkHint, Mesh, code } from '~'
import type { SiteModuleType, SiteProcessInputType } from '~'
import { minimatch } from 'minimatch'

export * from './bear/index.js'
export * from './bind/index.js'
export * from './bond/index.js'
export * from './call/index.js'
export * from './face/index.js'
export * from './form/index.js'
export * from './fuse/index.js'
export * from './head/index.js'
export * from './hide/index.js'
export * from './hold/index.js'
export * from './hook/index.js'
export * from './host/index.js'
export * from './like/index.js'
export * from './link/index.js'
export * from './load/index.js'
export * from './note/index.js'
export * from './risk/index.js'
export * from './save/index.js'
export * from './show/index.js'
export * from './slot/index.js'
export * from './stem/index.js'
export * from './suit/index.js'
export * from './take/index.js'
export * from './task/index.js'
export * from './term/index.js'
export * from './test/index.js'
export * from './time/index.js'
export * from './tree/index.js'
export * from './void/index.js'
export * from './wait/index.js'
export * from './walk/index.js'
export * from './zone/index.js'

export function loadCard(base: Base, link: string): void {
  if (code.testHaveCard(base, link)) {
    return
  }

  const deck = code.loadDeckFile(link)
  const mint = code.loadMintFile(deck)

  walk: for (const have of mint.mint) {
    if (minimatch(link, have.link)) {
      switch (have.name) {
        case 'deck':
          return code.load_deckCard(base, link)
        case 'code':
          return code.load_codeCard(base, link)
        case 'mint':
          return code.load_mintCard(base, link)
        case 'note':
          // a note type is a scratch type which isn't validated
          return code.load_noteCard(base, link)
        case 'book':
          return code.load_bookCard(base, link)
        default:
          break walk
      }
    }
  }

  throw code.haltCardMiss()
}

export function loadMintFile(deck) {
  if (deck.mint) {
    return code.readFileLink(path.relative(deck.mint, deck.link))
  }
}

export function load_codeCard(base: Base, link: string): void {
  const linkText = code.readLinkText(base, link)

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
    callbacks: code.createBlueArray(module),
    classInterfaces: code.createBlueArray(module),
    classes: code.createBlueArray(module),
    components: code.createBlueArray(module),
    constants: code.createBlueArray(module),
    exports: code.createBlueArray(module),
    functions: code.createBlueArray(module),
    imports: code.createBlueArray(module),
    nativeClassInterfaces: code.createBlueArray(module),
    public: code.createBlueMap(module, {
      classInterfaces: code.createBlueArray(module),
      classes: code.createBlueArray(module),
      components: code.createBlueArray(module),
      constants: code.createBlueArray(module),
      functions: code.createBlueArray(module),
      nativeClassInterfaces: code.createBlueArray(module),
      templates: code.createBlueArray(module),
      tests: code.createBlueArray(module),
    }),
    templates: code.createBlueArray(module),
    tests: code.createBlueArray(module),
    type: Mesh.CodeModule,
  })

  const colorInput = code.withColors(module, { blue: packageBlue })

  if (module.text.trim()) {
    module.linkTree.nest.forEach((nest, index) => {
      code.addTask(base, () => {
        code.load_codeCard_nestedChildren(
          code.withLink(colorInput, nest, index),
        )
      })
    })
  }
}

export function load_codeCard_nestedChildren(
  input: SiteProcessInputType,
): void {
  const type = code.getLinkHint(input)
  switch (type) {
    case LinkHint.DynamicTerm: {
      code.load_dynamicTerm(input)
      break
    }
    case LinkHint.StaticTerm:
      code.load_codeCard_nestedChildren_term(input)
      break
    default: {
      code.throwError(code.generateUnhandledNestCaseError(input, type))
    }
  }
}

export function load_codeCard_nestedChildren_term(
  input: SiteProcessInputType,
): void {
  const term = code.resolveTermString(input)
  switch (term) {
    case 'bear': {
      code.load_codeCard_bear(input)
      break
    }
    case 'load': {
      code.load_codeCard_load(input)
      break
    }
    // case 'fuse': {
    //   code.load_codeCard_fuse(input)
    //   break
    // }
    case 'tree': {
      code.load_codeCard_tree(input)
      break
    }
    case 'face': {
      code.load_codeCard_face(input)
      break
    }
    case 'host': {
      code.load_codeCard_host(input)
      break
    }
    case 'form': {
      code.load_codeCard_form(input)
      break
    }
    case 'suit': {
      code.load_codeCard_suit(input)
      break
    }
    case 'task': {
      code.load_codeCard_task(input)
      break
    }
    case 'note': {
      code.load_codeCard_note(input)
      break
    }
    default: {
      code.throwError(code.generateUnhandledTermCaseError(input))
    }
  }
}
