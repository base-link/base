import card from '../../../card.js'
import { MeshLoad } from '../../../form.js'

export * from './bear/index.js'
export * from './face/index.js'
export * from './link/index.js'
export * from './mint/index.js'
export * from './term/index.js'
export * from './test/index.js'

export function bindNick(load: MeshLoad, hook: (text: string) => void) {
  const nickBond = card.readNick(load)
  if (nickBond) {
    hook(nickBond)
  } else {
    card.waitNick(load, () => {
      const nickBond = card.readNick(load)
      if (nickBond) {
        hook(nickBond)
      } else {
        throw new Error('Unresolved term')
      }
    })
  }
}

export function load_deckCard_deck(load: MeshLoad): void {
  const red = card.pushRed(load, card.createRedGather(load, 'deck'))
  const blue = card.attachBlue(load, 'deck', {
    face: [] as unknown as card.BlueArrayType<card.BluePackageUserType>,
    term: [] as unknown as card.BlueArrayType<card.BluePackageLicenseType>,
    type: Mesh.Package,
  })

  const colorInput = card.withColors(load, { blue, red })

  card.assumeNest(load).forEach((nest, index) => {
    tool.loadTask(load.base, () => {
      card.load_deckCard_deck_leadLink(
        card.withLink(colorInput, nest, index),
      )
    })
  })
}

export function load_deckCard_deck_leadLink(load: MeshLoad): void {
  const type = card.getLinkHint(load)
  const index = card.loadLinkIndex(load)
  switch (type) {
    case LinkHint.DynamicTerm:
      card.bindNick(load, term => {
        load_deckCard_deck_nestedTerm(term, load)
      })
      break
    case LinkHint.DynamicText:
    case LinkHint.DynamicPath:
    case LinkHint.StaticPath:
      card.throwError(card.generateInvalidNestCaseError(load, type))
      break
    case LinkHint.StaticText: {
      if (index === 0) {
        card.load_deckCard_deckLink(load)
      } else {
        throw new Error('Unhandled text.')
      }
      break
    }
    case LinkHint.StaticTerm:
      if (index > 0) {
        const term = card.resolveTermString(load)
        card.load_deckCard_deck_nestedTerm(term, load)
      } else {
        throw new Error('Unhandled term.')
      }
      break
    default:
      card.throwError(card.generateUnhandledNestCaseError(load, type))
  }
}

export function load_deckCard_deck_nestedTerm(
  term: string,
  load: MeshLoad,
): void {
  switch (term) {
    case 'bear': {
      card.load_deckCard_deck_bear(load)
      break
    }
    case 'test': {
      card.load_deckCard_deck_test(load)
      break
    }
    case 'mint': {
      card.load_deckCard_deck_mint(load)
      break
    }
    default: {
      card.throwError(card.generateUnknownTermError(load))
    }
  }
}

export function load_deckCard_deckLink(load: MeshLoad) {
  const text = card.loadText(load)

  card.haveTextForm(load, text, /^@[a-z0-9]+\/[a-z0-9]+$/)

  const [host, name] = card.splitPackageModuleName(text)
  card.haveText(host)
  card.haveText(name)

  const hostText = code.makeText(host)
  const nameText = code.makeText(name)

  load.tree.save('host', hostText)
  load.tree.save('name', nameText)
}

export function splitPackageModuleName(string: string): Array<string> {
  const [host, name] = string.split('/')
  const array: Array<string> = []
  if (host) {
    array.push(host.replace(/^@/, ''))
  }
  if (name) {
    array.push(name)
  }
  return array
}
