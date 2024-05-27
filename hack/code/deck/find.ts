import fs from 'fs'
import pathResolver from 'path'

export function findHostLink(
  link: string,
  base: string,
): string | void {
  const linkBase = pathResolver.join(base, `./link/hook/${link}`)
  if (testFileBase(linkBase)) {
    const linkBaseBond = readLink(linkBase)

    if (testFile(linkBaseBond)) {
      return readLink(linkBaseBond)
    } else if (testFileBase(linkBaseBond)) {
      const deckLink = `${base}/deck.link`
      if (testFile(deckLink)) {
        const deck = loadDeck(deckLink)
        if (deck && deck.head) {
          const deckHeadLink = pathResolver.relative(deck.head, base)
          if (testFile(deckHeadLink)) {
            return readLink(deckHeadLink)
          }
        }
      }
      const BaseNote = `${base}/base.link`
      if (testFile(BaseNote)) {
        return readLink(BaseNote)
      }
    }
  }

  if (base != '/') {
    const riseLink = pathResolver.join(base, '..')
    return findHostLink(link, riseLink)
  }
}

export function findLeadLink(linkBase: string): string | void {
  if (testFileBase(linkBase)) {
    const linkBaseBond = readLink(linkBase)
    // it doesn't need to check the package.json, that is what the installer does.
    // so by this point it is the actual structure.
    if (testFile(linkBaseBond)) {
      return readLink(linkBaseBond)
    } else if (testFileBase(linkBaseBond)) {
      const deckLink = `${linkBaseBond}/deck.link`
      if (testFile(deckLink)) {
        const deck = loadDeck(deckLink)
        if (deck.head) {
          const deckHeadLink = pathResolver.relative(
            deck.head,
            linkBaseBond,
          )
          if (testFile(deckHeadLink)) {
            return readLink(deckHeadLink)
          }
        }
      }
      const BaseNote = `${linkBaseBond}/base.link`
      if (testFile(BaseNote)) {
        return readLink(BaseNote)
      }
    }
  }
}

export function findLink(link: string, base: string) {
  if (link.startsWith('@')) {
    return findHostLink(link.slice(1), process.cwd())
  } else {
    return findLeadLink(pathResolver.relative(link, base))
  }
}

export const readLink =
  process.platform !== 'win32' &&
  fs.realpathSync &&
  typeof fs.realpathSync.native === 'function'
    ? fs.realpathSync.native
    : fs.realpathSync

export function testFile(dir: string) {
  try {
    const stat = fs.statSync(dir, { throwIfNoEntry: false })
    return !!stat && (stat.isFile() || stat.isFIFO())
  } catch (halt) {
    if (testFileReadHalt(halt)) {
      return false
    }
    throw halt
  }
}

export function testFileBase(file: string) {
  try {
    const stat = fs.statSync(file, { throwIfNoEntry: false })
    return !!stat && stat.isDirectory()
  } catch (halt) {
    if (testFileReadHalt(halt)) {
      return false
    }
    throw halt
  }
}

function testFileReadHalt(halt: unknown) {
  return (
    halt instanceof Error &&
    'code' in halt &&
    (halt.code === 'ENOENT' || halt.code === 'ENOTDIR')
  )
}
