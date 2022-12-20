import { ParserNestNodeType, ParserNodeType } from '../../parse'
import Card from './card'

export type ASTTreeLinkType = {
  like: 'tree-link'
  name: string
  link: Array<ParserNodeType | ASTTreeLinkType>
  size: number
  base?: ASTTreeLinkType
  slot?: number
}

export type ASTCordType = {
  like: 'cord'
  cord: string
}

export type ASTKnitType<
  T extends Object,
  B extends Object = Object,
> = Object & {
  like: 'knit'
  slot: number
  size: number
  tree: Array<unknown>
  mesh: T
  base?: B
}

export type ASTMeshType = Object & {
  like: 'mesh'
  mesh: Object
}

export type ASTListType = Object & {
  like: 'list'
  list: Array<unknown>
}

export type ASTCardType = Object & {
  base: BaseType
  'link-text-line': Array<string>
  'link-text-tree': ParserNodeType
  link: ASTCordType
  'link-host': ASTCordType
}

export type ASTDeckType = Object & {
  like: 'deck'
  mark?: string // version
  bear?: ASTCordType // entrypoint to library, tells us what to copy over.
  site?: ASTCordType // entrypoint to app.
  test?: ASTCordType // entrypoint to tests.
  read?: ASTCordType
  term: ASTListType // licenses
  face: ASTListType // people
}

export type ASTFormType = Object & {
  like: 'form'
  name?: string
  base: ASTListType
  link: ASTMeshType
  task: ASTMeshType
  wear: ASTMeshType
  hook: ASTMeshType
}

export type ASTCardDeckType = ASTCardType & {
  like: 'deck-card'
  deck: ASTKnitType<ASTDeckType>
}

export type BaseTextMixinType = {
  readTextFile: (link: string) => string
  getLinkHost: (link: string) => string
  makeCord: (cord: string) => ASTCordType
  parseTextIntoTree: (text: string) => ParserNodeType
  isTextNest: (nest: ParserNestNodeType) => boolean
}

export type BaseTreeMixinType = {
  makeTreeLink: (
    name: string,
    base: ASTTreeLinkType,
  ) => ASTTreeLinkType
}

export type BaseNestMixinType = {
  mintNestTree: (
    nest: ParserNestNodeType,
    seed: unknown,
  ) => void
  readNest: (fork: unknown) => string | undefined
}

export type BaseKnitMixinType = {
  makeKnit: <T extends Object>(
    mesh: T,
    base?: T,
  ) => ASTKnitType<T>
  getPropertyValue: (
    knit: ASTKnitType<Object>,
    name: string,
  ) => unknown
  makeMesh: () => ASTMeshType
  makeList: () => ASTListType
}

export type BaseForkMixinType = {
  extendObject: (x: Object, a: Object) => Object
}

export type BaseCardDeckMixinType = {
  doesHaveFind: (nest: ParserNestNodeType) => boolean
  mintDeckCard: (this: BaseType, link: string) => void
  mintDeck: (fork) => void
}

export type BaseCardCodeMixinType = {
  mintCodeCard: (link: string) => void
}

export type BaseCardCodeTreeMixinType = {
  mintCodeCardNest: (fork) => void
  mintCodeBear: (fork) => void
}

export type BaseCardCodeMeshMixinType = {
  mintCodeTree: (fork) => void
  mintCodeFace: (fork) => void
  mintCodeHost: (fork) => void
  mintCodeSuit: (fork) => void
  mintCodeTask: (fork) => void
}

export type BaseRequestParamsType = {
  hash: string
  like: string
  name: string
  site: string
  link: string
  fork: string
  hook: (site: string, fork: unknown) => void
}

export type BaseCallbackType = {
  site: string
  link: string
  hook: (site: string, fork: unknown) => void
  fork: string
}

export type BaseEncounterParamsType = {
  hash: string
  like: string
  name: string
  load: string
}

export type BaseFreeType = () => void

export type BaseHookType = () => BaseFreeType

export type BasePublicAPIType = {
  text_mesh: Map<string, string>

  link_mesh: Map<string, Array<string>>

  hook_mesh: Map<string, BaseHookType>

  free_mesh: Map<string, BaseFreeType>

  card_mesh: Map<string, Card>

  wait_seek_mesh: Map<
    string,
    Map<string, Map<string, Array<BaseCallbackType>>>
  >

  wait_find_mesh: Map<string, Map<string, Map<string, string>>>

  request: (props: BaseRequestParamsType) => void

  encounter: (props: BaseEncounterParamsType) => void

  propagate: () => void

  link: (hash: string, list: Array<string>) => void

  free: (hash: string) => void

  hook: (hash: string, call: BaseHookType) => void

  bind: (hash: string) => void

  card: (hash: string) => Card

  sort: () => void
}

export type BaseType = BasePublicAPIType &
  BaseTextMixinType &
  BaseTreeMixinType &
  BaseNestMixinType &
  BaseKnitMixinType &
  BaseForkMixinType &
  BaseCardDeckMixinType &
  BaseCardCodeMixinType &
  BaseCardCodeTreeMixinType &
  BaseCardCodeMeshMixinType
