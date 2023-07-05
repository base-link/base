/* eslint-disable sort-keys/sort-keys-fix */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import clearDiacritics from '@lancejpollard/clear-diacritics.js'
import gematria from '@lancejpollard/gematria.js'
import _ from 'lodash'
import delineateNumberAdditionSequence from './delineateNumberAdditionSequence'
import getLargestLetters from './getLargestLetters'
import { slugify } from './string'
import { SlugTitleType } from './types'

export const ARABIC_BY_NUMBER: Record<number, string> = Object.keys(
  gematria.arabic.ABJAD_MAP,
).reduce((m, x) => {
  return {
    ...m,
    [gematria.arabic.ABJAD_MAP[x]]: x,
  }
}, {})

export type CalculationAdditionStep = {
  value: number
}

export type CalculationAdditionSteps = {
  adds: Array<CalculationAdditionStep>
  sum: number
}

const titleize = (str: string) => _.startCase(_.toLower(str))

export type CalculationBreakdownType = {
  nodes: Array<Node>
  reduction: number
  steps: Array<CalculationAdditionSteps>
  sum: number
  system: SlugTitleType
}

export const GEMATRIA_SYSTEM: Record<
  string,
  Record<string, (symbols: Array<string>) => Array<number>>
> = {
  hebrew: {
    'mispar-hechrachi': gematria.hebrew.mapMisparHechrachi,
    'mispar-gadol': gematria.hebrew.mapMisparGadol,
    'mispar-siduri': gematria.hebrew.mapMisparSiduri,
    'mispar-katan': gematria.hebrew.mapMisparKatan,
    9: gematria.hebrew.map9,
  },
  arabic: {
    abjad: gematria.arabic.mapAbjad,
  },
  latin: {
    chaldean: gematria.latin.mapChaldean,
    alphabet: gematria.latin.mapAlphabet,
    9: gematria.latin.map9,
    hebrew: gematria.latin.mapHebrew,
    kabbalah: gematria.latin.mapKabbalah,
    pythagorean: gematria.latin.mapPythagorean,
  },
  chinese: {
    9: gematria.chinese.map9,
    27: gematria.chinese.map27,
  },
}

export const LATIN_BY_NUMBER: Record<number, string> = Object.keys(
  gematria.latin.alphabet,
).reduce((m, x) => {
  return {
    ...m,
    [gematria.latin.alphabet[x]]: x,
  }
}, {})

export type LatinTermBreakdownType = {
  consonants: CalculationBreakdownType
  symbols: CalculationBreakdownType
  system: SlugTitleType
  term: SlugTitleType
  vowels: CalculationBreakdownType
}

export type LetterSystem = {
  nodes: Array<Node>
  reduction: number
  squeezedLetters: Array<Node>
  steps: Array<CalculationAdditionSteps>
  sum: number
  system: string
  systemSlug: string
}

export type Node = {
  letter: string
  number: number
}

const VOWELS = ['i', 'e', 'a', 'o', 'u']

export type TermBreakdownType = {
  symbols: CalculationBreakdownType
  system: SlugTitleType
  term: SlugTitleType
}

export default function getTermInfo(term: string): TermInfoType {
  const title = titleize(term)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const symbolLetters = [
    ...(clearDiacritics(
      term.toLowerCase().replace(/[^a-z]+/g, ''),
    ) as string),
  ]

  const consonantLetters = symbolLetters.filter(
    x => !VOWELS.includes(x),
  )
  const vowelLetters = symbolLetters.filter(x => VOWELS.includes(x))

  const info: TermInfoType = {
    consonantLetters,
    consonants: [],
    symbolLetters,
    symbols: [],
    title,
    vowelLetters,
    vowels: [],
  }

  if (consonantLetters.length) {
    info.consonants.push(
      addCalculationStep(
        'Chaldean',
        gematria.latin.mapChaldean,
        consonantLetters,
      ),
    )
    info.consonants.push(
      addCalculationStep(
        'Alphabet',
        gematria.latin.mapAlphabet,
        consonantLetters,
      ),
    )
    info.consonants.push(
      addCalculationStep('9', gematria.latin.map9, consonantLetters),
    )
    info.consonants.push(
      addCalculationStep(
        'Hebrew',
        gematria.latin.mapHebrew,
        consonantLetters,
      ),
    )
    info.consonants.push(
      addCalculationStep(
        'Kabbalah',
        gematria.latin.mapKabbalah,
        consonantLetters,
      ),
    )
    info.consonants.push(
      addCalculationStep(
        'Pythagorean',
        gematria.latin.mapPythagorean,
        consonantLetters,
      ),
    )
  }

  if (vowelLetters.length) {
    info.vowels.push(
      addCalculationStep(
        'Chaldean',
        gematria.latin.mapChaldean,
        vowelLetters,
      ),
    )
    info.vowels.push(
      addCalculationStep(
        'Alphabet',
        gematria.latin.mapAlphabet,
        vowelLetters,
      ),
    )
    info.vowels.push(
      addCalculationStep('9', gematria.latin.map9, vowelLetters),
    )
    info.vowels.push(
      addCalculationStep(
        'Hebrew',
        gematria.latin.mapHebrew,
        vowelLetters,
      ),
    )
    info.vowels.push(
      addCalculationStep(
        'Kabbalah',
        gematria.latin.mapKabbalah,
        vowelLetters,
      ),
    )
    info.vowels.push(
      addCalculationStep(
        'Pythagorean',
        gematria.latin.mapPythagorean,
        vowelLetters,
      ),
    )
  }

  info.symbols.push(
    addCalculationStep(
      'Chaldean',
      gematria.latin.mapChaldean,
      symbolLetters,
    ),
  )
  info.symbols.push(
    addCalculationStep(
      'Alphabet',
      gematria.latin.mapAlphabet,
      symbolLetters,
    ),
  )
  info.symbols.push(
    addCalculationStep('9', gematria.latin.map9, symbolLetters),
  )
  info.symbols.push(
    addCalculationStep(
      'Hebrew',
      gematria.latin.mapHebrew,
      symbolLetters,
    ),
  )
  info.symbols.push(
    addCalculationStep(
      'Kabbalah',
      gematria.latin.mapKabbalah,
      symbolLetters,
    ),
  )
  info.symbols.push(
    addCalculationStep(
      'Pythagorean',
      gematria.latin.mapPythagorean,
      symbolLetters,
    ),
  )

  return info
}

function addCalculationStep(
  system: string,
  fn: (letters: Array<string>) => Array<number>,
  letters: Array<string>,
): LetterSystem {
  const numbers = fn(letters)
  const steps = delineateNumberAdditionSequence(numbers)
  const nodes = numbers.map((number, i) => ({
    letter: letters[i],
    number,
  }))
  const sum = steps[0].sum
  const reduction = steps[steps.length - 1].sum
  const squeezedLetters = getLargestLetters(
    numbers.map(String).join(''),
  ).map(number => ({
    letter: LATIN_BY_NUMBER[number],
    number,
  }))

  return {
    nodes,
    reduction,
    squeezedLetters,
    steps,
    sum,
    system,
    systemSlug: slugify(system),
  }
}

export type TermInfoType = {
  consonantLetters: Array<string>
  consonants: Array<LetterSystem>
  symbolLetters: Array<string>
  symbols: Array<LetterSystem>
  title: string
  vowelLetters: Array<string>
  vowels: Array<LetterSystem>
}

export function getArabicTermInfo(
  slug: string,
  title: string,
): TermInfoType {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const symbolLetters = [...slug]

  const info: TermInfoType = {
    consonantLetters: [],
    consonants: [],
    symbolLetters,
    symbols: [],
    title,
    vowelLetters: [],
    vowels: [],
  }

  info.symbols.push(
    addCalculationStep(
      'Abjad',
      gematria.arabic.mapAbjad,
      symbolLetters,
    ),
  )

  return info
}

export function getChineseTermInfo(slug: string): TermInfoType {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const symbolLetters = [...slug]

  const info: TermInfoType = {
    consonantLetters: [],
    consonants: [],
    symbolLetters,
    symbols: [],
    title: slug,
    vowelLetters: [],
    vowels: [],
  }

  info.symbols.push(
    addCalculationStep('27', gematria.chinese.map27, symbolLetters),
  )

  info.symbols.push(
    addCalculationStep('9', gematria.chinese.map9, symbolLetters),
  )

  return info
}

export function getHebrewTermInfo(
  slug: string,
  title: string,
): TermInfoType {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const symbolLetters = [...slug]

  const info: TermInfoType = {
    consonantLetters: [],
    consonants: [],
    symbolLetters,
    symbols: [],
    title,
    vowelLetters: [],
    vowels: [],
  }

  info.symbols.push(
    addCalculationStep(
      'Mispar Hechrachi',
      gematria.hebrew.mapMisparHechrachi,
      symbolLetters,
    ),
  )
  info.symbols.push(
    addCalculationStep(
      'Mispar Gadol',
      gematria.hebrew.mapMisparGadol,
      symbolLetters,
    ),
  )
  info.symbols.push(
    addCalculationStep(
      'Mispar Siduri',
      gematria.hebrew.mapMisparSiduri,
      symbolLetters,
    ),
  )
  info.symbols.push(
    addCalculationStep(
      'Mispar Katan',
      gematria.hebrew.mapMisparKatan,
      symbolLetters,
    ),
  )
  info.symbols.push(
    addCalculationStep('9', gematria.hebrew.map9, symbolLetters),
  )

  return info
}

export function getLatinSymbolBreakdown(
  term: string,
  system: string,
): LatinTermBreakdownType {
  const symbols = [
    ...(clearDiacritics(
      term.toLowerCase().replace(/\s+/g, ''),
    ) as string),
  ]

  const consonants = symbols.filter(x => !VOWELS.includes(x))
  const vowels = symbols.filter(x => VOWELS.includes(x))

  return {
    term: {
      slug: term,
      title: titleize(term),
    },
    system: {
      slug: system,
      title: titleize(system),
    },
    consonants: getSystemCalculationBreakdown(
      consonants,
      'latin',
      system,
    ),
    symbols: getSystemCalculationBreakdown(symbols, 'latin', system),
    vowels: getSystemCalculationBreakdown(vowels, 'latin', system),
  }
}

export function getSymbolBreakdown(
  term: string,
  system: string,
  script: string,
  symbols: Array<string>,
): TermBreakdownType {
  return {
    term: {
      slug: term,
      title: titleize(term),
    },
    system: {
      slug: system,
      title: titleize(system),
    },
    symbols: getSystemCalculationBreakdown(symbols, script, system),
  }
}

export function getSystemCalculationBreakdown(
  symbols: Array<string>,
  script: string,
  system: string,
) {
  const numbers = GEMATRIA_SYSTEM[script][system](symbols)
  const steps = delineateNumberAdditionSequence(numbers)
  const nodes = numbers.map((number, i) => ({
    letter: symbols[i],
    number,
  }))
  const sum = steps[0]?.sum ?? 0
  const reduction = steps[steps.length - 1]?.sum ?? 0

  return {
    nodes,
    reduction,
    steps,
    sum,
    system: {
      slug: system,
      title: titleize(system),
    },
  }
}
