import { ParserNestNodeType } from '~parse'

import {
  InitialCodeCardType,
  InitialDeckCardType,
  InitialFormType,
} from '..'

export enum Scope {
  CodeCard = 'code-card',
  DeckCard = 'deck-card',
  Form = 'form',
  Nest = 'nest',
}

enum ScopeCardData {
  CodeCard = 'code-card',
  DeckCard = 'deck-card',
}

export type ScopeCardDataTableType = {
  'code-card': InitialCodeCardType
  'deck-card': InitialDeckCardType
}

export type ScopeCardDataType<S extends ScopeCardData> = {
  card: ScopeCardDataTableType[S]
}

export type ScopeFormDataType = {
  form: InitialFormType
}

export type ScopeKeyListType<T extends ScopeType> =
  T['parent'] extends ScopeType
    ? (keyof T['data'] & string) | ScopeKeyListType<T['parent']>
    : keyof T['data'] & string

export type ScopeNestDataType = {
  index: number
  nest: ParserNestNodeType
}

export type ScopeTableType = {
  'code-card': ScopeCardDataType<ScopeCardData.CodeCard>
  'deck-card': ScopeCardDataType<ScopeCardData.DeckCard>
  form: ScopeFormDataType
  nest: ScopeNestDataType
}

export type ScopeType<
  S extends Scope | unknown = unknown,
  P extends unknown | undefined = unknown,
> = {
  data: S extends Scope
    ? ScopeTableType[S]
    : Record<string, unknown>
  like: S
  parent?: P extends ScopeType<infer T, infer Q>
    ? ScopeType<T, Q>
    : never
}

export type ScopeValueType<
  T extends ScopeType,
  K extends string,
> = T['data'] extends { [key in K]: unknown }
  ? T['data'][K]
  : T['parent'] extends ScopeType
  ? ScopeValueType<T['parent'], K>
  : never
