import { ParserNestNodeType } from '~parse'

import {
  InitialCodeCardType,
  InitialDeckCardType,
  InitialFormType,
} from '..'

export type ParentScopeType<S> = S extends ScopeType<
  infer X,
  infer Y
>
  ? S | ParentScopeType<Y>
  : never

enum ScopeCardData {
  CodeCard = 'code-card',
  DeckCard = 'deck-card',
}

export enum Scope {
  CodeCard = 'code-card',
  DeckCard = 'deck-card',
  Form = 'form',
  Nest = 'nest',
}

export type ScopeAliasType<S> = ParentScopeType<S>

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

export type ScopeKeyListType<
  L extends Scope,
  T extends ScopeType<L>,
> = T['parent'] extends infer O
  ? O extends ScopeType<infer X>
    ? (keyof T['data'] & string) | ScopeKeyListType<X, O>
    : keyof T['data'] & string
  : never

export type ScopeNestDataType = {
  index: number
  nest: ParserNestNodeType
}

export type ScopeSetType<S> = S extends ScopeType<
  infer P extends Scope,
  infer Q
>
  ? S | ParentScopeType<S>
  : never

export type ScopeTableType = {
  'code-card': ScopeCardDataType<ScopeCardData.CodeCard>
  'deck-card': ScopeCardDataType<ScopeCardData.DeckCard>
  form: ScopeFormDataType
  nest: ScopeNestDataType
}

export type ScopeType<
  S extends Scope,
  P extends unknown = unknown,
> = {
  data: ScopeTableType[S]
  like: S
  parent?: P extends ScopeType<infer T extends Scope, infer Q>
    ? P
    : never
}

export type ScopeValueType<
  L extends Scope,
  T extends ScopeType<L>,
  K extends ScopeKeyListType<L, T>,
> = T['data'] extends { [key in K]: unknown }
  ? T['data'][K]
  : T['parent'] extends infer O
  ? O extends ScopeType<infer X>
    ? ScopeValueType<X, O, ScopeKeyListType<X, O>>
    : never
  : never
