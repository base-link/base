import type { SiteModuleType, MeshLoad } from '~'
import { RiffDeck } from '../form.js'

export function loadMintFile(deck: RiffDeck) {
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
  load: code.MeshLoad,
): void {
  const type = code.getLinkHint(load)
  switch (type) {
    case LinkHint.DynamicTerm: {
      code.load_dynamicTerm(load)
      break
    }
    case LinkHint.StaticTerm:
      code.load_codeCard_nestedChildren_term(load)
      break
    default: {
      code.throwError(code.generateUnhandledNestCaseError(load, type))
    }
  }
}

export function load_codeCard_nestedChildren_term(
  load: code.MeshLoad,
): void {
  const term = code.resolveTermString(load)
  switch (term) {
    case 'bear': {
      code.load_codeCard_bear(load)
      break
    }
    case 'load': {
      code.load_codeCard_load(load)
      break
    }
    // case 'fuse': {
    //   code.load_codeCard_fuse(load)
    //   break
    // }
    case 'tree': {
      code.load_codeCard_tree(load)
      break
    }
    case 'face': {
      code.load_codeCard_face(load)
      break
    }
    case 'host': {
      code.load_codeCard_host(load)
      break
    }
    case 'form': {
      code.load_codeCard_form(load)
      break
    }
    case 'suit': {
      code.load_codeCard_suit(load)
      break
    }
    case 'task': {
      code.load_codeCard_task(load)
      break
    }
    case 'note': {
      code.load_codeCard_note(load)
      break
    }
    default: {
      code.throwError(code.generateUnhandledTermCaseError(load))
    }
  }
}
