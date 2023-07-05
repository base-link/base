import { Font } from '@lancejpollard/kit'

export type AppFont = {
  arabic: true
  arial: true
  armenian: true
  bengali: true
  canadian: true
  chinese: true
  cuneiform: true
  devanagari: true
  egyptian: true
  english: true
  ethiopic: true
  georgian: true
  gujarati: true
  gurmukhi: true
  hebrew: true
  hindi: true
  inuktitut: true
  japanese: true
  kannada: true
  khmer: true
  korean: true
  latin: true
  malayalam: true
  oriya: true
  runic: true
  sanskrit: true
  sinhala: true
  syriac: true
  tamil: true
  telugu: true
  thai: true
  tibetan: true
  tone: true
}

export type AppFontStateType = Record<string, boolean>

export const FONT: Record<string, string> = {
  arabic: 'Noto Kufi Arabic',
  arial: 'Arial',
  armenian: 'Noto Sans Armenian',
  bengali: 'Noto Sans Bengali',
  canadian: 'Noto Sans Canadian',
  chinese: 'Noto Sans SC',
  cuneiform: 'Noto Sans Cuneiform',
  devanagari: 'Noto Sans Devanagari',
  egyptian: 'Noto Sans Egyptian',
  english: 'Noto Sans Mono',
  ethiopic: 'Noto Sans Ethiopic',
  georgian: 'Noto Sans Georgian',
  gujarati: 'Noto Sans Gujarati',
  gurmukhi: 'Noto Sans Gurmukhi',
  hebrew: 'Noto Sans Hebrew',
  hindi: 'Noto Sans Devanagari',
  inuktitut: 'Noto Sans Canadian',
  japanese: 'Noto Sans JP',
  kannada: 'Noto Sans Kannada',
  khmer: 'Noto Sans Khmer',
  korean: 'Noto Sans KR',
  latin: 'Noto Sans Mono',
  malayalam: 'Noto Sans Malayalam',
  oriya: 'Noto Sans Oriya',
  runic: 'Noto Sans Runic',
  sanskrit: 'Noto Sans Devanagari',
  sinhala: 'Noto Sans Sinhala',
  syriac: 'Noto Sans Syriac',
  tamil: 'Noto Sans Tamil',
  telugu: 'Noto Sans Telugu',
  thai: 'Noto Sans Thai',
  tibetan: 'Noto Serif Tibetan',
  tone: 'ToneEtch',
}

export type FontDataType = Array<string>

const FONT_LOADERS: Record<string, FontDataType> = {
  amharic: ['Noto Sans Ethiopic', 'ጥበብ'],
  arabic: ['Noto Kufi Arabic', 'حديقة'],
  armenian: ['Noto Sans Armenian'],
  bengali: ['Noto Sans Bengali'],
  canadian: ['Noto Sans Canadian Aboriginal', 'ᕿᓚᓗᒐᖅ'],
  chinese: ['Noto Sans SC', '晓'],
  cuneiform: ['Noto Sans Cuneiform'],
  devanagari: ['Noto Sans Devanagari', 'टोकरी'],
  egyptian: ['Noto Sans Egyptian Hieroglyphs'],
  georgian: ['Noto Sans Georgian', 'ფრჩხილი'],
  gujarati: ['Noto Sans Gujarati'],
  gurmukhi: ['Noto Sans Gurmukhi'],
  hebrew: ['Noto Sans Hebrew', 'אזהרה'],
  hindi: ['Noto Sans Devanagari', 'टोकरी'],
  inuktitut: ['Noto Sans Canadian Aboriginal', 'ᕿᓚᓗᒐᖅ'],
  japanese: ['Noto Sans JP', 'ばった'],
  kannada: ['Noto Sans Kannada'],
  khmer: ['Noto Sans Khmer'],
  korean: ['Noto Sans KR'],
  latin: ['Noto Sans Mono', 'IEAOU'],
  malayalam: ['Noto Sans Malayalam'],
  oriya: ['Noto Sans Oriya'],
  runic: ['Noto Sans Runic'],
  sanskrit: ['Noto Sans Devanagari', 'टोकरी'],
  sinhala: ['Noto Sans Sinhala'],
  syriac: ['Noto Sans Syriac'],
  tamil: ['Noto Sans Tamil', 'புஷ்பம்'],
  telugu: ['Noto Sans Telugu'],
  thai: ['Noto Sans Thai', 'บ้าน'],
  tibetan: ['Noto Serif Tibetan', 'སེང'],
  tone: ['ToneEtch', 'abc'],
}

export default FONT_LOADERS
