/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import gematriya from 'gematriya'
import libArabicChinese from 'lib-arabic-chinese'
import Geezify from 'geezify-js'

const geez = Geezify.create()

export const NUMBER_TO_SYMBOL: Record<string, (i: number) => string> = {
  amharic: toAmharicNumber,
  arabic: toArabicNumber,
  chinese: toChineseNumber,
  hebrew: toHebrewNumber,
  latin: (i: number) => String(i),
}

const ARABIC = ['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '٠']

export function toAmharicNumber(i: number): string {
  return geez.toGeez(i)
}

export function toArabicNumber(i: number): string {
  return String(i)
    .split('')
    .map(x => parseInt(x, 10))
    .map(x => ARABIC[x])
    .join('')
}

export function toChineseNumber(i: number): string {
  return String(i)
  // return libArabicChinese(String(i), { caseType: 'lower' })
}

export function toHebrewNumber(i: number): string {
  return gematriya(i, { punctuate: false })
}
