import { ParserNodeType } from '../../parse'
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

export type ASTKnitType = {
  like: 'knit'
  slot: number
  size: number
  tree: Array<unknown>
  mesh: Object
  base?: ASTKnitType
}

export type ASTMeshType = {
  like: 'mesh'
  mesh: Object
}

export type ASTListType = {
  like: 'list'
  list: Array<unknown>
}

export type BaseTextMixin = {
  readTextFile: (link: string) => string
}

type BaseRequestParamsType = {
  hash: string
  like: string
  name: string
  site: string
  link: string
  fork: string
  hook: (site: string, fork: unknown) => void
}

type BaseCallbackType = {
  site: string
  link: string
  hook: (site: string, fork: unknown) => void
  fork: string
}

type BaseEncounterParamsType = {
  hash: string
  like: string
  name: string
  load: string
}

type BaseFreeType = () => void

type BaseHookType = () => BaseFreeType

type BasePublicAPIType = {
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

export type BaseType = BasePublicAPIType & BaseTextMixin
