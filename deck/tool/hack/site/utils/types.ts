import { PagePropsType } from '@lancejpollard/kit'
import { TermInfoType } from './getTermInfo'

export type HashType = {
  algorithm: string
  value: string
}

export type NameType = {
  name: string
  slug: string
}

export type NumbersInfoType = Record<
  string,
  Record<string, Record<string, Array<string>>>
>

export type PageInfoType = {
  image?: string
  note?: string
  tab: string
  tags?: Array<string>
  url: string
}

export type PersonPageType = TermPageType & {
  children: Array<PersonPageType>
  parents: {
    dad?: PersonPageType
    mom?: PersonPageType
  }
}

export type PronunciationInfoType = {
  list: Array<string>
  text: string
  tone: string
}

export type PronunciationType = {
  pronunciation: string
  slug: string
  title: string
}

export type SlugTitleType = {
  slug: string
  title: string
}

export type TermPagePropsType = PagePropsType & {
  date: string | null
  hashes?: Array<HashType>
  language: string
  matchingTerms?: Array<{ slug: string; title: string }>
  names: Array<string>
  pronunciationInfo?: PronunciationInfoType | null
  similarities?: Record<string, Array<TermType>>
  term: string
  termInfo?: TermInfoType
  type: string
  zipcodes?: Array<ZipcodeType>
}

export type TermPageType = PageInfoType & {
  text: string
  tone: string
}

export type TermSystemPagePropsType = TermPagePropsType & {
  systemTitle: string
}

export type TermType = {
  slug: string
  title: string
}

export type TranslatedTermType = {
  english: SlugTitleType
  native: SlugTitleType
  pronunciation?: string
  roman?: SlugTitleType
}

export type ZipcodeType = {
  city: string
  code: number
  state: string
}

export function isPageInfo(object: unknown): object is PageInfoType {
  return (
    object != null &&
    typeof object === 'object' &&
    'url' in object &&
    typeof object.url === 'string'
  )
}

export function isRecord(
  object: unknown,
): object is Record<string, unknown> {
  return object != null && typeof object === 'object'
}
