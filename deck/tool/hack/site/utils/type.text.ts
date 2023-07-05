/* eslint-disable sort-exports/sort-exports */

export namespace BookChapterLineSystem {
  export type BookType = PathType & {
    after?: PathType
    before?: PathType
    chapters: Array<ChapterType>
    features?: Array<FeatureType>
    language: string
    parent?: PathType
    script: string
    system: string
    tags: Array<string>
    title: Array<TextType>
    type: string
  }

  export type ChapterType = PathType & {
    after?: PathType
    before?: PathType
    features?: Array<FeatureType>
    index: number
    language: string
    lines: Array<LineType>
    parent: PathType
    script: string
    system: string
    tags: Array<string>
    title?: Array<TextType>
    type: string
  }
}

export type LineType = {
  index: number
  type: string
  value: Array<TextType>
}

export namespace BookChapterVerseSystem {
  export type BookType = PathType & {
    after?: PathType
    before?: PathType
    chapters: Array<ChapterIndexType>
    features?: Array<FeatureType>
    language: string
    parent: PathType
    script: string
    system: string
    tags: Array<string>
    title: Array<TextType>
    type: string
  }

  export type ChapterType = PathType & {
    after?: PathType
    before?: PathType
    features?: Array<FeatureType>
    index: number
    language: string
    parent: PathType
    script: string
    system: string
    tags: Array<string>
    title?: Array<TextType>
    type: string
    verses: Array<VerseType>
  }
}

export type VerseType = {
  index: number
  type: 'verse'
  value: Array<TextType>
}

export type ChapterIndexType = {
  index: 0
  path: string
  title?: Array<TextType>
}

export type LinkType = {
  title: string
  url: string
}

export type PathType = {
  path: string
  title?: Array<TextType>
}

export type TextMapRecordType = {
  dir?: string
  features?: Array<LinkType>
  nextLink?: LinkType
  path: string
  previousLink?: LinkType
  script: string
  settings?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  }
  type: string
}

export type TextType = {
  language?: string
  script?: string
  text: string | Array<string>
}

export type OptionType = {
  name: string | boolean
  settings: Array<SettingType>
}

export type SettingBasicValueType = string | number | boolean | null

export type SettingType = {
  name: string
  value: SettingValueType
}

export type SettingValueType =
  | SettingBasicValueType
  | Array<SettingBasicValueType>

export type FeatureToggleType = {
  name: string
  options: Array<OptionType>
  type: 'toggle'
}

export type FeatureSelectType = {
  name: string
  options: Array<OptionType>
  type: 'select'
}

export type FeatureType = FeatureToggleType | FeatureSelectType

export function buildUrl(base: string, nestings: Array<number>) {
  return [base, nestings.join('/')].filter(x => x).join('/')
}
